import passport from 'passport';
import * as driver from '../neo4j/neo4j.js'; // Import Neo4j driver
import '../config/passport.js'; // Import passport configuration
import axios from 'axios';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'; // For generating UUIDs
import jwt from 'jsonwebtoken';

export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email', 'https://www.googleapis.com/auth/contacts.readonly'] });

export const googleAuthCallback = passport.authenticate('google', {
  successRedirect: '/protected',
  failureRedirect: '/auth/google/failure',
});

export const googleAuthFailure = (req, res) => {
  res.status(401).json({
    message: 'Authentication failed!',
  });
};

export const protectedRoute = async (req, res) => {
  if (req.user) {
    const { displayName, email } = req.user.profile;
    console.log(req.user);

    const session = driver.getDriver().session(); // Create a new session
    try {
      // Save or update user data in Neo4j
      await session.run(
        'MERGE (u:User {id: $id}) ' +
        'SET u.name = $name, u.email = $email',
        {
          id: req.user.profile.id, // User ID from Google profile
          name: displayName,
          email: email
        }
      );

      res.json({
        message: `Hello ${displayName}, your email is ${email}`
      });
    } catch (error) {
      console.error('Error saving user to Neo4j:', error);
      res.status(500).send('Error saving user data');
    } finally {
      session.close(); // Always close the session after use
    }
  } else {
    res.status(401).send('Unauthorized');
  }
};

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error', err);
      res.status(500).send('Error');
    }
    req.session.destroy((err) => {
      res.redirect('http://localhost:3000');
    });
  });
};

export const usercontact = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  const accessToken = req.user.accessToken;
  console.log(accessToken); 

  try {
    let contacts = [];
    let nextPageToken = null;
    const pageSize = 1000; 
    do {
      const response = await axios.get('https://people.googleapis.com/v1/people/me/connections', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        params: {
          'pageSize': pageSize, // Fetch the maximum allowed number of contacts per request
          'pageToken': nextPageToken, // Token for fetching the next page, if it exists
          'personFields': 'names,emailAddresses,phoneNumbers',
        }
      });

      // Add the current page of contacts to the list
      const currentContacts = response.data.connections || [];
      contacts = contacts.concat(currentContacts);

      // Get the next page token, if it exists
      nextPageToken = response.data.nextPageToken;

    } while (nextPageToken); // Keep fetching until there's no more nextPageToken

    // Format contacts with names and phone numbers
    const formattedContacts = contacts.map(contact => ({
      name: contact.names ? contact.names[0].displayName : 'No name',
      phoneNumber: contact.phoneNumbers ? contact.phoneNumbers[0].value : 'No phone number',
      email: contact.emailAddresses ? contact.emailAddresses[0].value : 'No Email'
    }));

    // Sort the formatted contacts by name in ascending order
    const sortedContacts = formattedContacts.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // Ignore case while sorting
      const nameB = b.name.toUpperCase(); // Ignore case while sorting

      return nameA.localeCompare(nameB);
    });

    res.status(200).json(sortedContacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
};

export const registerController = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Name, email, password, and confirmPassword are required' });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const session = driver.getDriver().session(); // Create a new session for Neo4j queries
  try {
    // Check if user already exists
    const result = await session.run(
      'MATCH (u:User {email: $email}) RETURN u',
      { email }
    );

    if (result.records.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    await session.run(
      'CREATE (u:User {id: $id, name: $name, email: $email, password: $password})',
      { id: uuidv4(), name, email, password: hashedPassword }
    );

    res.status(201).json({ message: 'User registered successfully'});
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Error registering user' });
  } finally {
    session.close(); // Close the session after use
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const session = driver.getDriver().session(); // Create a new session for Neo4j queries
  try {
    // Fetch user by email
    const result = await session.run(
      'MATCH (u:User {email: $email}) RETURN u',
      { email }
    );

    if (result.records.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get user properties
    const user = result.records[0].get('u').properties;

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token ,name:user.name,email});
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error logging in' });
  } finally {
    session.close(); // Close the session after use
  }
};

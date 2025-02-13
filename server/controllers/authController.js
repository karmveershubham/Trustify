
import * as driver from '../neo4j/neo4j.js'; // Import Neo4j driver
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


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

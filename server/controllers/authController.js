
import * as driver from '../neo4j/neo4j.js'; // Import Neo4j driver
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


//login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({status: "failed", message: 'Email and password are required' });
  }

  const session = driver.getDriver().session(); // Create a new session for Neo4j queries
  try {
    // Fetch user by email
    const result = await session.run(
      'MATCH (u:User {email: $email}) RETURN u',
      { email }
    );

    if (result.records.length === 0) {
      return res.status(404).json({status: "failed",  message: 'User not found' });
    }

    // Get user properties
    const user = result.records[0].get('u').properties;

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: "failed", message: 'Invalid credentials' });
    }

    // Generate JWT token    //later MAKE IT ASYNC 
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    //set cookies
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.JWT_SECRET, // Use secure cookies in production
        maxAge: 1 * 24 * 60 * 59 * 1000, // 1 day
    });

    res.cookie('is_auth', true, {
      httpOnly: false,
      secure: false, 
      maxAge: 1 * 24 * 60 * 59 * 1000, // 1 day
    });
    
    res.status(200).json({
        user: { id: user.id, email: user.email, name: user.name, mobile_no: user.mobile_no || "", profilePicture: user.profilePicture || "" },
        status: "success",
        message: "Login successful",
        token: token,
        is_auth: true
      }); 

    console.log("User login succesful")

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ status: "failed", message: "Unable to login, please try again later" });
  } finally {
    session.close(); // Close the session after use
  }
};

//profile
export const userProfile = async (req, res) => {
  if (!req.body) {
    res.status(401).send({ status: "failed", message: 'Unauthorized' });
    return;
  }
  console.log(req.body);
  try {
    const email = req.body.email;
    const session = driver.getDriver().session();
    const result = await session.run(
      "MATCH (u:User {email: $email}) RETURN u",
      { email }
    );
    if (result.records.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = result.records[0].get("u").properties;

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        mobile_no: user.mobile_no || "",
        profilePicture: user.profilePicture || "",
      },
      status: "success",
      message: "User profile fetched successfully.",
    });
  }catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ status: "failed", message: "Unable to fetch profile" });
  }
};


//logout
export const logout = (req, res) => {
  try{
    if(req.body){
      console.log(req.body);
    }
    res.clearCookie("token");
    res.clearCookie("is_auth");
    res.status(200).json({ 
      status: "success", 
      message: "Logged out successfully", 
      redirectTo: "/" 
    });
  }catch(error){
    console.error(error);
    res.status(500).json({ status: "failed", message: "Unable to logout, please try again later" });
    }
};
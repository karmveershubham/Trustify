import * as driver from '../neo4j/neo4j.js'; // Import Neo4j driver
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


// Login Function
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: "failed", message: "Email and password are required" });
  }

  const session = driver.getDriver().session();
  try {
    // Fetch user with explicit properties
    const result = await session.run(
      `MATCH (u:User {email: $email}) 
       RETURN u.id AS id, u.email AS email, u.name AS name, u.mobileNo AS mobile_no, 
              u.profileImg AS profile_picture, u.trustScore AS trust_score, u.password AS password`,
      { email }
    );

    if (result.records.length === 0) {
      return res.status(404).json({ status: "failed", message: "User not found" });
    }

    const user = result.records[0].toObject(); // Convert result to object
    console.log("Fetched User:", user); // Debugging

    if (!user.password) {
      return res.status(500).json({ status: "failed", message: "Password is missing in database" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: "failed", message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Set cookies
    res.cookie("token", token, {
      path: '/',
      httpOnly: true,
      secure: true,   
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie("is_auth", true, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      user: { id: user.id, email: user.email, name: user.name, mobile_no: user.mobile_no || "", profile_picture: user.profile_picture || "" },
      status: "success",
      message: "Login successful",
      token,
      is_auth: true,
    });

    console.log("User login successful");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ status: "failed", message: "Unable to login, please try again later" });
  } finally {
    session.close();
  }
};

// Profile
export const userProfile = async (req, res) => {
  try {
    const email = req.body.email || req.user?.email;
    if (!email) {
      return res.status(401).json({ status: "failed", message: "Unauthorized" });
    }

    const session = driver.getDriver().session();
    const result = await session.run("MATCH (u:User {email: $email}) RETURN u", { email });

    if (result.records.length === 0) {
      return res.status(404).json({ status: "failed", message: "User not found" });
    }

    const user = result.records[0].get("u").properties;

    res.status(200).json({
      userId: user.id,  // ✅ Ensure userId is included
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        mobile_no: user.mobileNo || "",
        profile_picture: user.profileImg || "",
        trust_score: user.trustScore || 0,
        created_at: user.createdAt || "",
        location: user.location || "",
      },
      status: "success",
      message: "Profile fetched successfully",
    });

  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ status: "failed", message: "Unable to fetch profile" });
  }
};

// Logout
export const logout = (req, res) => {
  try {
    res.clearCookie("token", { 
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'None', 
    });
    
    res.clearCookie("is_auth", { 
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'None', 
    });

    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
      redirectTo: "/",
    });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ status: "failed", message: "Unable to logout, please try again later" });
  }
};
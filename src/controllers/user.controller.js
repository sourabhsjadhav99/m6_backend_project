import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import sendMail from '../utils/nodemailer.js';

// Function to handle user signup
const signup = async (req, res) => {
  let { email, password, role } = req.body;
  email = email.toLowerCase() // Normalize email to lowercase

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role });

    // Save the new user to the database
    await newUser.save();

    // Send welcome email
    const subject = 'Welcome to Our App!';
    const text = `Hi ${email},\n\nThank you for signing up for our app! We're excited to have you on board.\n\nBest Regards,\nThe Team Glassdoor`;

    await sendMail(email, subject, text)


    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const signin = async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase() // Normalize email to lowercase
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if passwords match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id, user }, process.env.JWT_SECRET, { expiresIn: '1h' });


    // Set the token as a cookie
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Sign in successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Function to handle user signout
let signout = (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export { signup, signin, signout, deleteUser };

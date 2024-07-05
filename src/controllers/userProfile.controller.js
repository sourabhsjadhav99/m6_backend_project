import Profile from '../models/userProfile.model.js';
import cloudinary from '../config/cloudnaryConfig.js';
;


// Create a new profile
const createProfile = async (req, res) => {
  const { firstname, lastname, profession } = req.body;
  const filePath = req.file ? req.file.path : null; // Get the file path from multer
  const user = req.user.userId;

  try {
    const existingProfile = await Profile.findOne({ user });
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists for this user you can update it' });
    }

    if (!filePath) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: 'raw', // Use 'raw' for non-image files like PDFs
    });

    const newProfile = new Profile({
      firstname,
      lastname,
      profession,
      cv: uploadResult.secure_url, // Save the URL to the database
      user
    })

    const savedProfile = await newProfile.save();

    await savedProfile.populate('user', 'email role');

    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all profiles
const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', 'username email');
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a single profile
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate('user', 'username email');
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a profile
const updateProfile = async (req, res) => {
  const { firstname, lastname, profession } = req.body;
  const cv = req.file ? req.file.path : req.body.cv;

  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    profile.firstname = firstname || profile.firstname;
    profile.lastname = lastname || profile.lastname;
    profile.profession = profession || profile.profession;
    // profile.cv = cv || profile.cv;
    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a profile
const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { createProfile, getProfiles, getProfile, updateProfile, deleteProfile };


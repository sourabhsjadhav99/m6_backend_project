import Profile from '../models/userProfile.model.js';

// Create a new profile
const createProfile = async (req, res) => {
  const { firstname, lastname, profession } = req.body;
  // const cv = req.file.path;
  const {filename}= req.file;
  const user = req.user.userId;

  try {
    const newProfile = new Profile({ firstname, lastname, profession, cv:filename , user });
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all profiles
const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', 'username email');
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
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
    res.status(500).json({ message: 'Server error', error });
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
    res.status(500).json({ message: 'Server error', error });
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
    res.status(500).json({ message: 'Server error', error });
  }
};

export { createProfile, getProfiles, getProfile, updateProfile, deleteProfile };

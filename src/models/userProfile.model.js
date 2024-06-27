import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  cv: {
    type: String, // Store the file path of the uploaded CV
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;

import SavedJob from '../models/saveJob.model.js';

// Save a job
const saveJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const user = req.user.userId; // Adjust according to how you set it in authMiddleware

    const savedJob = new SavedJob({ user, job: jobId });
    await savedJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};




// Get saved jobs for a user
const getSavedJobs = async (req, res) => {
  try {
    const userId = req.user.userId;
    const savedJobs = await SavedJob.find({ user: userId }).populate('job');
    res.status(200).json(savedJobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a saved job
const deleteSavedJob = async (req, res) => {
  try {
    const { id } = req.params;
    await SavedJob.findByIdAndDelete(id);
    res.status(200).json({ message: 'Saved job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export { saveJob, getSavedJobs, deleteSavedJob };

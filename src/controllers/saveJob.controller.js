import SavedJob from '../models/saveJob.model.js';

// Toggle - save and unsaved jobs
const saveAndDeleteJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.userId;

    // Check if the job has already been saved by the user
    const existingSavedJob = await SavedJob.findOne({ user: userId, job: jobId });

    if (existingSavedJob) {
      // If the job is already saved, delete it
      await SavedJob.findByIdAndDelete(existingSavedJob._id);
      return res.status(200).json({ message: 'Job removed from saved jobs' });
    } else {
      // If the job is not saved, create and save it
      const jobToSave = new SavedJob({ user: userId, job: jobId });
      const savedJob = await jobToSave.save();
      await savedJob.populate('job')
      return res.status(201).json(savedJob);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Get saved jobs for a user
const getSavedJobs = async (req, res) => {
  try {
    const userId = req.user.userId;
    const savedJobs = await SavedJob.find({ user: userId }).populate('job');
    res.status(200).json(savedJobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export { getSavedJobs, saveAndDeleteJob };

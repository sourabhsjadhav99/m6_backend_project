import Application from '../models/applyJob.model.js';

// Apply for a new job
const applyJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.userId;

    // Check if the job has already been applied by the user
    const existingappliedJob = await Application.findOne({ user: userId, job: jobId });
    if (existingappliedJob) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }
    const application = new Application({ user: userId, job: jobId });
    const appliedJob = await application.save();
    await appliedJob.populate('job')
    res.status(201).json(appliedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Get all applied jobs of a user
const getApplications = async (req, res) => {
  try {
    const userId = req.user.userId;
    const applications = await Application.find({ user: userId }).populate('job');
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const deleteApplications = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.userId;
    const application = await Application.findOneAndDelete({ user: userId, job: jobId });
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

export { applyJob, getApplications, deleteApplications };

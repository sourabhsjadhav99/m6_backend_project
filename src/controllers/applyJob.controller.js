import Application from '../models/applyJob.model.js';

// Apply for a job
const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user.userId;
    console.log(req.user)

    const application = new Application({ user: userId, job: jobId});
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get applications for a user
const getApplications = async (req, res) => {
  try {
    const userId = req.user.userId;
    const applications = await Application.find({ user: userId }).populate('job');
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export { applyJob, getApplications };

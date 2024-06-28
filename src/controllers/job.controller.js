import Job from '../models/job.model.js';

// Create a new job
const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all jobs
const getJobs = async (req, res) => {
  try {
    const { title, location } = req.query;

    const query = {};

    if (title) {
      query.title = { $regex: title, $options: 'i' }; // Case-insensitive search
    }

    if (location) {
      query.location = location; // Directly use the location ID
    }

    const jobs = await Job.find(query).populate('location').populate('company');
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single job
const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('location').populate('company');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export { createJob, getJobs, getJob, updateJob, deleteJob };
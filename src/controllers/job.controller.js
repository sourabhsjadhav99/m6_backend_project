import Job from '../models/job.model.js';

// Create a new job
const createJob = async (req, res) => {
  try {
    const user = req.user.userId;
    const job = new Job({ ...req.body, user });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
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
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getJobsByAdmin = async (req, res) => {
  try {
    const user = req.user.userId;
    const jobs = await Job.find({ user });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
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
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a job
const updateJob = async (req, res) => {
  try {
    const user = req.user.userId;
    const jobToUpdate = await Job.findById(req.params.id);

    if (!jobToUpdate) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (jobToUpdate.user.toString() !== user.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this location' });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  try {
    const user = req.user.userId;
    const jobToDelete = await Job.findById(req.params.id);

    if (!jobToDelete) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (jobToDelete.user.toString() !== user.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this location' });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { createJob, getJobs, getJob, updateJob, deleteJob, getJobsByAdmin };
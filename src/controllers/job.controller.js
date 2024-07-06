import Job from '../models/job.model.js';

// Create a new job
const createJob = async (req, res) => {
  try {
    const user = req.user.userId;
    const job = new Job({ ...req.body, user });
    await job.save();
    const populateJob = await Job.findById(job._id).populate("user", "email role").populate("location", "name").populate("company")
    res.status(201).json(populateJob);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all jobs having search functionlity
const getJobs = async (req, res) => {
  try {
    const { title, location, page = 1, limit = 10 } = req.query;

    const query = {};

    if (title) {
      query.title = { $regex: title, $options: 'i' }; // Case-insensitive search
    }

    if (location) {
      query.location = location; // Directly use the location ID
    }

    const options = {
      page: parseInt(page, 10), // Convert to integer
      limit: parseInt(limit, 10), // Convert to integer
      populate: ['location', 'company'], // Populate location and company fields
      populate: [
        { path: 'location', select: 'name' }, // Populate location field with name only
        { path: 'company', select: 'name description logo specialities staffCountRange' } // Populate company field with specific fields
      ]
    };

    const jobs = await Job.paginate(query, options);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// for Admin only - to get all jobs added by admin 
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
      return res.status(403).json({ message: 'Not authorized to update this job' });
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
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// exporting controller 
export { createJob, getJobs, getJob, updateJob, deleteJob, getJobsByAdmin };
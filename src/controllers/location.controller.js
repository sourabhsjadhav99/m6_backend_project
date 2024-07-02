import Location from '../models/location.model.js';

// Create a new location
const createLocation = async (req, res) => {
  try {
    const user = req.user.userId;
    const location = new Location({ ...req.body, user });
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all locations
const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all locations
const getLocationsByAdmin = async (req, res) => {
  try {
    const user = req.user.userId;
    const locations = await Location.find({ user });
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Get a single location
const getLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a location
const updateLocation = async (req, res) => {
  try {
    const user = req.user.userId;
    const locationToUpdate = await Location.findById(req.params.id)

    if (!locationToUpdate) {
      return res.status(404).json({ message: 'Location not found' });
    }

    console.log(user, locationToUpdate.user)
    if (locationToUpdate.user.toString() !== user.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    const updatedLocation = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });


    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a location
const deleteLocation = async (req, res) => {
  try {
    const user = req.user.userId;
    const locationToDelete = await Location.findById(req.params.id);

    if (!locationToDelete) {
      return res.status(404).json({ message: 'Location not found' });
    }

    if (locationToDelete.user.toString() !== user.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this location' });
    }

    await Location.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Location deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export { createLocation, getLocations,getLocationsByAdmin, getLocation, updateLocation, deleteLocation };

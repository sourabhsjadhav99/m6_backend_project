import Company from '../models/company.model.js';

// Create a new company
const createCompany = async (req, res) => {
  try {
    const user = req.user.userId;
    const company = new Company({ ...req.body, user });
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getCompanies = async (req, res) => {
  const { name } = req.query;

  try {
    let query = {};
    if (name) {
      query = { name: new RegExp(name, 'i') }; // Case-insensitive regex search
    }

    const companies = await Company.find(query);
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const getCompaniesByAdmin = async (req, res) => {
  try {
    const user = req.user.userId;
    const companies = await Company.find({ user });
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Get a single company
const getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a company
const updateCompany = async (req, res) => {
  try {
    const user = req.user.userId;
    const companyToUpdate = await Company.findById(req.params.id);

    if (!companyToUpdate) {
      return res.status(404).json({ message: 'Company not found' });
    }

    if (companyToUpdate.user.toString() !== user.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this location' });
    }

    const updatedcompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedcompany);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a company
const deleteCompany = async (req, res) => {
  try {

    const user = req.user.userId;
    const companyToDelete = await Company.findById(req.params.id);

    if (!companyToDelete) {
      return res.status(404).json({ message: 'Company not found' });
    }
    if (companyToDelete.user.toString() !== user.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this location' });
    }

    await Company.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { createCompany, getCompanies, getCompany, updateCompany, deleteCompany, getCompaniesByAdmin };

import Company from '../models/company.model.js';

// Create a new company
const createCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all companies
// const getCompanies = async (req, res) => {
//   try {
//     const companies = await Company.find();
//     res.status(200).json(companies);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };
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
    res.status(500).json({ message: 'Server error', error });
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
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a company
const updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a company
const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export { createCompany, getCompanies, getCompany, updateCompany, deleteCompany };

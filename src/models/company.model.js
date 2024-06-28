import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  staffCountRange: {
    start: {
      type: Number,
      required: true,
    },
    end: {
      type: Number,
      required: true,
    },
  },
  specialities: {
    type: [String],
    required: true,
  },
  weblinks:{
    type: String,

  }

});

const Company = mongoose.model('Company', companySchema);

export default Company;

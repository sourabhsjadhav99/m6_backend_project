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
    required: false,
  },
  staffCountRange: {
    start: {
      type: Number,
      required: false,
    },
    end: {
      type: Number,
      required: false,
    },
  },
  specialities: {
    type: [String],
    required: true,
  },
  weblinks: {
    type: String,
    required: false,

  }, 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
},
  {
    timestamps: true,
    versionKeys: false
  }
);

const Company = mongoose.model('Company', companySchema);

export default Company;

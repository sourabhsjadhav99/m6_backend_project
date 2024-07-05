import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const jobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  type: {
    type: String,
    enum: ['part time', 'full time', 'contract'],
    default: 'Full Time',
  },
  workplace: {
    type: String,
    enum: ['work from office', 'work from home', 'remote'],
    default: 'work from office',
  },
  postDate: {
    type: Date,
    default: Date.now,
    required: false,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: false,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
}, {
  timestamps: true,
  versionKeys: false
});

jobSchema.plugin(mongoosePaginate);
const Job = mongoose.model('Job', jobSchema);

export default Job;

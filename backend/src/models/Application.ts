import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  userId: mongoose.Types.ObjectId;
  opportunityId: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: Date;
}

const applicationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  opportunityId: {
    type: Schema.Types.ObjectId,
    ref: 'Opportunity',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model<IApplication>('Application', applicationSchema); 
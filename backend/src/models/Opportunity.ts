import mongoose, { Schema, Document } from 'mongoose';

export interface IOpportunity extends Document {
  title: string;
  description: string;
  location: string;
  requiredSkills: string[];
  organizationId: mongoose.Types.ObjectId;
  startDate: Date;
  endDate?: Date;
  status: 'open' | 'closed';
  applicants: mongoose.Types.ObjectId[];
  applications: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const OpportunitySchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  requiredSkills: [{ type: String }],
  organizationId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  applicants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  applications: [{ type: Schema.Types.ObjectId, ref: 'Application' }]
}, {
  timestamps: true
});

export default mongoose.model<IOpportunity>('Opportunity', OpportunitySchema); 
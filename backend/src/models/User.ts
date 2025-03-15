import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  userType: 'individual' | 'ngo';
  name: string;
  email: string;
  bio?: string;
  location?: string;
  skills?: string[];
  organizationName?: string;
  contactPhone?: string;
  address?: string;
  serviceTypes?: string[];
  operatingHours?: string;
  website?: string;
  events: mongoose.Types.ObjectId[];
  opportunities: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true, enum: ['individual', 'ngo'] },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String },
  location: { type: String },
  skills: [{ type: String }],
  organizationName: { type: String },
  contactPhone: { type: String },
  address: { type: String },
  serviceTypes: [{ type: String }],
  operatingHours: { type: String },
  website: { type: String },
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  opportunities: [{ type: Schema.Types.ObjectId, ref: 'Opportunity' }]
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema); 
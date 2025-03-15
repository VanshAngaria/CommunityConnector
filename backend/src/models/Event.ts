import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizerId: mongoose.Types.ObjectId;
  registeredUsers: mongoose.Types.ObjectId[];
  status: 'upcoming' | 'ongoing' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  organizerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  registeredUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  status: { 
    type: String, 
    required: true, 
    enum: ['upcoming', 'ongoing', 'completed'],
    default: 'upcoming'
  }
}, {
  timestamps: true
});

export default mongoose.model<IEvent>('Event', EventSchema); 
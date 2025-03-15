import { Request, Response } from 'express';
import Event from '../models/Event';
import User from '../models/User';

export const createEvent = async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const eventData = {
      ...req.body,
      organizerId: req.user.userId,
      status: 'upcoming'
    };

    const event = new Event(eventData);
    await event.save();

    res.status(201).json(event);
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find()
      .populate('organizerId', 'name organizationName')
      .populate('registeredUsers', 'name');
    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRegisteredEvents = async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const events = await Event.find({ _id: { $in: user.events } })
      .populate('organizerId', 'name organizationName')
      .populate('registeredUsers', 'name');

    res.json(events);
  } catch (error) {
    console.error('Get registered events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 
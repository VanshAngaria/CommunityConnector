import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Event from '../models/Event';
import Opportunity from '../models/Opportunity';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, email, userType, name, ...rest } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      username,
      password: hashedPassword,
      email,
      userType,
      name,
      ...rest
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        userType: user.userType,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        userType: user.userType,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(req.user.userId)
      .populate('events')
      .populate('opportunities');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const updates = req.body;
    delete updates.password; // Prevent password update through this route

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updates },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const registerForEvent = async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { eventId } = req.params;
    const userId = req.user.userId;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Add user to event's registered users
    await Event.findByIdAndUpdate(eventId, {
      $addToSet: { registeredUsers: userId }
    });

    // Add event to user's events
    await User.findByIdAndUpdate(userId, {
      $addToSet: { events: eventId }
    });

    res.json({ message: 'Successfully registered for event' });
  } catch (error) {
    console.error('Event registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const applyForOpportunity = async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { opportunityId } = req.params;
    const userId = req.user.userId;

    const opportunity = await Opportunity.findById(opportunityId);
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    // Add user to opportunity's applicants
    await Opportunity.findByIdAndUpdate(opportunityId, {
      $addToSet: { applicants: userId }
    });

    // Add opportunity to user's opportunities
    await User.findByIdAndUpdate(userId, {
      $addToSet: { opportunities: opportunityId }
    });

    res.json({ message: 'Successfully applied for opportunity' });
  } catch (error) {
    console.error('Opportunity application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 
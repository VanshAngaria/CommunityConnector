import { Request, Response } from 'express';
import Opportunity from '../models/Opportunity';
import User from '../models/User';

export const createOpportunity = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const user = await User.findById(userId);

    if (!user || user.userType !== 'ngo') {
      return res.status(403).json({ message: 'Only NGOs can create opportunities' });
    }

    console.log('Creating opportunity:', { ...req.body, organizationId: userId });

    const opportunity = new Opportunity({
      ...req.body,
      organizationId: userId,
      status: 'open',
      applicants: []
    });

    await opportunity.save();

    // Add opportunity to user's opportunities
    await User.findByIdAndUpdate(userId, {
      $addToSet: { opportunities: opportunity._id }
    });

    const populatedOpportunity = await Opportunity.findById(opportunity._id)
      .populate('organizationId', 'name organizationName')
      .lean();

    console.log('Created opportunity:', populatedOpportunity);
    res.status(201).json(populatedOpportunity);
  } catch (error) {
    console.error('Create opportunity error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOpportunities = async (req: Request, res: Response) => {
  try {
    const opportunities = await Opportunity.find({ status: 'open' })
      .populate('organizationId', 'name organizationName')
      .lean();
    res.json(opportunities);
  } catch (error) {
    console.error('Get opportunities error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMyOpportunities = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const opportunities = await Opportunity.find({ organizationId: userId })
      .populate('applicants', 'name email')
      .lean();
    res.json(opportunities);
  } catch (error) {
    console.error('Get my opportunities error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateOpportunity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const opportunity = await Opportunity.findById(id);
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    if (opportunity.organizationId.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this opportunity' });
    }

    const updatedOpportunity = await Opportunity.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    )
    .populate('organizationId', 'name organizationName')
    .lean();

    res.json(updatedOpportunity);
  } catch (error) {
    console.error('Update opportunity error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteOpportunity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const opportunity = await Opportunity.findById(id);
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    if (opportunity.organizationId.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this opportunity' });
    }

    await Opportunity.findByIdAndDelete(id);

    // Remove opportunity from user's opportunities
    await User.findByIdAndUpdate(userId, {
      $pull: { opportunities: id }
    });

    res.json({ message: 'Opportunity deleted successfully' });
  } catch (error) {
    console.error('Delete opportunity error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 
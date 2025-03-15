import { Request, Response } from 'express';
import Application from '../models/Application';
import Opportunity from '../models/Opportunity';
import User from '../models/User';

export const getApplications = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const applications = await Application.find({ userId })
      .populate({
        path: 'opportunityId',
        populate: {
          path: 'organizationId',
          select: 'name organizationName'
        }
      })
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createApplication = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { opportunityId } = req.params;

    console.log('Creating application:', { userId, opportunityId });

    const user = await User.findById(userId);
    const opportunity = await Opportunity.findById(opportunityId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    if (user.userType !== 'individual') {
      return res.status(403).json({ message: 'Only individuals can apply for opportunities' });
    }

    // Check if user has already applied
    const existingApplication = await Application.findOne({ userId, opportunityId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this opportunity' });
    }

    const application = new Application({
      userId,
      opportunityId,
      status: 'pending',
      appliedAt: new Date()
    });

    await application.save();

    // Add application to opportunity's applications and applicants
    await Opportunity.findByIdAndUpdate(opportunityId, {
      $addToSet: { 
        applications: application._id,
        applicants: userId
      }
    });

    // Add application to user's applications
    await User.findByIdAndUpdate(userId, {
      $addToSet: { applications: application._id }
    });

    const populatedApplication = await Application.findById(application._id)
      .populate({
        path: 'opportunityId',
        populate: {
          path: 'organizationId',
          select: 'name organizationName'
        }
      });

    console.log('Application created successfully:', populatedApplication);
    res.status(201).json(populatedApplication);
  } catch (error) {
    console.error('Create application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Only allow NGO users to update application status
    const user = await User.findById(req.user?.userId);
    const opportunity = await Opportunity.findById(application.opportunityId);

    if (!user || !opportunity) {
      return res.status(404).json({ message: 'User or opportunity not found' });
    }

    if (user.userType !== 'ngo' || opportunity.organizationId.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }

    application.status = status;
    await application.save();

    const populatedApplication = await Application.findById(application._id)
      .populate({
        path: 'opportunityId',
        populate: {
          path: 'organizationId',
          select: 'name organizationName'
        }
      });

    res.json(populatedApplication);
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 
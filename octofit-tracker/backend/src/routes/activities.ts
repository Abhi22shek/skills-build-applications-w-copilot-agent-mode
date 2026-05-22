import { Router } from 'express';
import { ActivityModel } from '../models/Activity';

export const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res, next) => {
  try {
    const activities = await ActivityModel.find().sort({ occurredAt: -1 }).populate('userId', 'name email');
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

activitiesRouter.post('/', async (req, res, next) => {
  try {
    const activity = await ActivityModel.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    next(error);
  }
});

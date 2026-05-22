import { Router } from 'express';
import { WorkoutModel } from '../models/Workout';

export const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res, next) => {
  try {
    const workouts = await WorkoutModel.find().sort({ createdAt: -1 });
    res.json(workouts);
  } catch (error) {
    next(error);
  }
});

workoutsRouter.post('/', async (req, res, next) => {
  try {
    const workout = await WorkoutModel.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    next(error);
  }
});

import { Router } from 'express';
import { LeaderboardModel } from '../models/Leaderboard';

export const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardModel.find().sort({ rank: 1 }).populate('userId', 'name email');
    res.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

leaderboardRouter.post('/', async (req, res, next) => {
  try {
    const entry = await LeaderboardModel.create(req.body);
    res.status(201).json(entry);
  } catch (error) {
    next(error);
  }
});

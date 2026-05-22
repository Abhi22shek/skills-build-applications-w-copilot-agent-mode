import { Router } from 'express';
import { TeamModel } from '../models/Team';

export const teamsRouter = Router();

teamsRouter.get('/', async (_req, res, next) => {
  try {
    const teams = await TeamModel.find().populate('memberIds', 'name email').populate('createdBy', 'name email');
    res.json(teams);
  } catch (error) {
    next(error);
  }
});

teamsRouter.post('/', async (req, res, next) => {
  try {
    const team = await TeamModel.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    next(error);
  }
});

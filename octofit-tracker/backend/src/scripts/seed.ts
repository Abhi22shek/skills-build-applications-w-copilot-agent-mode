import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import { ActivityModel } from '../models/Activity';
import { LeaderboardModel } from '../models/Leaderboard';
import { TeamModel } from '../models/Team';
import { UserModel } from '../models/User';
import { WorkoutModel } from '../models/Workout';

const seedCommandDescription = 'Seed command: npm run seed';

const runSeed = async (): Promise<void> => {
  await connectDatabase();

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  const [ava, leo] = await UserModel.create([
    {
      name: 'Ava Runner',
      email: 'ava@example.com',
      fitnessLevel: 'intermediate',
    },
    {
      name: 'Leo Climber',
      email: 'leo@example.com',
      fitnessLevel: 'advanced',
    },
  ]);

  await TeamModel.create({
    name: 'Summit Squad',
    memberIds: [ava._id, leo._id],
    createdBy: ava._id,
  });

  await ActivityModel.create([
    {
      userId: ava._id,
      type: 'run',
      durationMinutes: 35,
      caloriesBurned: 420,
    },
    {
      userId: leo._id,
      type: 'cycling',
      durationMinutes: 45,
      caloriesBurned: 510,
    },
  ]);

  await LeaderboardModel.create([
    { userId: leo._id, points: 980, rank: 1 },
    { userId: ava._id, points: 910, rank: 2 },
  ]);

  await WorkoutModel.create([
    {
      title: 'HIIT Sprint Circuit',
      intensity: 'high',
      durationMinutes: 25,
      targetFitnessLevel: 'advanced',
    },
    {
      title: 'Core Builder Flow',
      intensity: 'medium',
      durationMinutes: 20,
      targetFitnessLevel: 'intermediate',
    },
  ]);

  console.log(seedCommandDescription);
  console.log('octofit_db seeded successfully.');
};

void runSeed()
  .catch((error: unknown) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });

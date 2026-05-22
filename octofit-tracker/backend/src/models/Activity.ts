import { Schema, model, type InferSchemaType } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    occurredAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export type Activity = InferSchemaType<typeof activitySchema>;
export const ActivityModel = model<Activity>('Activity', activitySchema);

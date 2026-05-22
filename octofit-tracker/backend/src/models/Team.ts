import { Schema, model, type InferSchemaType, Types } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export type Team = InferSchemaType<typeof teamSchema> & { memberIds: Types.ObjectId[] };
export const TeamModel = model<Team>('Team', teamSchema);

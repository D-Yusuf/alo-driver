import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  role: { type: String, enum: ['user', 'familyMember'], required: true },
  family: { type: Schema.Types.ObjectId, ref: 'Family' },
  familyAdmin: { type: Boolean, default: false },
  appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }],
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default model('User', UserSchema);

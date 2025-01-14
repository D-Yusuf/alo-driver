import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'familyMember', 'driver'], required: true },
  family: { type: Schema.Types.ObjectId, ref: 'Family' },
  familyAdmin: { type: Boolean, default: false },
  appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  // rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default model('User', UserSchema);

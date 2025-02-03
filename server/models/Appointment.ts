import { Schema, model } from 'mongoose';

const AppointmentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  family: { type: Schema.Types.ObjectId, ref: 'Family' },
  driver: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
  days: { type: [String], enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'], required: true },
  timeFrom: { type: String, required: true },
  timeTo: { type: String, required: true },
  recurring: { type: Boolean, default: false },
  location: { type: String, required: true },
  status: { type: String, enum: ['pending', 'ongoing', 'arrived'], default: 'pending' },
  review: { type: Schema.Types.ObjectId, ref: 'Review' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model('Appointment', AppointmentSchema);

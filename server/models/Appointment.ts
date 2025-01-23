import { Schema, model } from 'mongoose';

const AppointmentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  family: { type: Schema.Types.ObjectId, ref: 'Family' },
  driver: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
  timeFrom: { type: Date, required: true },
  timeTo: { type: Date, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['pending', 'ongoing', 'arrived'], default: 'pending' },
  review: { type: Schema.Types.ObjectId, ref: 'Review' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model('Appointment', AppointmentSchema);

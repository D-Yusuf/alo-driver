import { Schema, model } from 'mongoose';

const AppointmentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  family: { type: Schema.Types.ObjectId, ref: 'Family' },
  driver: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
  timeFrom: { type: Date, required: true },
  timeTo: { type: Date, required: true },
  location: { type: String, required: true },
  done: { type: Boolean, default: false },
  review: { type: Schema.Types.ObjectId, ref: 'Review' },
  createdAt: { type: Date, default: Date.now },
});

export default model('Appointment', AppointmentSchema);

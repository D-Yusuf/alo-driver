import { Schema, model } from 'mongoose';

const DriverSchema = new Schema({
  appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default model('Driver', DriverSchema);

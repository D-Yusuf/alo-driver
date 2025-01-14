import { Schema, model } from 'mongoose';

const DriverSchema = new Schema({
  house: { type: Schema.Types.ObjectId, ref: 'House' },
  name: { type: String, required: true },
  nationality: { type: String },
  job: { type: String },
  appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }]
});

export default model('Driver', DriverSchema);

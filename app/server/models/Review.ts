import { Schema, model } from "mongoose";

const ReviewSchema = new Schema({
  appointment: { type: Schema.Types.ObjectId, ref: 'Appointment', required: true },
  rating: { type: Number, required: true },
  comment: { type: String }
});

export default model('Review', ReviewSchema);
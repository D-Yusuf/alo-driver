import { Schema, model } from 'mongoose';

const FamilySchema = new Schema({
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  drivers: [{ type: Schema.Types.ObjectId, ref: 'Driver' }],
  appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }]
});

export default model('Family', FamilySchema);

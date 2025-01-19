import { Schema, model } from 'mongoose';

const FamilySchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  admins: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    validate: {
      validator: async function(userId: string) {
        const User = model('User');
        const user = await User.findById(userId);
        return user && user.familyAdmin === true;
      },
      message: 'User must be a family admin'
    }
  }],
  drivers: [{ type: Schema.Types.ObjectId, ref: 'Driver' }],
  appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }]
});

export default model('Family', FamilySchema);

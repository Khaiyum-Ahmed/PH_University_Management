import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { AppError } from '../../errors/AppError';
import status from 'http-status';
const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['student', 'admin', 'faculty'] },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// pre save middleware / Hook

userSchema.pre('save', async function () {
  // hashing password and save into DB
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // this refer student document
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  const isUserExists = await UserModel.findOne({
    id: this.id,
  });
  if (isUserExists) {
    throw new AppError(status.NOT_FOUND, `This User is Already Exists !`);
  }
});

// post save middleware / Hook
userSchema.post('save', function () {
  this.password = '';
});

export const UserModel = model<TUser>('user', userSchema);

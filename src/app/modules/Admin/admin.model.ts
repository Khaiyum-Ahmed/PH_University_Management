import { model, Schema } from 'mongoose';
import { AdminModel, TAdmin, TUserName } from './admin.interface';
import { BloodGroup, Gender } from './admin.constant';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    max_length: [20, 'Name can not be more than 20 Characters'],
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    max_length: [20, 'Name can not be more than 20 characters'],
  },
});

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    id: { type: String, required: [true, 'Id is required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: 'User',
      required: [true, 'User Id is required'],
    },
    designation: { type: String, required: [true, 'Designation is required'] },
    name: { type: userNameSchema, required: [true, 'Name is required'] },
    gender: {
      type: String,
      enum: { values: Gender, message: '{VALUE} is not a valid gender' },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not a valid Blood Group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is required'],
    },
    profileImg: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  },
);

// Generating Full name
adminSchema.virtual('fullName').get(function () {
  return (
    this?.name?.firstName +
    '' +
    this?.name?.middleName +
    '' +
    this?.name?.lastName
  );
});

// filter out deleted documents
adminSchema.pre('find', function () {
  this.find({ isDeleted: { $ne: true } });
});
adminSchema.pre('findOne', function () {
  this.find({ isDeleted: { $ne: true } });
});

// Checking if User is already exists!
adminSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Admin.findOne({ id });
  return existingUser;
};

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);

import { model, Schema } from 'mongoose';
import { facultyModel, TFaculty, TUserName } from './faculty.interface';
import { BloodGroup, Gender } from './faculty.constant';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxLength: [20, 'Name can not be more than 20 characters'],
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is Required'],
    maxLength: [20, 'Name can not be more than 20 characters'],
  },
});
const facultySchema = new Schema<TFaculty, facultyModel>(
  {
    id: { type: String, required: [true, 'ID is required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
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
    contactNo: { type: String, required: [true, 'Contact Number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact Number is required'],
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
      required: [true, 'present Address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is required'],
    },
    profileImg: { type: String },
    academicDepartment: {
      type: Schema.ObjectId,
      required: [true, 'Academic Department ID is required'],
      ref: 'AcademicDepartment',
    },
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
facultySchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// filter out deleted documents
facultySchema.pre('find', function () {
  this.find({ isDeleted: { $ne: true } });
});
facultySchema.pre('findOne', function () {
  this.find({ isDeleted: { $ne: true } });
});
facultySchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

// Checking if User is already exists!
facultySchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Faculty.findOne({ id });
  return existingUser;
};

export const Faculty = model<TFaculty, facultyModel>('Faculty', facultySchema);

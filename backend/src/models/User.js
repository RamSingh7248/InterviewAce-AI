import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [60, 'Name cannot exceed 60 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
      index: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false // Never return password hash in regular queries
    },
    refreshToken: {
      type: String,
      default: '',
      select: false
    },
    passwordResetToken: {
      type: String,
      default: '',
      select: false
    },
    passwordResetExpires: {
      type: Date,
      select: false
    },
    onboardingCompleted: {
      type: Boolean,
      default: false
    },
    phoneNumber: {
      type: String,
      default: '',
      trim: true
    },
    college: {
      type: String,
      default: '',
      trim: true
    },
    graduationYear: {
      type: String,
      default: '',
      trim: true
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active'
    },
    resumeSkillsText: {
      type: String,
      default: '',
      trim: true,
      maxlength: [10000, 'Resume text cannot exceed 10,000 characters']
    },
    preferences: {
      targetRole: {
        type: String,
        default: 'Software Engineer',
        trim: true
      },
      preferredDifficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
      },
      preferredCategories: {
        type: [String],
        default: ['Java', 'DSA', 'React', 'SQL/DBMS']
      },
      preferredQuestionCount: {
        type: Number,
        default: 5,
        min: 1,
        max: 10
      }
    }
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Safe JSON serialization: remove sensitive fields
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.refreshToken;
  delete user.passwordResetToken;
  delete user.passwordResetExpires;
  delete user.__v;
  return user;
};

const User = mongoose.model('User', userSchema);
export default User;

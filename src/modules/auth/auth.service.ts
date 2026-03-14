import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, email, password, role } = registerDto;

    // Check if email already exists
    const existing = await this.userModel.findOne({ email: email.toLowerCase() });
    if (existing) {
      throw new ConflictException('An account with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.userModel.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'admin',
    });

    return {
      message: 'Account created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.userModel.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is disabled');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Return user data + a simple token (the user's ID encoded)
    // Since the backend uses API key auth, we return the user data
    // and the frontend stores it for session management
    const token = Buffer.from(`${user._id}:${user.email}:${Date.now()}`).toString('base64');

    return {
      access_token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getAllUsers() {
    return this.userModel.find({}, { password: 0 });
  }

  async logout() {
    return { message: 'Logged out successfully' };
  }

  async forgotPassword(email: string) {
    // In a real app you'd send a reset email
    // For now, just confirm if account exists (don't leak info)
    const user = await this.userModel.findOne({ email: email.toLowerCase() });
    // Always return success to prevent email enumeration
    return {
      message: 'If an account with that email exists, a reset link has been sent.',
    };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../users/schemas/user.schema';
import { UserRole } from '../../../common/enums';

@Injectable()
export class AdminService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async toggleUserStatus(userId: string, isActive: boolean): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(userId, { isActive }, { new: true });
  }

  async updateUserRole(userId: string, role: UserRole): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(userId, { role }, { new: true });
  }
}

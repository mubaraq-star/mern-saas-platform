import { Controller, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from '../services/admin.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/auth.decorator';
import { UserRole } from '../../../common/enums';
import { SuccessResponseDto } from '../../../common/dto/response.dto';

@ApiTags('Admin')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Put('users/:id/status')
  @ApiOperation({ summary: 'Toggle user active status (Admin only)' })
  async toggleUserStatus(@Param('id') id: string, @Body('isActive') isActive: boolean) {
    const user = await this.adminService.toggleUserStatus(id, isActive);
    return new SuccessResponseDto('User status updated', user);
  }

  @Put('users/:id/role')
  @ApiOperation({ summary: 'Update user role (Admin only)' })
  async updateUserRole(@Param('id') id: string, @Body('role') role: UserRole) {
    const user = await this.adminService.updateUserRole(id, role);
    return new SuccessResponseDto('User role updated', user);
  }
}

import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SubscriptionPlan } from '../../../common/enums';

export class CreateSubscriptionDto {
  @ApiProperty({ enum: SubscriptionPlan, example: SubscriptionPlan.PREMIUM })
  @IsEnum(SubscriptionPlan)
  plan: SubscriptionPlan;

  @ApiProperty({ example: 'price_1234567890', description: 'Stripe price ID', required: false })
  @IsString()
  @IsOptional()
  stripePriceId?: string;
}

export class UpdateSubscriptionDto {
  @ApiProperty({ enum: SubscriptionPlan, example: SubscriptionPlan.BASIC })
  @IsEnum(SubscriptionPlan)
  plan: SubscriptionPlan;

  @ApiProperty({ example: 'price_0987654321', description: 'Stripe price ID', required: false })
  @IsString()
  @IsOptional()
  stripePriceId?: string;
}

export class CancelSubscriptionDto {
  @ApiProperty({ example: false, description: 'Cancel immediately or at period end', required: false })
  @IsOptional()
  immediately?: boolean = false;
}

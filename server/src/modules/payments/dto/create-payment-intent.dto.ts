import { IsNumber, IsString, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentIntentDto {
  @ApiProperty({ example: 2999, description: 'Amount in cents' })
  @IsNumber()
  @Min(50)
  amount: number;

  @ApiProperty({ example: 'usd', default: 'usd' })
  @IsString()
  @IsOptional()
  currency?: string = 'usd';

  @ApiProperty({ example: 'premium', description: 'Subscription plan' })
  @IsString()
  @IsOptional()
  plan?: string;
}

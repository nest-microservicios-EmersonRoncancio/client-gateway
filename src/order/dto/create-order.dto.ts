import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { OrderStatus } from '../types/order-status.type';

export class CreateOrderDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  totalAmount: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  totalItems: number;

  @IsEnum(OrderStatus)
  @IsOptional()
  status: OrderStatus = OrderStatus.PENDING;
}

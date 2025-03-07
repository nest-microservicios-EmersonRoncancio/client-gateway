import { IsEnum } from 'class-validator';
import { OrderStatus } from '../types/order-status.type';

export class StatusOrderDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}

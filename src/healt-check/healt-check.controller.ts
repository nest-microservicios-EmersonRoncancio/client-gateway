import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HealtCheckController {
  @Get()
  healthCheck(): string {
    return 'Client Gateway is running';
  }
}

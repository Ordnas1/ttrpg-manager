import { Controller, Get } from '@nestjs/common';
import { GetSystemDTO } from '../dtos/system/get-system.output';
import { SystemService } from '../services/system.service';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}
  @Get()
  async findAll(): Promise<GetSystemDTO[]> {
    return this.systemService.findAll();
  }
}

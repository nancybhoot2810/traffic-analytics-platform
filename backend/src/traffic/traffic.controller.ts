import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { TrafficService } from './traffic.service';
import { CreateTrafficDto } from './dto/create-traffic.dto';
import { UpdateTrafficDto } from './dto/update-traffic.dto';

@Controller('traffic')
export class TrafficController {
  constructor(private readonly trafficService: TrafficService) {}

  @Get()
  getAllTraffic() {
    return this.trafficService.getAllTraffic();
  }

  @Get('country')
  getCountryWiseTraffic() {
    return this.trafficService.getCountryWiseTraffic();
  }

  @Get('vehicle')
  getVehicleWiseTraffic() {
    return this.trafficService.getVehicleDistribution();
  }

  @Post()
  createTraffic(@Body() body: CreateTrafficDto) {
    return this.trafficService.createTraffic(body);
  }

  @Put(':id')
  updateTraffic(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTrafficDto,
  ) {
    return this.trafficService.updateTraffic(id, body);
  }

  @Delete(':id')
  deleteTraffic(@Param('id', ParseIntPipe) id: number) {
    return this.trafficService.deleteTraffic(id);
  }
}
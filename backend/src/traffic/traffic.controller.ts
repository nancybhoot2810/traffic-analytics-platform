import { Controller , Get } from '@nestjs/common';
import { TrafficService } from './traffic.service';

@Controller('traffic')
export class TrafficController {
  constructor(private service: TrafficService) {}

  @Get('country')
  getCountryWise(){
    return this.service.getCountryWiseTraffic();
  }

  @Get('vehicle')
  getVehicleWise(){
    return this.service.getVehicleDistribution();
  }

}

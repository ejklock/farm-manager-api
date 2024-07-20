import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CityService } from 'src/domains/localization/city.service';

@ApiTags('cities')
@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 50 })
  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 50) {
    return this.cityService.getAllPaginated(page, limit);
  }
}

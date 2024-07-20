import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FarmerService } from 'src/domains/farmer/farmer.service';
import { CityService } from 'src/domains/localization/city.service';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';

@ApiTags('farmers')
@Controller('farmers')
export class FarmerController {
  constructor(
    private readonly farmerService: FarmerService,
    private readonly cityService: CityService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createFarmerDto: CreateFarmerDto) {
    const city = await this.cityService.findOneOrFail(createFarmerDto.cityId);
    return this.farmerService.store({
      ...createFarmerDto,
      stateId: city.stateId,
    });
  }

  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.farmerService.getAllPaginated(page, limit);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.farmerService.findOneOrFail(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFarmerDto: UpdateFarmerDto) {
    return this.farmerService.update(id, updateFarmerDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.farmerService.remove(id);
  }
}

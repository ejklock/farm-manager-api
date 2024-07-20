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
import { FarmService } from 'src/domains/farm/farm.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';

@ApiTags('farms')
@Controller('farms')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createFarmDto: CreateFarmDto) {
    return this.farmService.storeWithValidation(createFarmDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.farmService.getAllPaginated(page, limit);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.farmService.findOneOrFail(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFarmDto: UpdateFarmDto) {
    return this.farmService.updateWithValidation(id, updateFarmDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.farmService.remove(id);
  }
}

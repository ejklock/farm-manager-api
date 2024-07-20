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
import { FarmCultureService } from 'src/domains/farm-culture/farm-culture.service';
import { CreateFarmCultureDto } from './dto/create-farm-culture.dto';
import { UpdateFarmCultureDto } from './dto/update-farm-culture.dto';

@ApiTags('farm-cultures')
@Controller('farm-cultures')
export class FarmCultureController {
  constructor(private readonly farmCultureService: FarmCultureService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createFarmCultureDto: CreateFarmCultureDto) {
    return this.farmCultureService.store(createFarmCultureDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.farmCultureService.getAllPaginated(page, limit);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.farmCultureService.findOneOrFail(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateFarmCultureDto: UpdateFarmCultureDto,
  ) {
    return this.farmCultureService.update(id, updateFarmCultureDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.farmCultureService.remove(id);
  }
}

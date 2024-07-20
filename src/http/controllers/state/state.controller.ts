import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { StateService } from 'src/domains/localization/state.service';

@ApiTags('states')
@Controller('states')
export class StateController {
  constructor(private readonly statesService: StateService) {}
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 30 })
  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 30) {
    return this.statesService.getAllPaginated(page, limit);
  }
}

import { getRepositoryToken } from '@nestjs/typeorm';
import { FarmCultureEntity } from 'src/domains/farm-culture/farm-culture.entity';
import { FarmEntity } from 'src/domains/farm/farm.entity';
import { FarmerEntity } from 'src/domains/farmer/farmer.entity';
import { CityEntity } from 'src/domains/localization/city.entity';
import { StateEntity } from 'src/domains/localization/state.entity';
import { DataSource, Repository } from 'typeorm';

export const mockRepositoryProviders = [
  {
    provide: getRepositoryToken(FarmEntity),
    useClass: Repository,
  },
  {
    provide: getRepositoryToken(FarmerEntity),
    useClass: Repository,
  },
  {
    provide: getRepositoryToken(FarmCultureEntity),
    useClass: Repository,
  },
  {
    provide: getRepositoryToken(CityEntity),
    useClass: Repository,
  },
  {
    provide: getRepositoryToken(StateEntity),
    useClass: Repository,
  },
  {
    provide: DataSource,
    useValue: {},
  },
];

import { DecimalColumnTransformer } from 'src/utils/app.transformers';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { FarmerEntity } from '../farmer/farmer.entity';
import { CityEntity } from '../localization/city.entity';
import { StateEntity } from '../localization/state.entity';

@Entity('farms')
export class FarmEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ name: 'farmer_id' })
  farmerId: number;

  @Column({ name: 'city_id' })
  cityId: number;

  @Column({ name: 'state_id' })
  stateId: number;

  @Column({
    name: 'total_hectares_area',
    type: 'decimal',
    unsigned: true,
    precision: 10,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  totalHectaresArea: number;

  @Column({
    name: 'arable_hectares_area',
    type: 'decimal',
    unsigned: true,
    precision: 10,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  arableHectaresArea: number;

  @Column({
    name: 'vegetation_hectares_area',
    type: 'decimal',
    unsigned: true,
    precision: 10,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  vegetationHectaresArea: number;

  @Column({
    select: false,
    insert: false,
    update: false,
    type: 'decimal',
    transformer: new DecimalColumnTransformer(),
  })
  totalOfFarmsHectares: number;

  @ManyToOne(() => FarmerEntity, (farmer) => farmer.farms)
  @JoinColumn({ name: 'farmer_id' })
  farmer: FarmerEntity;

  @ManyToOne(() => CityEntity, (city) => city.farms)
  @JoinColumn({ name: 'city_id' })
  city: CityEntity;

  @ManyToOne(() => StateEntity, (state) => state.farms)
  @JoinColumn({ name: 'state_id' })
  state: StateEntity;
}

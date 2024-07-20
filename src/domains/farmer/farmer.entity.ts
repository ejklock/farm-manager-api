import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { FarmEntity } from '../farm/farm.entity';
import { CityEntity } from '../localization/city.entity';
import { StateEntity } from '../localization/state.entity';

@Entity('farmers')
export class FarmerEntity extends BaseEntity {
  @Column({ name: 'city_id' })
  cityId: number;

  @Column({ name: 'state_id' })
  stateId: number;

  @Column()
  name: string;

  @Column()
  document: string;

  @OneToMany(() => FarmEntity, (farm) => farm.farmer)
  @JoinColumn({ name: 'farm_id' })
  farms: FarmEntity[];

  @ManyToOne(() => CityEntity, (city) => city.farmers)
  @JoinColumn({ name: 'city_id' })
  city: CityEntity;

  @ManyToOne(() => StateEntity, (state) => state.farmers)
  @JoinColumn({ name: 'state_id' })
  state: StateEntity;
}

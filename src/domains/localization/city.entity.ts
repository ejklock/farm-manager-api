import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { FarmEntity } from '../farm/farm.entity';
import { FarmerEntity } from '../farmer/farmer.entity';

@Entity('cities')
export class CityEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ name: 'state_id' })
  stateId: number;

  @Column({ name: 'ibge_code' })
  ibgeCode: number;

  @OneToMany(() => FarmerEntity, (farmer) => farmer.city)
  farmers: FarmerEntity[];

  farms: FarmEntity[];
}

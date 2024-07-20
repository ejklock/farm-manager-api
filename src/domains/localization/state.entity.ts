import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { FarmEntity } from '../farm/farm.entity';
import { FarmerEntity } from '../farmer/farmer.entity';

@Entity('states')
export class StateEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ name: 'uf' })
  uf: string;

  @Column({ name: 'ibge_code' })
  ibgeCode: number;

  @OneToMany(() => FarmerEntity, (farmer) => farmer.city)
  farmers: FarmerEntity[];

  @OneToMany(() => FarmEntity, (farm) => farm.state)
  farms: FarmEntity[];
}

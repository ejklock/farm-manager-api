import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { CultureTypeEnum } from './farm-culture.types';

@Entity('farm_cultures')
export class FarmCultureEntity extends BaseEntity {
  @Column({ name: 'farm_id' })
  farmId: number;

  @Column({
    name: 'type',
    enum: CultureTypeEnum,
    type: 'enum',
    nullable: false,
  })
  type: CultureTypeEnum;
}

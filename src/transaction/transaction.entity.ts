import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp with time zone')
  public dateTime: Date = new Date();

  @Column({ nullable: true, default: null })
  public currency_from: string;

  @Column({ nullable: true, default: null })
  public amount_1: number;

  @Column({ nullable: true, default: null })
  public currency_to: string;

  @Column({ nullable: true, default: null })
  public amount_2: number;

  @Column({ nullable: true, default: null })
  public type: string;
}

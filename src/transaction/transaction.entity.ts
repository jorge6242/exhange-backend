import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp with time zone')
  public dateTime: Date = new Date();

  @Column({ nullable: true, default: null })
  public currencyFrom: string;

  @Column({ nullable: true, default: null })
  public amount1: number;

  @Column({ nullable: true, default: null })
  public currencyTo: string;

  @Column({ nullable: true, default: null })
  public amount2: number;

  @Column({ nullable: true, default: null })
  public type: string;
}

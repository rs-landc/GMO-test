import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Parties2 } from '@entities/parties2s';

@Entity('parties3s')
export class Parties3 {
  @Column({ type: 'integer', primary: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'timestamp' })
  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true, type: 'timestamp' })
  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: false, type: 'integer' })
  parties2_id: number;

  @Column({ nullable: true, type: 'text' })
  content: string;

  @ManyToOne(() => Parties2, (parties2) => parties2.parties3s, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parties2_id' })
  parties2: Parties2;
}

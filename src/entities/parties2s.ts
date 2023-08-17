import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Participant } from '@entities/participants';
import { Parties3 } from '@entities/parties3s';

@Entity('parties2s')
export class Parties2 {
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
  participant_id: number;

  @Column({ nullable: true, type: 'text' })
  content: string;

  @ManyToOne(() => Participant, (participant) => participant.parties2s, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'participant_id' })
  participant: Participant;

  @OneToMany(() => Parties3, (parties3) => parties3.parties2, { cascade: true })
  @JoinColumn({ name: 'parties2_id' })
  parties3s: Parties3[];
}

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
import { User } from '@entities/users';
import { Party } from '@entities/parties';
import { Parties2 } from '@entities/parties2s';

@Entity('participants')
export class Participant {
  @Column({ type: 'integer', primary: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'timestamp' })
  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true, type: 'timestamp' })
  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, type: 'integer' })
  status: number;

  @Column({ nullable: false, type: 'integer' })
  user_id: number;

  @Column({ nullable: false, type: 'integer' })
  party_id: number;

  @ManyToOne(() => User, (user) => user.participants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Party, (party) => party.participants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'party_id' })
  party: Party;

  @OneToMany(() => Parties2, (parties2) => parties2.participant, { cascade: true })
  @JoinColumn({ name: 'participant_id' })
  parties2s: Parties2[];
}

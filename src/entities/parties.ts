import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { StorageFile } from '@entities/storage_files';
import { Admin } from '@entities/admins';
import { Participant } from '@entities/participants';

@Entity('parties')
export class Party {
  @Column({ type: 'integer', primary: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'timestamp' })
  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true, type: 'timestamp' })
  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, type: 'varchar' })
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  address: string;

  @Column({ nullable: true, type: 'timestamp' })
  time_takes_place: Date;

  @Column({ nullable: true, type: 'integer' })
  number_of_registrations: number;

  @Column({ nullable: true, type: 'integer' })
  registered_quantity: number;

  @Column({ nullable: true, type: 'varchar', default: '' })
  status_party: string = '';

  @OneToOne(() => StorageFile, { cascade: true })
  @JoinColumn()
  banner: StorageFile;

  @Column({ nullable: true, type: 'integer' })
  min_age: number;

  @Column({ nullable: false, type: 'integer' })
  admin_id: number;

  @ManyToOne(() => Admin, (admin) => admin.parties, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @OneToMany(() => Participant, (participant) => participant.party, { cascade: true })
  @JoinColumn({ name: 'party_id' })
  participants: Participant[];
}

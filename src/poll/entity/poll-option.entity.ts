import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Poll } from './poll.entity';
import { Vote } from './vote.entity';

@Entity()
export class PollOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  option: string;

  @OneToMany(() => Vote, (option) => option.pollOption, { cascade: true })
  votes: Vote[];

  @ManyToOne(() => Poll, (poll) => poll.options)
  poll: Poll;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToMany, OneToMany, BaseEntity, JoinTable, ManyToOne, OneToOne } from 'typeorm';
import { User } from './User';
import { Message } from './Message';
import { IsOptional, IsString } from 'class-validator';

@Entity()
export class Channel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Channel name should be a string.' })
  name: string;

  @ManyToOne(() => User, { cascade: true, eager: true })
  @JoinColumn()
  author: User;

  @ManyToMany(() => User, user => user.channels, { cascade: true, eager: true })
  @JoinTable({ name: 'user_channels' })
  users: User[];

  @OneToMany(() => Message, message => message.channel)
  messages: Message[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createTime: string;

  @Column({ type: 'timestamp', default: () => null, nullable: true })
  lastUpdateTime: Date;
}

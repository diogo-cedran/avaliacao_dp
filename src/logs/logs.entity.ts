// src/logs/log.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  route: string;

  @Column()
  method: string;

  @Column('double')
  responseTime: number;

  @CreateDateColumn()
  createdAt: Date;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Project } from 'src/project/entities/project.entity'

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column('text')
  description: string;

  @ManyToOne(() => Project, project => project.issues)
  @JoinColumn({ name: "project_id" }) // Set a custom name
  project: Project;

  @ManyToOne(() => User, user => user.issues)
  @JoinColumn({ name: "created_by" }) // Set a custom name
  created_by: User;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_at: Date;

  @Column({ default: true })
  is_active: boolean;
}

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    OneToOne
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Issue } from "../../issue/entities/issue.entity"

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column('text')
    description: string;

    @OneToMany(() => Issue, issue => issue.project)
    issues: Issue[];

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

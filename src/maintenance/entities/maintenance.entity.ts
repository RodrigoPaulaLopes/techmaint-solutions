import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { MaintenanceType } from '../enums/maintenance-type.enum';
import { Machine } from '../../machines/entities/machine.entity';

@Entity('maintenances')
export class Maintenance {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'timestamp', nullable: true })
    scheduledDate: Date;

    @Column()
    type: MaintenanceType

    @Column()
    status: MaintenanceType;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Machine, machine => machine.maintenances)
    machine: Machine
    
    @ManyToMany(() => User, (technician) => technician.maintenances, {
        cascade: true,
    })
    @JoinTable({
        name: 'technician_maintenance',
        joinColumn: {
            name: 'maintenance_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'technician_id',
            referencedColumnName: 'id',
        },
    })
    technicians: User[];
}

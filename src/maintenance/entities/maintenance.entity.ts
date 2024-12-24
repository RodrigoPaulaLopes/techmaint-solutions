import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { MaintenanceType } from '../enums/maintenance-type.enum';
import { Machine } from '../../machines/entities/machine.entity';
import { MaintenanceStatus } from '../enums/maintenance-status.enum';

@Entity('maintenances')
export class Maintenance {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'timestamp', nullable: true })
    date_maintenance: Date;

    @Column({ type: 'varchar', length: 50 })
    type: MaintenanceType;

    @Column({ type: 'varchar', length: 50 })
    status: MaintenanceStatus;

    @CreateDateColumn({name: 'created_at'})
    createdAt?: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt?: Date;


    @ManyToOne(() => Machine, (machine) => machine.maintenances, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'machine_id' })
    machine: Machine;

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

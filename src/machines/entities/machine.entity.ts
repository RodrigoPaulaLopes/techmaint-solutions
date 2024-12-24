import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Maintenance } from "../../maintenance/entities/maintenance.entity";

@Entity('machines')
export class Machine {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    manufacturer: string;

    @Column()
    description?: string;

    @OneToMany(() => Maintenance, (maintenance) => maintenance.machine)
    maintenances: Maintenance[];
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserType } from "../enums/user-type.enum";
import { Permissions } from "../enums/permissions.enum";
import { Maintenance } from "../../maintenance/entities/maintenance.entity";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string


    @Column()
    email: string

    @Column()
    password: string


    @Column({
        enum: Permissions,
        type: 'enum'
    })
    user_type: UserType
    @Column({
        type: 'enum',
        enum: Permissions,
        array: true,  
    })
    permissions: Permissions[]

    @Column({ nullable: true })
    reset_password_code: string;

    @Column({ nullable: true, type: 'timestamp' })
    reset_password_expires: Date;

    @ManyToMany(() => Maintenance, (maintenance) => maintenance.technicians)
    maintenances: Maintenance[];
    
    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP', 
    })
    updated_at: Date

}

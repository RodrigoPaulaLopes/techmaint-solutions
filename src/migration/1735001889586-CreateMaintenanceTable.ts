import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { MaintenanceType } from "../maintenance/enums/maintenance-type.enum";
import { MaintenanceStatus } from "../maintenance/enums/maintenance-status.enum";

export class CreateMaintenanceTable1735001889586 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
  
        await queryRunner.createTable(new Table({
            name: 'maintenances',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'type',
                    type: 'enum',
                    enum: Object.values(MaintenanceType),
                    isNullable: false,
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: Object.values(MaintenanceStatus),
                    isNullable: false,
                },
                {
                    name: 'machine_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'date_maintenance',
                    type: 'date',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }));

        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('maintenances');
    }
}

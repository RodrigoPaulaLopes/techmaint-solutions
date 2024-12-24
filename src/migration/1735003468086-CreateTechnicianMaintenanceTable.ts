import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTechnicianMaintenanceTable1735003468086 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'technician_maintenance',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'technician_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'maintenance_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'assigned_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('technician_maintenance');
    }

}

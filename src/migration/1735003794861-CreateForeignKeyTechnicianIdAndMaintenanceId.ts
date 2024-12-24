import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateForeignKeyTechnicianIdAndMaintenanceId1735003794861 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'technician_maintenance',
            new TableForeignKey({
                columnNames: ['technician_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users', 
                onDelete: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'technician_maintenance',
            new TableForeignKey({
                columnNames: ['maintenance_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'maintenances',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('technician_maintenance');
        const foreignKeyTechnician = table.foreignKeys.find(fk => fk.columnNames.indexOf('technician_id') !== -1);
        if (foreignKeyTechnician) {
            await queryRunner.dropForeignKey('technician_maintenance', foreignKeyTechnician);
        }

        const foreignKeyMaintenance = table.foreignKeys.find(fk => fk.columnNames.indexOf('maintenance_id') !== -1);
        if (foreignKeyMaintenance) {
            await queryRunner.dropForeignKey('technician_maintenance', foreignKeyMaintenance);
        }
    }

}

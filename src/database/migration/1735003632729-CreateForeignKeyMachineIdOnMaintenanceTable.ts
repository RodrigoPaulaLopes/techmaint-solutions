import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateForeignKeyMachineIdOnMaintenanceTable1735003632729 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'maintenances',
            new TableForeignKey({
                columnNames: ['machine_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'machines', 
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('technician_maintenance');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('technician_id') !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey('technician_maintenance', foreignKey);
        }
    }

}

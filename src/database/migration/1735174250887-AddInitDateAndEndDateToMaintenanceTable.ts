import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class AddInitDateAndEndDateToMaintenanceTable1735174250887 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn('maintenances', new TableColumn(
            {
                name: 'init_date',
                type: 'date',
                isNullable: true
            },
        ))
        await queryRunner.addColumn('maintenances', new TableColumn(
            {
                name: 'end_date',
                type: 'date',
                isNullable: true
            },
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropColumn('maintenances', 'end_date')
        await queryRunner.dropColumn('maintenances', 'init_date')
    }

}

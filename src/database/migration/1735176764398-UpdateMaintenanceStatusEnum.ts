import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMaintenanceStatusEnum1735176764398 implements MigrationInterface {
    name = 'UpdateMaintenanceStatusEnum1735176764398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Adicionando o valor 'Canceled' ao enum 'maintenances_status_enum'
        await queryRunner.query(`
            ALTER TYPE maintenances_status_enum ADD VALUE 'Canceled';
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Não é possível remover valores de um enum diretamente em PostgreSQL,
        // Então você precisará de um processo alternativo caso queira desfazer essa migração.
        console.log("Downgrade não suportado para enum no PostgreSQL");
    }
}

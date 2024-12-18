import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddResetPasswordFieldsToUserTable1734494391951 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
              name: 'reset_password_code',
              type: 'varchar',
              isNullable: true,
            }),
          );
      

          await queryRunner.addColumn(
            'users',
            new TableColumn({
              name: 'reset_password_expires',
              type: 'timestamp',
              isNullable: true,
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'reset_password_code');
        await queryRunner.dropColumn('users', 'reset_password_expires');
    }

}

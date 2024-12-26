import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { UserType } from "../../users/enums/user-type.enum";
import { Permissions } from "../../users/enums/permissions.enum";

export class CreateUserTable1734484740789 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    default: 'uuid_generate_v4()',

                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: true,

                },
                {
                    name: "email",
                    type: "varchar",
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: false,

                },
                {
                    name: 'user_type',
                    type: 'enum',
                    enum: Object.values(UserType),  
                  },
                  {
                    name: 'permissions',
                    type: 'enum',
                    isArray: true,  
                    enum: Object.values(Permissions),  
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
                  

            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("users")
    }

}

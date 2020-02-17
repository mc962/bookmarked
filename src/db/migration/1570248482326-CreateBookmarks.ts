import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateBookmarks1570248482326 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "bookmarks",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "url",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "sync_transaction_url",
                    type: "varchar"
                },
                {
                    name: "meta_info",
                    type: "json"
                },
                {
                    name: "folder_path",
                    type: "varchar",
                    isNullable: false
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('bookmarks');
    }

}

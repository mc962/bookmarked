import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema
        .createTable('folders', (table) => {
            table.increments('id');
            table.string('name', 255).notNullable().unique();
            table.string('folder_path', 255);
            table.timestamps();
        })
        .alterTable('bookmarks', (table) => {
            table.integer('folder_id');
            table.foreign('folder_id')
                .references('folders.id');
        });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema
        .alterTable('bookmarks', (table) => {
            table.dropForeign(['folder_id']);
        })
        .dropTable('folders')
}


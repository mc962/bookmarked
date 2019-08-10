import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema
        .createTable('bookmarks', (table) => {
            table.increments('id');
            table.string('name', 255).notNullable();
            table.string('url', 255).notNullable().unique();
            table.string('folder_path');
            table.jsonb('meta_info');
            table.timestamps();
        });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema
        .dropTable('bookmarks');
}


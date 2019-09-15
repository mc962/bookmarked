// TODO move this env var to a better setup strategy
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

import { Model } from 'objection';
import Knex from 'knex';

import Bookmark from './models/bookmark';
import knexSettings from './knexfile';

// initialize knex
export const knex = Knex(knexSettings.development)

// Create or migrate:
// knex.migrate.latest();

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.
Model.knex(knex);
knex.migrate.latest().then(() => console.log('Migrated.'));

// const testInsert = async () => {
//     await Bookmark.query().insert(
//         {
//             name: 'abc',
//             url: 'http://www.google.com',
//             folder_path: 'a/b/c',
//             meta_info: {a: 'b'}
//     }
//     )
// };

const test = async () => {
    const bookmarks = await Bookmark.query();
    console.log(bookmarks.length);
};

test()
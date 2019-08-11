// TODO move this env var to a better setup strategy
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const { Model } = require('objection');
const Knex = require('knex');

import Bookmark from './db/models/bookmark';
const knexConfig = require('./db/knexfile');

// initialize knex
export const knex = Knex(knexConfig[process.env.NODE_ENV])

// Create or migrate:
// knex.migrate.latest();

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.
Model.knex(knex);

const testInsert = async () => {
    await Bookmark.query().insert(
        {
            name: 'abc',
            url: 'http://www.google.com',
            folder_path: 'a/b/c',
            meta_info: {a: 'b'}
    }
    )
};

const test = async () => {
    const bookmarks = await Bookmark.query();
    console.log(bookmarks.length);
};

test()
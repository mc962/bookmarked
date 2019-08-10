// TODO move this env var to a better setup strategy
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

import { Model } from 'objection';
const knexConfig = require('./db/knexfile');

// initialize knex
export const knex = Knex(knexConfig[process.env.NODE_ENV])

// Create or migrate:
// knex.migrate.latest();

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.
Model.knex(knex);
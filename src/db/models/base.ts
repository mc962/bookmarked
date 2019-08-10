import { snakeCaseMappers } from "objection";

const { Model } = require('objection');

class Base extends Model {
    static columnNameMappers = snakeCaseMappers();

    createdAt: string | undefined;
    updatedAt: string | undefined;

    constructor() {
        super();
    }

    $beforeInsert() {
        const date = new Date().toUTCString();
        this.createdAt = date;
        this.updatedAt = date;
    }

    $beforeUpdate() {
        this.updatedAt = new Date().toUTCString();
    }

    // Optional JSON schema. This is not the database schema!
    // No tables or columns are generated based on this. This is only
    // used for input validation. Whenever a model instance is created
    // either explicitly or implicitly it is checked against this schema.
    // See http://json-schema.org/ for more info.
    // static get jsonSchema() {
    //     return {
    //         type: 'object',
    //         required: ['createdAt', 'updatedAt'],

    //         properties: {
    //             id: {type: 'integer'},
    //             createdAt: {type: ['Date']},
    //             updatedAt: {type: ['Date']}
    //         }
    //     }
    // }

    // static get defaultSchema() {
    //     return 'my_db_schema';
    // }
}

export default Base;
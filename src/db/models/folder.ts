import Base from './base';
import Bookmark from './ bookmark';

class Folder extends Base {
    // constructor() {
    //     super()
    // }

    static tableName = 'folders';
    static idColumn = 'id';

    static jsonSchema = {
        type: 'object',
        required: ['name', 'createdAt', 'updatedAt'],

        properties: {
            id: {type: 'integer'},
            name: {type: 'string', minlength: 1, maxlength: 255},
            folderPath: {type: 'sring'},
            createdAt: {type: ['Date']},
            updatedAt: {type: ['Date']}
        }
    }

    static relationMappings = {
        bookmarks: {
            relation: Model.HasManyRelation,
            modelClass: Bookmark,
            join: {
                from: 'folder.id',
                to: 'bookmark.folderid'
            }
        }
    }
}

export default Folder;
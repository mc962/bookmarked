import Base from './base';
import Folder from './folder';

class Bookmark extends Base {
    // constructor() {
    //     super()
    // }
        
    static tableName = 'bookmarks';
    static idColumn = 'id';
    
    static jsonSchema = {
        type: 'object',
        required: ['name', 'url', 'createdAt', 'updatedAt'],

        properties: {
            id: {type: 'integer'},
            folderId: {type: ['integer', 'null']},
            name: {type: 'string', minlength: 1, maxlength: 255},
            url: {type: 'string', minlength: 1, maxlength: 255},
            folderPath: {'type': 'string'},
            meta_info: {'type': 'object'},
            createdAt: {type: ['Date']},
            updatedAt: {type: ['Date']}
        }
    };

    static relationMappings = {
        folder: {
            relation: Model.BelongsToOneRelation,
            modelClass: Folder,
            join: {
                from: 'bookmark.folderId',
                to: 'folder.id'
            }
        }
    };
}

export default Bookmark;
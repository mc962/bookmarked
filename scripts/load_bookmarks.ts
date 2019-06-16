const fse = require('fs-extra');
const os = require('os');

interface BookmarksFileContents {
  roots: object;
  version: string;
}

interface BookmarkData {
  date_added: string; // stringified number
  id: string; // stringified number
  name: string;
  type: string;
  url: string;
  sync_transaction_version?: string; // stringified number
  meta_info?: object;
}

interface BookmarkFolderData {
  date_added: string; // stringified number
  date_modified: string; // stringified number
  id: string; // stringified number
  name: string;
  type: string;
  sync_transaction_version?: string; // stringified number
  children: Array<BookmarkData>;
}

class BookmarkManager {
  static ignoredKeys = new Set(['sync_transaction_version']);
  static ignoreBookmarkRegexp = /^((chrome|chrome-native):\/\/).*/;

  platform: string;
  bookmarksFilePath: string;
  bookmarks: Array<object>;

  constructor() {
    this.platform = os.platform();
    this.bookmarksFilePath = this._setBookmarksFilePath();

    this.bookmarks = [];
  }

  parseBookmarks() {
    //   I think I'm misunderstanding await a little bit, I thought I could use async/await to get value from readBookmarksFile
    // While instead I was getting a promise that wasn't resolving to a value
    // TODO find a way around this hacky method of converting types from Promise to BookmarksFileContents
    this._readBookmarksFile().then(bookmarksFileContents => {
      const bookmarks = bookmarksFileContents.roots;
      this._parseBookmarkData(bookmarks);
    });
    // iterate through 'roots'
    // ignore anything that starts with chrome:// (these are internal links we don't care about)
    // if type is folder
    // iterate deeper (recursive?), potentially pass in current 'folder' to track information about current folder / etc.
    // create a new 'folder' model?
    // if type is url, create a new Bookmark model, add it to any category/folder stuff
  }

  // make a better type later, but we explicitly don't know what type this will be, a folder or a basic bookmark
  _parseBookmarkData(bookmarksData: any) {
    for (let [k, v] of Object.entries(bookmarksData)) {
      if (!BookmarkManager.ignoredKeys.has(k)) {
        this._parseFolderData(v);
      }
    }
  }

  _parseFolderData(bookmarksData: any) {
    let folderBookmarks: Array<object> = [];

    if (bookmarksData.type === 'folder') {
      const castedFolder = bookmarksData as BookmarkFolderData;
      castedFolder.children.forEach(childData => {
        this._parseFolderData(childData);
      });
    } else if (bookmarksData.type === 'url') {
      const castedBookmark = bookmarksData as BookmarkData;
      this.createBookmark(bookmarksData);
      return;
    } else {
      console.log('Uncategorized type: ', bookmarksData);
    }
  }

  createBookmark(bookmarkData: BookmarkData) {
    if (this._shouldIgnoreBookmark(bookmarkData.url)) {
      console.log(`Ignoring browser-internal url: ${bookmarkData.url}`);
    } else {
      console.log('Bookmark: ', bookmarkData.url);
      this.bookmarks.push(bookmarkData);
    }
  }

  async _readBookmarksFile(): Promise<BookmarksFileContents> {
    // any potential errors thrown here should cause script to fail fast
    // catch in calling script if this behavior is undesirable
    const pathExists = await fse.pathExists(this.bookmarksFilePath);
    if (pathExists) {
      const fileContents = await fse.readJSON(this.bookmarksFilePath);
      return fileContents;
    } else {
      throw 'Bookmarks file does not exist!';
    }
  }

  _setBookmarksFilePath() {
    let bookmarksPath: string;

    // TODO support other platforms
    switch (this.platform) {
      case 'linux':
        // path is not needed here, as this is a linux-only path
        // bookmarksPath = `${os.homedir()}/.config/google-chrome/Default/Bookmarks`
        bookmarksPath = `${os.homedir()}/Desktop/Bookmarks`;
        break;
      default:
        // error thrown here should cause script to fail fast
        // catch in calling script if this behavior is undesirable
        throw 'Unknown platform!';
    }

    return bookmarksPath;
  }

  _shouldIgnoreBookmark(bookmarkUrl: string): boolean {
    // if test matches/returns true, indicating url is covered by bookmarks-ignoring regex,
    // return true indicating we should ignore this bookmark, and false otherwise
    return BookmarkManager.ignoreBookmarkRegexp.test(bookmarkUrl);
  }
}

export default BookmarkManager;

// let val;
// (async () => {
//     val = await bm.parseBookmarks();
// })()

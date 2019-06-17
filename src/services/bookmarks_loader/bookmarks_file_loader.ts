const fse = require('fs-extra');
const os = require('os');
const path = require('path');

import {
  BookmarksFileContents,
  BookmarkData,
  BookmarksFolderData
} from './interfaces';

class BookmarksFileLoader {
  // TODO support other browsers than chrome
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

  /**
   * Read bookmarks file and then parse bookmarks from read file contents
   */
  parseBookmarks() {
    //   I think I'm misunderstanding await a little bit, I thought I could use async/await to get value from readBookmarksFile
    // While instead I was getting a promise that wasn't resolving to a value
    // TODO find a way around this hacky method of converting types from Promise to BookmarksFileContents
    this._readBookmarksFile().then(bookmarksFileContents => {
      // get data from 'roots' key, which contains actual bookmarks data
      const bookmarks = bookmarksFileContents.roots;
      this._parseBookmarkData(bookmarks);
    });
  }

  /**
   * Initial parsing of Bookmarks data
   * Because top-level of file has somewhat different structure than sub-folders,
   * it is parsed somewhat differently than sub-folders by using for..of and Object.entries
   * @param {object} bookmarksData initial Bookmarks data extracted from file's 'roots' key
   */
  _parseBookmarkData(bookmarksData: object) {
    for (let [rootsKey, rootsBookmarkData] of Object.entries(bookmarksData)) {
      if (!BookmarksFileLoader.ignoredKeys.has(rootsKey)) {
        this._parseFolderData(rootsBookmarkData);
      }
    }
  }

  /**
   * Recursively iterate through passed bookmarks object until a bookmarks is found, at which point
   * bookmark may be created
   * @param {BookmarksFolderData | BookmarkData} bookmarksData single bookmark 'base case' to be used to create a bookmark,
   *  or folder to recurse into for further bookmarks
   * @param {string} folderName current folder's path that tracks which folder bookmark is inside
   */
  _parseFolderData(
    bookmarksData: BookmarksFolderData | BookmarkData,
    folderName: string = ''
  ) {
    // either recurse through to the child bookmarks of folder, or take action on a single bookmark (base case),
    // depending on 'type' attribute of bookmarksData
    if (bookmarksData.type === 'folder') {
      // cast as BookmarksFolderData when type is known to be a folder
      const castedFolder = bookmarksData as BookmarksFolderData;

      // iterate through and take action on each child in the folder
      castedFolder.children.forEach(childData => {
        // create 'current path' of folder bookmark is contained in by adding the 'name' attribute of
        // the object recognized as a folder to the folderName built in the previous recursive iteration
        const nestedPath = path.join(folderName, castedFolder.name);
        // recursively iterate through folder's children
        this._parseFolderData(childData, nestedPath);
      });
    } else if (bookmarksData.type === 'url') {
      // cast as BookmarksFolderData when type is known to be a bookmark
      const castedBookmark = bookmarksData as BookmarkData;
      // add path to folder containing current bookmark to data that will be used to create a new bookmark
      castedBookmark.folder_path = folderName;
      // create a new bookmark object with the current bookmark data
      this.createBookmark(castedBookmark);
      // return from the current stack frame
      // (return value is unnecessary as it is already used to create new bookmark)
      return;
    } else {
      // current file parsing algorithm should account for all keys/values in Bookmarks file
      // if it does not, and this block is reached, then the parser should no longer be trusted and
      // the file parsing should be aborted
      throw new Error(`Uncategorized type found in: ${bookmarksData}`);
    }
  }

  /**
   * STUB for actual Bookmark creation, RE-DOCUMENT when implementation is finalized
   * @param {BookmarkData} bookmarkData attributes to be used to create new Bookmark
   */
  createBookmark(bookmarkData: BookmarkData) {
    if (this._shouldIgnoreBookmark(bookmarkData.url)) {
      // console.log(`Ignoring browser-internal url: ${bookmarkData.url}`);
    } else {
      // console.log(
      //   'Bookmark: ',
      //   path.join(bookmarkData.folder_path, bookmarkData.url)
      // );
      this.bookmarks.push(bookmarkData);
    }
  }

  /**
   * Read Bookmarks file (if exists) and return its file contents
   * Any potential errors thrown here should cause loader to fail fast
   * Catch in the calling function if this behavior is undesirable
   * @returns {Promise<BookmarksFileContents>}
   */
  async _readBookmarksFile(): Promise<BookmarksFileContents> {
    const pathExists = await fse.pathExists(this.bookmarksFilePath);
    if (pathExists) {
      const fileContents = await fse.readJSON(this.bookmarksFilePath);
      return fileContents;
    } else {
      throw 'Bookmarks file does not exist!';
    }
  }

  /**
   * Utility to set file path on service initialization for Bookmarks file based on computer platform
   */
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

  /**
   * Determine if bookmark should be ignored, such as if bookmark is an internal link
   * @param bookmarkUrl bookmark to test (using url) for matching against ignore regex
   */
  _shouldIgnoreBookmark(bookmarkUrl: string): boolean {
    // if test matches/returns true, indicating url is covered by bookmarks-ignoring regex,
    // return true indicating we should ignore this bookmark, and false otherwise
    return BookmarksFileLoader.ignoreBookmarkRegexp.test(bookmarkUrl);
  }
}

export default BookmarksFileLoader;

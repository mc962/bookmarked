export interface BookmarksFileContents {
  roots: object;
  version: string;
}

export interface BookmarkData {
  date_added: string; // stringified number
  id: string; // stringified number
  name: string;
  type: string;
  url: string;
  sync_transaction_version?: string; // stringified number
  meta_info?: object;
  folder_path?: string;
}

export interface BookmarksFolderData {
  date_added: string; // stringified number
  date_modified: string; // stringified number
  id: string; // stringified number
  name: string;
  type: string;
  sync_transaction_version?: string; // stringified number
  children: Array<BookmarkData>;
}

import React from 'react';
import BookmarkListItem from './bookmark_list_item';
import './bookmarks_list.css';

type BookmarksListProps = {
    bookmarks: Array<object>
}

class BookmarksList extends React.Component<BookmarksListProps, {}> {
    constructor(props: BookmarksListProps) {
        super(props)

        this.navigateBookmark = this.navigateBookmark.bind(this);
    }

    // type is placeholder until structure is decided
    _listItems(items: any) {
        return items.map((item: any) => {
            return(
                <BookmarkListItem key={item.id} id={item.id} name={item.name} url={item.url} type={item.type} metaProperties={item.metaProperties} />
            );
        });
    }

    navigateBookmark(event: Event) {
        event.preventDefault();
        console.info('Individual bookmark pages Coming Soon!');
    }

    render() {
        return (
            <ul className='bookmarks-directory'>
                {this._listItems(this.props.bookmarks)}
            </ul>
        );
    }
}

export default BookmarksList;
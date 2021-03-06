import React from 'react';
import './bookmark_list_item.css';

type MetaProperties = {
    title: string,
    image: string,
    description: string,
    [index: string]: string
}

type ItemProps = {
    id: number,
    name: string,
    type: string,
    url: string,
    metaProperties: MetaProperties
}

type ItemState = {
    title: string,
    description: string,
    image: string,
    url: string
}

class BookmarkListItem extends React.Component<ItemProps, ItemState> {
    constructor(props: ItemProps) {
        super(props)

        this.state = {
            title: '',
            description: '',
            image: '',
            url: ''
        }
    }

    componentDidMount() {
        const metaProperties: MetaProperties = {
            title: this.props.metaProperties['og:title'],
            description: this.props.metaProperties['og:description'],
            image: this.props.metaProperties['og:image']
        }

        this.setState({
            title: metaProperties.title,
            description: metaProperties.description,
            image: metaProperties.image
        });
    }

    render() {
        return (
            <li className="bookmark-list-item card">
                <h6 className='bookmark-title'>{this.props.name}</h6>
                {/* Need to fix this, HTML does not allow nested anchors, and may lead to weird React/DOM fights */}
                {/* <a href={this.props.url} target='_blank' rel='noopener noreferrer' className='bookmark-url'> */}
                    <div className='bookmark-stats'>
                        {/* <h6 className='bookmark-title'>{this.state.title}</h6> */}
                        <img src={this.state.image} alt={`${this.state.title} - Bookmark Preview`} className='bookmark-image' />
                        {/* TODO slice is temporary, to set max test size for styling, replace with real feature */}
                        <p className='bookmark-description'>{this.state.description.slice(0, 70)}</p>
                    </div>
                {/* </a> */}
            </li>
        );
    }
}


export default BookmarkListItem;
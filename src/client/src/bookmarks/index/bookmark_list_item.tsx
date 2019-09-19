import React from 'react';

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
            <li className="bookmark-list-item">
                <a href={this.props.url} target='_blank' rel='noopener noreferrer'>
                    <h6 className='bookmark-title'>{this.props.name}</h6>
                    <div className='bookmark-card'>
                        {/* <h6 className='bookmark-title'>{this.state.title}</h6> */}
                        <img src={this.state.image} alt={`${this.state.title} - Bookmark Preview`} className='bookmark-image' />
                        <p className='bookmark-description'>{this.state.description}</p>
                    </div>
                </a>
            </li>
        );
    }
}


export default BookmarkListItem;
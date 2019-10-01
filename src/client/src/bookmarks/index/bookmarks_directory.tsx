import React from 'react';
import BookmarksList from './bookmarks_list';

class BookmarksDirectory extends React.Component {
    // TODO remove when more content
    // eslint-disable-next-line 
    constructor(props: Readonly<{}>) {
        super(props)
    }

    render() {
        const sampleData: Array<object> = [
            {
                id: 1,
                name: 'Rails Guides',
                type: 'url',
                url: 'https://guides.rubyonrails.org/',
                metaProperties: {
                    'og:title': 'Ruby on Rails Guides',
                    'og:image': 'https://avatars.githubusercontent.com/u/4223',
                    'og:description': 'Ruby on Rails Guides'
                }
            },
            {
                id: 2,
                name: 'Github',
                type: 'url',
                url: 'https://github.com/',
                metaProperties: {
                    'og:title': 'Build software better, together',
                    'og:image': 'https://github.githubassets.com/images/modules/open_graph/github-logo.png',
                    'og:description': 'GitHub is where people build software. More than 40 million people use GitHub to discover, fork, and contribute to over 100 million projects.'
                }
            },
            {
                id: 3,
                name: 'StackOverflow',
                type: 'url',
                url: 'https://stackoverflow.com/',
                metaProperties: {
                    'og:title': 'Stack Overflow - Where Developers Learn, Share, & Build Careers',
                    'og:image': 'https://cdn.sstatic.net/Sites/stackoverflow/img/apple-touch-icon@2.png?v=73d79a89bded',
                    'og:description': 'Stack Overflow | The World’s Largest Online Community for Developers'
                }
            },
            {
                id: 4,
                name: 'VisaJourney',
                type: 'url',
                url: 'https://www.visajourney.com/',
                metaProperties: {
                    'og:title': '',
                    'og:image': 'https://static.visajourney.com/images/uploads/monthly_2019_06/vj-square.jpg.31b4a504cab525579e4c5696b5c02e44.jpg',
                    'og:description': ''
                }
            }
        ];

        return(
            <main>
                <BookmarksList bookmarks={sampleData} />
            </main>
        );
    }
}

export default BookmarksDirectory;
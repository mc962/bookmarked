import React from 'react';
import logo from './logo.svg';
import './App.css';
import BookmarksDirectory from './bookmarks/index/bookmarks_directory';

type AppState = {
  info: {
    name: string,
    version: string
  }
}

class App extends React.Component<{}, AppState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      info: {
        name: '',
        version: ''
      }
    }
  }

  componentDidMount() {
    this._callBackendAPI()
      .then(res => this.setState({info: res.info}))
      .catch(err => {console.error(err)});
  }

  _callBackendAPI = async () => {
    const response = await fetch('/api');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p> */}
          {/* <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a> */}
        </header>

        {/* <p className='App-intro'>{this.state.info.name}</p>
        <p className='App-intro'>{this.state.info.version}</p> */}

        <BookmarksDirectory />
      </div>
    );
  }
}

export default App;

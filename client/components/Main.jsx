import React, { Component } from 'react'
import Tracks from './Tracks'
import Artist from './Artist'
import Search from './Search'

const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com'

class Main extends Component {
  state = { artist: null, tracks: [] }

  componentDidMount() {
    this.searchArtist('skrillex')
  }
  
  searchArtist = (artistQuery) => {

    fetch(`${API_ADDRESS}/artist/${artistQuery}`)
      .then(response => response.json())
      .then(json => {
        if (json.artists.total > 0) {
          const artist = json.artists.items[0]
          this.setState({ artist })

          fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
            .then(response => response.json())
            .then(json => this.setState({tracks: json.tracks}))
            .catch(error => alert(error.message))
        }
    })

  }

  render() {
    console.log('this.state', this.state)
    return (
      <div>
        <h2>Music Master</h2>
        <Search searchArtist={this.searchArtist}/>
        <Artist artist={this.state.artist} />
        <Tracks tracks={this.state.tracks} />
      </div>
    )
  }
}

export default Main
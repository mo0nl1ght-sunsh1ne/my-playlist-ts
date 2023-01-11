import './App.scss';
import React, { useEffect, useState, useCallback } from 'react';

function App() {
  const playlist: any[] = require('./playlist.json');

  const [artistsArr, setArtistsArr] = useState<string[]>([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [filteredPlaylist, setFilteredPlaylist] = useState<any[]>([]);
  const [uniqueArtists, setUniqueArtists] = useState<string[]>([]);

  const comparePopularity = (a:any, b:any) => {
    if (a.popularity > b.popularity)
       return -1;
    if (a.popularity < b.popularity)
      return 1;
    return 0;
  }

  const artistAtoZ = (a: any, b: any) => {
    if (a.mainArtist.toLowerCase() < b.mainArtist.toLowerCase())
       return -1;
    if (a.mainArtist.toLowerCase() > b.mainArtist.toLowerCase())
      return 1;
    return 0;
  }

  const compareDate = (a:any, b:any) => {
    if (a.album.releaseDate < b.album.releaseDate)
       return -1;
    if (a.album.releaseDate > b.album.releaseDate)
      return 1;
    return 0;
  }

  // playlist.sort(artistAtoZ)

  const allArtists = useCallback(() => {
    let arr: string[] = [];
    for (let x of playlist) {
      for (let i of x.artists) {
        arr.push(i)
      }
    }
    return arr;
  }, [playlist]);
  
  useEffect(() => {
    if (artistsArr.length === 0) {
      setArtistsArr(allArtists());
    }
    setUniqueArtists(Array.from(new Set(artistsArr)).sort())
  }, [allArtists, artistsArr]);

  const filterArtist = (event: any) => {
    if (event.target.value !== 'all') {
      setFilteredPlaylist(playlist.filter(e => e.artists.includes(event.target.value)).sort(compareDate));
      setIsFiltered(true);
    } else {
      setIsFiltered(false);
    }
  }

  const mapSongsToApp = (song: any) => {
    return (
      <div className="playlist-content">
        <div />
        <div className="playlist-section">
          <img className="song-album-cover" src={song.album.cover} alt="album cover"/>
          <div className="title-artist">
            <div className="song-title">
              <div className="song-title-name">{song.title}</div>
              <div className="music-link-container">
                <img className="music-link" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaxho18tCagKHfpJDIhvn8C32gU0TMxQRIJqy8oIfmbw&s"} alt="youtube" 
                onClick={() => window.open(`https://music.youtube.com/search?q=${song.title}+${song.mainArtist}`)} />
                <img className="music-link" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/2048px-Spotify_App_Logo.svg.png"} alt="spotify"
                onClick={() => window.open(`https://open.spotify.com/track/${song.id}`)} />
              </div>
            </div>
            <div className="song-artist">{song.artists.join(', ')}</div>
          </div>
        </div>
        <div className="song-other-element">{song.album.name}</div>
        <div className="song-other-element">{song.album.releaseDate}</div>
        <div className="song-other-element">{song.popularity}</div>        
      </div>
    );
  }

  return (
    <div className='playlist-container'>
      <div className='playlist-filter'>
        <label htmlFor="artist-filter-prompt">Filter by Artists:</label>
        <select className="artist-filter" id="artist-filter" onChange={(e) => filterArtist(e)}>
        <option key="all" value="all">All</option>
        {uniqueArtists.map(e => (<option key={e} value={e}>{e}</option>))} 
        </select>
      </div>
      <div className="playlist-header">
        <div />
        <div onClick={() => playlist.sort(artistAtoZ)}>TITLE</div> 
        <div>ALBUM</div>
        <div onClick={() => playlist.sort(compareDate)}>RELEASE DATE</div>  
        <div onClick={() => playlist.sort(comparePopularity)}>{":)"}</div>  
      </div>
      <hr />
      {isFiltered ? filteredPlaylist.map(e => mapSongsToApp(e)) : playlist.map(e => mapSongsToApp(e))}      
    </div>
  );
}

export default App;

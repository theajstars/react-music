import React, { useState, useEffect, useRef } from 'react'
import { Container } from '@material-ui/core'
import './Assets/CSS/App.css'
import axios from 'axios'
import MusicIcon from './Assets/IMG/music.png'


function App() {
  const trackRef = useRef();
  const trackTimeRef = useRef();
  const playIconRef = useRef();

  const [audioDisplay, setAudioDisplay] = useState('none')
  const [noTrackDisplay, setNoTrackDisplay] = useState('flex')
  const [deleteSearchButton, setDeleteSearchButton] = useState('hidden')
  const [footerDisplay, setFooterDisplay] = useState('none')

  const [searchText, setSearchText] = useState('');
  const [tracks, setTracks] = useState([]);
  const [searchTracks, setSearchTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({artist: '', album: ''});
  
  useEffect(() => {
    if(searchText.length > 0){
      const options = {
        method: 'GET',
        url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
        params: {q: searchText},
        headers: {
          'x-rapidapi-key': 'c25b202a81msh193143b5a7aefe3p11a9a3jsn7785bbb7b0fd',
          'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response){
        response.data.data.length > 0 ? setSearchTracks(response.data.data) : console.log("Empty array");
      }).catch(function (error) {
      });
    }
  }, [searchText])

  function selectTrack(track){
    setCurrentTrack(track)
    setAudioDisplay('flex')
    setFooterDisplay('block');
  }
  function playTrack(){
    var currentTrack = trackRef.current;
    if(!currentTrack.paused){
      currentTrack.pause()
      playIconRef.current.innerHTML = '<i class="fas fa-play"></i>'
    }else{
      currentTrack.play()
      playIconRef.current.innerHTML = '<i class="fas fa-pause"></i>'
    }
  }
  
  function nextTrack(track){
    var trackLocation = tracks.indexOf(track);
    var trackLength = tracks.length
    if(trackLocation === trackLength - 1){
      setCurrentTrack(tracks[0])
    }else{
      setCurrentTrack(tracks[trackLocation + 1]);
    }
    playIconRef.current.innerHTML = '<i class="fas fa-play"></i>'
  }
  function previousTrack(track){
    var trackLocation = tracks.indexOf(track);
    var trackLength = tracks.length
    if(trackLocation === 0){
      setCurrentTrack(tracks[trackLength - 1])
    }else{
      setCurrentTrack(tracks[trackLocation - 1]);
    }
    playIconRef.current.innerHTML = '<i class="fas fa-play"></i>'
  }
  return (
    <>
      <Container maxWidth="lg">
        <div className="search">
          <center>
          <div className="search-container">
            <input type="text"
              spellCheck="false"
              value={searchText}
              autoComplete="off" className="search-text"
              onChange={(e) => {
                if(e.target.value.length > 0){
                  setDeleteSearchButton('visible')
                  setNoTrackDisplay('none')
                }else if(e.target.value.length === 0 && audioDisplay === 'none'){
                  setSearchTracks([])
                  setNoTrackDisplay('flex')
                  setDeleteSearchButton('hidden')
                }
                setSearchText(e.target.value)
              }}
            />
            <button className="clear-search"
              style={{visibility: `${deleteSearchButton}`}}
              onClick={() => {
                setSearchText('')
                setSearchTracks([])
                setDeleteSearchButton('hidden')
              }}
            >
              <i className="far fa-times"></i>
            </button>
          </div>
          </center>
          <center>
            <div className="search-results">
              {
                searchTracks.splice(0, 5).map(searchedTrack => {
                  return(
                    <div className="search-result" key={searchedTrack.id}
                      onClick={() =>{
                        selectTrack(searchedTrack);
                        setTracks(searchTracks);
                        setTracks(tracks => [...tracks, searchedTrack]);
                        setSearchTracks([])
                      }}>
                      <img src={searchedTrack.album.cover_small} alt="" className="search-track-image" />
                      <div className="search-track-details">
                        <span className="search-track-title">
                          {searchedTrack.title_short}
                        </span>
                        <span className="search-track-artist">
                          {searchedTrack.artist.name}
                        </span>
                        <span className="search-track-album">
                          {searchedTrack.album.title}
                        </span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </center>
        </div>
        <div id="no-track" style={{'display': `${noTrackDisplay}`}}>
          <img src={MusicIcon} alt="" className="music-icon" />
          <span className="no-track-text">Start searching for a track!</span>
        </div>
        <center>
          <div className="audio-display-container" style={{display: `${audioDisplay}`}}>
            <div className="audio-display">
              <img src={currentTrack.album.cover_big} alt="track_"
                className="track-image"
              />
              <span className="track-title">
                 {currentTrack.title_short} <i className="fal fa-music"></i>
              </span>
              <span className="track-artist">
                <i className="fal fa-podcast"></i> {currentTrack.artist.name}
              </span>
              <span className="track-album">
                <i className="fal fa-compact-disc"></i> {currentTrack.album.title}
              </span>
              <audio src={currentTrack.preview} ref={trackRef}
                onEnded={(currentTrack) => nextTrack(currentTrack)}
              >
              </audio>

              {/* Track Actions */}
              <div className="track-actions">
                <span className="track-action previous-track"
                  onClick={() => previousTrack(currentTrack)}
                >
                  <i className="fas fa-backward"></i>
                </span>
                <span className="track-action play-track"
                  ref={playIconRef}
                  onClick={() => playTrack()}
                >
                  <i className="fas fa-play"></i>
                </span>
                <span className="track-action next-track"
                  onClick={() => nextTrack(currentTrack)}
                >
                  <i className="fas fa-forward"></i>
                </span>
              </div>
            </div>
            <div className="get-track-section">
              <span className="get-track-action listen-full">
                Listen to full track&nbsp;<i className="far fa-play-circle"></i>
              </span>
              <span className="get-track-action track-info">
                Track information&nbsp;<i className="far fa-info-circle"></i>
              </span>
            </div>
          </div>
        </center>
        <div className="footer-container" style={{'display': `${footerDisplay}`}}>
          <center>
            <div className="footer">
              <span className="show-playlist"
                onClick={() => {
                  
                }}
              >
                Now playing <i className="fas fa-headphones"></i>
              </span>
            </div>
          </center>
        </div>
      </Container>
    </>
  );
}

export default App;

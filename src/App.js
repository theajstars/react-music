import React, { useState, useEffect, useRef } from 'react'
import { Container } from '@material-ui/core'
import './Assets/CSS/App.css'
import axios from 'axios'
import Run from './Assets/run.mp3'
function App() {
  const trackRef = useRef();
  const trackTimeRef = useRef();
  const playIconRef = useRef();

  const [audioDisplay, setAudioDisplay] = useState('none')
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
      
      axios.request(options).then(function (response) {
        console.log(response.data.data);
        response.data.data.length > 0 ? setSearchTracks(response.data.data) : console.log("Empty array");
      }).catch(function (error) {
        console.error(error);
      });
      console.log(searchText)
    }
  }, [searchText])

  function selectTrack(track){
    setCurrentTrack(track)
    setAudioDisplay('flex')
    console.clear()
    console.log(currentTrack)
    console.log(tracks)
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
    console.clear()
    console.log(track);
    console.log(`Track found at: ${trackLocation}`);
    console.log(`Number of tracks: ${trackLength}`)
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
    console.clear()
    console.log(track);
    console.log(`Track found at: ${trackLocation}`);
    console.log(`Number of tracks: ${trackLength}`)
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
          <input type="text"
            spellCheck="false"
            autoComplete="off" className="search-text"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <center>
            {/* <div className="search-results">
              <div className="search-result">
                <img src="https://cdns-images.dzcdn.net/images/cover/565b424faee4bdc6e6db39db8d6fc333/500x500-000000-80-0-0.jpg"
                  className="search-track-image"
                />
                <div className="search-track-details">
                  <span className="search-track-title">
                    END OF TIME
                    </span>
                  <span className="search-track-artist">
                    Alan Walker, K-391
                  </span>
                  <span className="search-track-album">
                    Any dream will do
                  </span>
                </div>
              </div>
            </div> */}
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
        <center>
          <div className="audio-display-container">
            <div className="audio-display" style={{display: `${audioDisplay}`}}>
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
          </div>
        </center>
      </Container>
    </>
  );
}

export default App;

import React, { useState, useEffect, useRef } from 'react'
import { Container } from '@material-ui/core'
import './Assets/CSS/App.css'
import axios from 'axios'
import Run from './Assets/run.mp3'
function App() {
  const trackRef = useRef();
  const trackTimeRef = useRef();
  const [searchText, setSearchText] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  
  useEffect(() => {
    // const options = {
    //   method: 'GET',
    //   url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
    //   params: {q: searchText},
    //   headers: {
    //     'x-rapidapi-key': 'c25b202a81msh193143b5a7aefe3p11a9a3jsn7785bbb7b0fd',
    //     'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
    //   }
    // };
    
    // axios.request(options).then(function (response) {
    //   console.log(response.data.data);
    // }).catch(function (error) {
    //   console.error(error);
    // });
    console.log(searchText)
  }, [searchText])

  function playTrack(){
    var currentTrack = trackRef.current;
    currentTrack.play()
  }
  
  function pauseTrack(){
    trackRef.current.pause()
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
          {/* <center>
            <div className="search-results">
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
            </div>
          </center> */}
        </div>
        <center>
          <div className="audio-display-container">
            <div className="audio-display">
              <img src="https://cdns-images.dzcdn.net/images/cover/565b424faee4bdc6e6db39db8d6fc333/500x500-000000-80-0-0.jpg" alt=""
                className="track-image"
              />
              <span className="track-title">
                Runaway <i className="fal fa-music"></i>
              </span>
              <span className="track-artist">
                <i class="fal fa-podcast"></i> Aurora
              </span>
              <span className="track-album">
                <i className="fal fa-compact-disc"></i> Running with the Wolves
              </span>
              <audio src={Run} ref={trackRef}></audio>
              <div className="track-actions">
                <span className="track-action previous-track">
                  <i className="fas fa-backward"></i>
                </span>
                <span className="track-action play-track">
                  <i className="fas fa-play"></i>
                </span>
                <span className="track-action next-track">
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

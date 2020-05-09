/* Common Version */
import React from "react";
import { connect } from "react-redux";
import shallowCompare from "react-addons-shallow-compare";
import get from "lodash/get";
import LoadingAnim from "../generalpurpose/LoadingAnim";
import PodcastTrack from "../podcastplayer/PodcastTrack";
import PodcastDetails from "../podcastplayer/PodcastDetails";
import PodcastControls from "../podcastplayer/PodcastControls";
import PodcastNowPlayingDetails from "../podcastplayer/PodcastNowPlayingDetails";

/* Podcast Player */
class SinglePostPodcastPlayer extends React.Component{
  constructor( props ){
    super( props );
    this.state = {
      id: null,
      playlistTitle: null,
      data: null,
      currentTrack: null,
      currentTime: null,
      playerStatus: null,
      currentDetails: null,
      currentTrackData: null,
      showDetails: false,
      showNowPlayingDetails: false,
      slideDetails: null,
      playerType: null,
      showLoadMore: null,
      limit: 10,
      allItems: null,
      showLoadMore: null,
      loaded: false
    }
    this.playPause = this.playPause.bind(this);
    this.playNext = this.playNext.bind(this);
    this.playPrev = this.playPrev.bind(this);
    this.createNewAudio = this.createNewAudio.bind(this);
    this.updateTrackPosition = this.updateTrackPosition.bind(this);
    this.loadDetails = this.loadDetails.bind(this);
    this.loadNowPlayingDetails = this.loadNowPlayingDetails.bind(this);
    this.closeDetails = this.closeDetails.bind(this);
    this.closeNowPlayingDetails = this.closeNowPlayingDetails.bind(this);
    this.skipAhead = this.skipAhead.bind(this);
    this.skipBack = this.skipBack.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.loaded = this.loaded.bind(this);
  }

  componentDidMount(){
    const
      queryString = window.location.search,
      urlParams = new URLSearchParams(queryString),
      playerType = urlParams.get("playertype"),
      feedId = urlParams.get("id"),
      item = urlParams.get("item") || 0,
      podcastTheme = urlParams.get("theme"),
      { data } = this.props,
      id = get(data, `id`, feedId),
      theme = podcastTheme || "light",
      origin = window.location.origin,
      fetchUrl = origin + "/rest/carbon/api/playlist/" + id;
    
    this.setState({
      id: id,
      theme: theme,
      item: item,
      playerType: playerType
    });
    if(playerType && playerType === "player") {
      this.setState({
        playerType: "player"
      });
    } else {
      this.setState({
        playerType: "launcher"
      });
    }

    if(!this.state.data) {
      fetch(fetchUrl)
      .then( response => response.text() )
        .then(data => {
          let chunks = [];
          const items = JSON.parse(data).playlist.items,
          title = JSON.parse(data).playlist.name;
          this.createJson(items);
          this.setState({
            playlistTitle: title,
            allItems: items.length,
            showLoadMore: items.length > 10
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
    this.audio = new Audio();
  }

  shouldComponentUpdate( nextProps, nextState ){
    return shallowCompare( this, nextProps, nextState );
  }

  createJson(items) {
    let 
      container = [];
    items.forEach(function(item, i) {
      const
        duration = get(item, "duration", "60"),
        date = get(item, `createdGmt`),
        usableDate = new Date(date).toDateString(),
        dateElems = usableDate.split(" "),
        day = dateElems[0],
        year = dateElems[3],
        noYear = [dateElems[1], dateElems[2]].join(" "),
        fullDate = [dateElems[1], dateElems[2], dateElems[3]].join(" ");
        pushToPlaylist();
      function pushToPlaylist(){
        container.push({
          index: i, //i
          title: get(item, "title"),
          url: get(item, "url"),
          duration: duration,
          thumbnail: get(item, "thumbnail", ""),
          pubday: day,
          pubyear: year,
          pubNoYear: noYear,
          pubdate: fullDate,
          hostedby: get(item, "segmentName"),
          brand: get(item, "showName"),
          show: get(item, "showName"),
          segment: get(item, "segmentName"),
          episode: "Wednesday 6am Hour(hard coded)",
          description: get(item, "description", description)
        });
      }
    });
    this.setState({
      data: container,
      loaded: false,
      currentTrack: container[this.state.item]
    });
    if(this.state.playerType && this.state.playerType === "player") {
      this.setProgress("set", "new");
      this.audio.src = get(this.state, `currentTrack.url`, "");
      this.audio.onloadeddata = function(){ this.loaded(); /*console.log("Loaded init");*/ };//this.loaded();
      this.audio.play();
      this.audio.onloadeddata = () => { this.setState({loaded: true}); console.log("Loaded from ananymous func"); };
      if(!this.audio.paused) {
        this.setState({
          playerStatus: "playing"
        });
      }
    }
  }

  playPause(){
    if (this.state.playerStatus === "playing") {
      this.audio.pause();
      this.setState({
        playerStatus: "paused"
      });
      this.setProgress("clear");
    } else if (this.state.playerStatus === "paused") {
      this.audio.play();
      this.setState({
        playerStatus: "playing"
      });
      this.setProgress("set");
    } else {
      this.setState({
        currentTrack: this.state.data[0],
        playerStatus: "playing"
      });
      this.setProgress("set");
      this.audio.src = get(this.state, `currentTrack.url`, "");
    }
  }

  setProgress(action, type){
    if(action === "set") {
      clearInterval (this.interval);
      if(type !== "new") {
        this.updateCurrentTime();
      }
      this.interval = setInterval(() => {
        if(this.state.currentTime >= this.state.currentTrack.duration) {
          this.playNext();
        }
        this.updateCurrentTime();
      }, 1000);
    } else if (action === "clear") {
      clearInterval(this.interval);
    }    
  }

  updateCurrentTime(){
    this.setState({
      currentTime: this.audio.currentTime
    });
  }

  loaded() {
    console.log('loaded from loaded -- setting to true');
    this.setState({
      loaded: true
    });
  }

  createNewAudio(currentTrack){
    this.setState({
      currentTrack: currentTrack,
      playerStatus: "playing",
      loaded: false
    });
    this.setProgress("set", "new");
    this.audio.src = currentTrack.url;
    this.audio.play();
    this.audio.onloadeddata = () => { this.setState({loaded: true}); };
  }

  createPlaylist(id, data, createNewAudio, currentIndex, playerStatus, loadDetails, playerType, theme, limit, loaded) {
    if(this.state.allItems <= this.state.limit) {
      this.setState({
        showLoadMore: false
      });
    }
    let playlist = data.map(function(song, i) {
      if( i < limit ) {
        return <PodcastTrack key={i} id={id} playerType={playerType} currentIndex={currentIndex} playerStatus={playerStatus} trackData={data[i]} createNewAudio={createNewAudio} loadDetails={loadDetails} theme={theme} loaded={loaded} />;
      }
    });
    return playlist;
  }

  playNext(){
    const
      trackCount = get(this.state, "data").length - 1,
      currentTrackIndex = get(this.state, `currentTrack.index`),
      isLast = currentTrackIndex === trackCount;
    if(!isLast){
      const
        nextIndex = get(this.state, `currentTrack.index`, 0) + 1;
      this.createNewAudio(this.state.data[nextIndex]);
    } else {
      this.createNewAudio(this.state.data[0]);
    }    
  }

  playPrev(){
    const
      lastTrackIndex = get(this.state, "data").length - 1,
      currentTrackIndex = get(this.state, `currentTrack.index`),
      isFirst = currentTrackIndex === 0;
    if(!isFirst){
      const 
        prevIndex = get(this.state, `currentTrack.index`, 0) - 1;
      this.createNewAudio(this.state.data[prevIndex]);
    } else {
      this.createNewAudio(this.state.data[lastTrackIndex]);
    } 
  }

  updateTrackPosition(percent) {
    this.setProgress("clear");
    const 
      convertedNumber = (percent / 100) * get(this.state, `currentTrack.duration`);
    this.audio.currentTime = convertedNumber;
    this.setProgress("set");
  }

  skipAhead() {
    this.setProgress("clear");
    const newTrackPosition = this.state.currentTime + 15;
    this.audio.currentTime = newTrackPosition,
    this.setProgress("set"); 
  }

  skipBack() {
    this.setProgress("clear");
    const newTrackPosition2 = this.state.currentTime - 15;
    this.audio.currentTime = newTrackPosition2,
    this.setProgress("set");
  }

  loadDetails(trackData, action, direction, e) {
    //console.log(direction, action);
    if(action === "click") {
      e.stopPropagation();
    }
    //console.log("Track Data: ", trackData);
    if(direction === "left" || action === "click") {
      this.setState({
        showDetails: true,
        slideDetails: "slide-in",
        currentDetails: trackData
      });
    }
  }

  loadNowPlayingDetails(currentTrackData, action, direction, e) {
    if(action === "click") {
      e.stopPropagation();
    }

    console.log("Fireed");
    if(direction === "top" || action === "click") {
      this.setState({
        showNowPlayingDetails: true,
        slideNowPlayingDetails: "slide-up",
        currentTrackData: currentTrackData,
        showDetails: false
      });
    }
  }

  closeDetails(action, direction) {
    if(direction === "right" || action === "click") {
      this.setState({
        slideDetails: "slide-out"
      });
    }
  }

  closeNowPlayingDetails(action, direction) {
    if(direction === "bottom" || action === "click") {
      this.setState({
        slideNowPlayingDetails: "slide-down"
      });
    }
  }

  loadMore() {
    this.setState({
      limit: this.state.limit + 10
    });
  }

  render(){
    const
      { data } = this.props,
      playerStatus = get(this.state, `playerStatus`),
      trackDuration = get(this.state, `currentTrack.duration`),
      currentDetails = get(this.state, `currentDetails`),
      currentTrackData = get(this.state, `currentTrackData`);
      
    let 
      themeClass, 
      playlistLayout;

    if(this.state.theme && this.state.theme === "light") {
      themeClass = "ondemand-podcast-player light-theme";
    } else {
      themeClass = "ondemand-podcast-player";
    }
    if(data.layout && data.layout === "article") {
      playlistLayout = "playlist inarticle";
    } else {
      playlistLayout = "playlist";
    }
    if(this.state.data && this.state.playlistTitle) {
      if(this.state.playerType && this.state.playerType === "player") {
        return(
          <div>
            <div className={themeClass}>
              <div className="playlist-title"><h2>{this.state.playlistTitle}</h2></div>
              <div className="player">
                <PodcastControls loadNowPlayingDetails={this.loadNowPlayingDetails} playPause={this.playPause} skipAhead={this.skipAhead} currentTrack={this.state.currentTrack} playerStatus={playerStatus} currentTime={this.state.currentTime} trackDuration={trackDuration} updateTrackPosition={this.updateTrackPosition} />
                {this.state.showDetails &&
                  <PodcastDetails detailsClass={this.state.slideDetails} theme={data.theme} playingIndex={this.state.currentTrack.index} playerStatus={this.state.playerStatus} createNewAudio={this.createNewAudio} playPause={this.playPause} skipAhead={this.skipAhead} closeDetails={this.closeDetails} trackDetails={currentDetails} />
                }
                {this.state.showNowPlayingDetails &&
                  <PodcastNowPlayingDetails detailsClass={this.state.slideNowPlayingDetails} theme={data.theme} playingIndex={this.state.currentTrack.index} playerStatus={this.state.playerStatus} createNewAudio={this.createNewAudio} playPause={this.playPause} skipBack={this.skipBack} skipAhead={this.skipAhead} closeNowPlayingDetails={this.closeNowPlayingDetails} trackDetails={currentTrackData} currentTime={this.state.currentTime} trackDuration={trackDuration} updateTrackPosition={this.updateTrackPosition} />
                }    
                <div className="playlist-wrapper">
                  <ul className={playlistLayout}>
                    {this.createPlaylist(this.state.id, this.state.data, this.createNewAudio, this.state.currentTrack.index, this.state.playerStatus, this.loadDetails, this.state.playerType, this.state.theme, 200, this.state.loaded)}
                  </ul> 
                </div>
              </div>
            </div>
          </div>
        );
      }
      else {
        return(
          <div>
            <div className={themeClass}>
              <div className="playlist-title"><h2>{this.state.playlistTitle}</h2></div>
              <div className="player">
                <div className="playlist-wrapper">
                  <ul className={playlistLayout}>
                    {this.createPlaylist(this.state.id, this.state.data, this.createNewAudio, this.state.currentTrack.index, this.state.playerStatus, this.loadDetails, this.state.playerType, this.state.theme, this.state.limit)}
                  </ul>
                </div>
              </div>
              {this.state.showLoadMore &&
                <div className="cto-container" onClick={this.loadMore} >
                  <a className="button cto load-more out-grow">Load More</a>
                </div>
              }
            </div>
          </div>
        );
      }
    } 
    else { 
      return(
        <div className="podcast-player-loader">
          <LoadingAnim key="1" width="40px" strokeWidth="4"/>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    options: state.json.response.options
  };
}

export default connect( mapStateToProps )(SinglePostPodcastPlayer);
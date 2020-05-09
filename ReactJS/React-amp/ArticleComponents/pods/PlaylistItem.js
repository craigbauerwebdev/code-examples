import React from "react";
import get from "lodash/get";
//import renderHTML from "react-render-html";


class PlaylistItem extends React.Component{

  render() {
    const
      {index, playlist_artist, playlist_track, playlist_album, playlist_amazon_buy, playlist_itunes_buy} = this.props,
      //img = get(this.props, "image.src"),
      dataImg = get(this.props, "image.datasrc");
/*      imgWidth = get(this.props, "image.data-width"),
      imgHeight = get(this.props, "image.data-height");*/

    const imgStyles = {
        background: "url("+dataImg+")",
        backgroundSize: "cover",
        backgroundPosition: "top"
      },
      artist = playlist_artist.toUpperCase(),
      track = playlist_track.toUpperCase();

    return (
      <div className="playlist-item-wrapper">
        <div className="album-cover" style={imgStyles}></div>
        <div className="playlist-meta">
          <div>{index}. {artist} - {track}</div>
          <div className="buy-buttons">
            <a href={playlist_itunes_buy}>Buy On iTunes</a>
            <a href={playlist_amazon_buy}>Buy On Amazon</a>
          </div>
          <small className="album">{playlist_album}</small>
        </div>
      </div>
    );
  }
}

export default PlaylistItem;
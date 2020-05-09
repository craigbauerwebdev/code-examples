import React from "react";
import get from "lodash/get";
import PlaylistItem from "./PlaylistItem";

class PlaylistPost extends React.Component{
  render() {
    let playlist = [];
    const
      items = get(this.props, `data.items`),
      {data} = this.props,
      {playlist_title} = data;
    items.forEach(function (item, index) {
      playlist.push(<PlaylistItem {...item} />);
    });
    return (
      <div className="playlist-wrapper">
        <h2>{playlist_title}</h2>
        {playlist}
      </div>
    );
  }

}

export default PlaylistPost;
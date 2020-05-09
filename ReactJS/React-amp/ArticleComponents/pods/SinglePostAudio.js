import React from "react";

class SinglePostAudio extends React.Component{

  render() {
    const {data} = this.props,
      {src} = data;
    return (
      <div>
        <audio controls>
          <source src={src} type="audio/ogg"></source>
          <source src={src} type="audio/mpeg"></source>
          Your browser does not support the audio tag.
        </audio>
      </div>
    );
  }

}

export default SinglePostAudio;
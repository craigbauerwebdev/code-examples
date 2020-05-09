import React from "react";

class SinglePostPano extends React.Component{

  render() {
    const{postUrl} = this.props;
    return (
      <div className="button-wrap">
        <a href={postUrl}>
          <button className="orig-article-button">Click Here to See Panoramic Image</button>
        </a>
      </div>
    );
  }

}

export default SinglePostPano;
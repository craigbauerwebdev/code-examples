import React from "react";

class SinglePostImage extends React.Component{

  render() {
    const
      {data} = this.props,
      {url, caption} = data;
    let
      {width, height} = data;
    const
      src = url.split( "?" )[0],
      noAttrImg = {
        background: "url("+src+")",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center"
      };

    return (
      <div className="single-post-img-wrap">
        {(width && height) &&
          <amp-img layout="responsive" alt="xxx" src={src} width={width} height={height}></amp-img>
        }
        {(!width || !height) &&
          <div>
            <div className="no-attr-img" style={noAttrImg}></div>
          </div>
        }
        <div className="img-caption">{caption}</div>
      </div>
    );
  }

}

export default SinglePostImage;
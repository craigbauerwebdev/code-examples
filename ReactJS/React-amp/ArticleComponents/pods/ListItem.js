import React from "react";
import get from "lodash/get";
import renderHTML from "react-render-html";
import SinglePostOembed from "./SinglePostOembed";

class ListItem extends React.Component{

  render() {
    const {html_title, index, html_subtitle, desc_title, media_type, show_media, desc} = this.props;
    let
      data,
      url;
    if(media_type === "video" && show_media) {
      data = get(this.props, `mediaPodContent[0].data`);
    }
    if(media_type === "image" && show_media) {
      url = get(this.props, `mediaPodContent[0].data.url`);
    }
    return (
      <div>
        <div className="listpost-wrapper">
          <div className="listpost-header clearfix">
            <div className="index-large">{index}</div>
            <h2>{renderHTML(html_title)}</h2>
            {renderHTML(html_subtitle)}
          </div>
          <p>{renderHTML(desc_title)}</p>
          <p>{renderHTML(desc)}</p>
          { (media_type === "image" && show_media) &&
            <amp-img width="300" height="200" src={url} layout="responsive"></amp-img>
          }
          { (media_type === "video" && show_media) &&
            <SinglePostOembed data={data} />
          }
        </div>
      </div>
    );
  }

}

export default ListItem;
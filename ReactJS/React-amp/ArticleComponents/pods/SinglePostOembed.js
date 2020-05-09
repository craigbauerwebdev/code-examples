import React from "react";
import renderHTML from "react-render-html";

class SinglePostOembed extends React.Component{

  render() {

    const { data } = this.props,
      { provider_name, html } = data;
    let
      videoMarkup = [];

    if(provider_name === "YouTube") {
      const
        regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11,11}).*/,
        match = html.match(regExp);
      if (match) {
        if (match.length >= 2) {
        //console.log("YT ID: ", match[2]);
          const
            ytMarkup = <amp-youtube
              data-videoid={match[2]}
              layout="responsive"
              width="480" height="270">
            </amp-youtube>;
          videoMarkup.push(ytMarkup);
        }
      }
    } else if (provider_name === "Facebook") {
      const
        { data } = this.props,
        { url } = data,
        fbMarkup = <amp-facebook width="552" height="310"
          layout="responsive"
          data-href={url}>
        </amp-facebook>;
      videoMarkup.push(fbMarkup);
    } else if (provider_name === "Vimeo") {
      const
        { data } = this.props,
        { uri } = data,
        videoId = uri.replace("/videos/", ""),
        vimeoMarkup = <amp-vimeo
          data-videoid={videoId}
          layout="responsive"
          width="500" height="281">
        </amp-vimeo>;
      videoMarkup.push(vimeoMarkup);
    } else if (provider_name === "Instagram") {
      const instaUrl = "https://www.instagram.com/p/Ba9WO7sHO9w/?hl=en&taken-by=awkwardfamilyphotos",
        instagramRegex = /https:\/\/www.instagram.com\/p\/([\w-]+)\/?/g,
        shortcode = instagramRegex.exec(instaUrl)[1],
        instaMarkup = <amp-instagram
          data-shortcode={shortcode}
          data-captioned
          width="400"
          height="400"
          layout="responsive">
        </amp-instagram>;
      videoMarkup.push(instaMarkup);
    } else {
      let unknownMarkup = html.replace( /<iframe /g, "<amp-iframe layout=\"responsive\" sandbox=\"allow-scripts allow-same-origin\"").replace( /<\/iframe>/g, "</amp-iframe>" ).replace(/wmode=\"opaque\"/g, "").replace(/http:/g, "").replace(/https:/g, "").replace(/\/\//g, "https:\/\/");
      videoMarkup.push(renderHTML(unknownMarkup));
    }

    return (
      <div className="single-post-oembed">
        {videoMarkup}
      </div>
    );
  }

}

export default SinglePostOembed;

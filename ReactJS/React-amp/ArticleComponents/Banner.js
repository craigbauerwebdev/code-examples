import React from "react";
import get from "lodash/get";
import Title from "./Title";
import SinglePostOembed from "./pods/SinglePostOembed";

class Banner extends React.Component{
  render() {
    let { date } = this.props;
    const {podHeader, mainAuthor, caption} = this.props,
      podData = get(this.props, `podHeader[0]`),
      headerImg = get(this.props, `podHeader[0].data.url`),
      authorName = mainAuthor.first_name +" "+ mainAuthor.last_name,
      authorUrl = mainAuthor.url,
      theName = authorName.toUpperCase(),
      headerIsVideo = podHeader && podHeader[0].data.type && podHeader[0].data.type === "video" ? true : false,
      headerIsThumb = podHeader[0].data.type === undefined ? true : false,
      headerIsRich = podHeader && podHeader[0].data.type && podHeader[0].data.type === "rich" ? true : false,
      bannerStyles = {
        backgroundImage: "url(" + headerImg + ")",
        backgroundSize: "cover",
        paddingTop: "59.67%"
      },
      authorImg = {
        backgroundImage: "url(" + mainAuthor.thumbnail + ")",
        backgroundSize: "cover",
        backgroundPosition: "center center"
      },
      dateTrim = date.split(" ").slice(0, 3).join(" ");

    /*console.log("podHeaderType:: ", podHeader[0].data.type);
    console.log("Video:: ", headerIsVideo);
    console.log("Thumb:: ", headerIsThumb);
    console.log("Rich:: ", headerIsRich);*/

    return (
      <div>
        { (headerIsVideo || headerIsRich) &&
          <div className="amp-article-banner-video">
            <Title {...this.props} />
            <div className="post-info clearfix">
              <div className="byline">
                <div className="author-wrap" style={authorImg}></div>
                <span className="article-info">
                  { mainAuthor.first_name &&
                    <span>
                      <a href={authorUrl}>
                        <span className="author-name">{theName}</span>
                      </a>
                      <span className="spacer"> | </span>
                    </span>
                  }
                  <span className="byline-date">{dateTrim}</span>
                </span>
              </div>
            </div>
            <div className="hero-video">
              <SinglePostOembed {...podData} />
            </div>
          </div>
        }
        { headerIsThumb &&
          <div>
            <div className="amp-article-banner" style={bannerStyles}>
              {(caption || caption !== "") &&
                <div className="post-info">
                  <p className="header-caption">{caption}</p>
                </div>
              }
            </div>
            <Title {...this.props} />
            <div className="author-info-wrap">
              <div className="byline">
                <div className="author-wrap" style={authorImg}></div>
                <span className="article-info">
                  { mainAuthor.first_name &&
                    <span>
                      <a href={authorUrl}>
                        <span>{theName}</span>
                      </a>
                      <span className="spacer"> | </span>
                    </span>
                  }
                  <span className="byline-date">{dateTrim}</span>
                </span>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }

}

export default Banner;
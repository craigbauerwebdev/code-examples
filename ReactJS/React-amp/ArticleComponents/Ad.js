import React from "react";

class Ad extends React.Component{

  render() {
    const
      { id, callletters, sitetype, adTargetInfo, position, size, sticky } = this.props;
    let
      { width, height, market } = this.props;
    market = market.replace(" ", "_").replace(".", "");
    let k = "ad-map-mobile";

    console.log("Ad id: ", id);
    /*if(typeof window !== "undefined") {
      const
      //urlParams = new URLSearchParams(window.location.search),
        url = window.location.href,
        urlString = new URL(url);
      k = urlString.searchParams.get("kv");
      console.log(url);
      console.log("Window");
    } else if (this.props.serverRequest) {
      const url = this.props.serverRequest.headers.host,
        urlString = new URL(url);
      k = urlString.searchParams.get("kv");
      console.log(url);
    }*/
    let adWrapperClass = null;
    if(size === "flex") {
      if (Math.random() >= 0.5) {
        adWrapperClass = "amp-ad-slot-320";
        width = "320";
        height = "50";
      } else {
        adWrapperClass = "amp-ad-slot-300";
        width = "300";
        height = "250";
      }
    }

    //console.log("Market: ", market);

    let siteLink = null;
    if(sitetype === "Local") {
      siteLink = "/8328825/"+ sitetype + "/" + market + "/" + callletters + "/post";
    } else {
      siteLink = "/8328825/"+ sitetype + "/" + callletters + "/post";
    }

    let
      targeting = {},
      kw = [],
      cats = [],
      tagers = [],
      genres = [];
    if(Array.isArray(adTargetInfo.kw)) {
      adTargetInfo.kw.forEach(k => {
        if(adTargetInfo.kw) {
          kw.push(k);
        }
      });
    }
    if(Array.isArray(adTargetInfo.catid)) {
      adTargetInfo.catid.forEach(cat => {
        if(adTargetInfo.catid) {
          cats.push(cat);
        }
      });
    }
    if(Array.isArray(adTargetInfo.tags)) {
      adTargetInfo.tags.forEach(tag => {
        if(adTargetInfo.tags) {
          tagers.push(tag);
        }
      });
    }
    if(Array.isArray(adTargetInfo.genre)) {
      adTargetInfo.genre.forEach(g => {
        if(adTargetInfo.genre) {
          genres.push(g);
        }
      });
    }

    targeting.kw = kw,
    targeting.market = market;
    targeting.sitetype = sitetype;
    targeting.callletters = callletters;
    targeting.pos = position;
    targeting.pagetype = "post";
    targeting.catid = cats; // get these from options.scriptVars
    targeting.tags = tagers;
    targeting.genre = genres;
    targeting.id = adTargetInfo.id;
    targeting.author = adTargetInfo.author;
    targeting.right = "top";
    targeting.kv = k; // issue with window after restarting blogs see line 13

    const target = "{\"targeting\":"+JSON.stringify(targeting)+"}";

    if(sticky) {
      return (
        <amp-ad
          data-slot={siteLink}
          width={width}
          height={height}
          type="doubleclick"
          json={target}>
        </amp-ad>
      );
    } else {
      return (
        <div className={adWrapperClass}>
          <amp-ad
            data-slot={siteLink}
            width={width}
            height={height}
            type="doubleclick"
            json={target}>
            <div fallback></div>
          </amp-ad>
        </div>
      );
    }
  }
}

export default Ad;
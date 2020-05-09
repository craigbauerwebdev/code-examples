import React from "react";
import shallowCompare from "react-addons-shallow-compare";
import Base from "./Base";
import Helmet from "react-helmet";
import get from "lodash/get";
import findKey from "lodash/findKey";
import withHelpers from "../../../../common/components/generalpurpose/BaseWrappers/withHelpers";

const BaseWithHelpers = withHelpers( Base );

class Carbon extends React.Component{
  constructor( props ){
    super( props );
  }

  shouldComponentUpdate( nextProps, nextState ){
    return shallowCompare( this, nextProps, nextState );
  }

  componentDidMount(){
    if( typeof window !== "undefined" ){
      window.TSM = window.TSM || {};
      window.TSM.carbon = true;
      const
        {json:{response:{options:{method}}}}  = this.props;
      if( method === "get_single" && "history" in window && "scrollRestoration" in history){
        history.scrollRestoration = "manual";
      }
    }
  }

  constructMeta( metas ){
    let
      returnObj = metas.map(function( meta ){
        return meta.attrs;
      });
    returnObj.push({
      name: "viewport",
      content: "initial-scale=1.0, viewport-fit=cover"
    });
    return returnObj;
  }

  constructHeadLinks( links, uri = "/", serverConfig = {} ){
    let returnObj = [];
    const whitelist = [
      {rel: "canonical"},
      {rel: "shortcut icon"},
      {rel: "profile"},
      {rel: "prev"},
      {rel: "next"},
      {rel: "apple-touch-icon-precomposed"}
    ];
    links.forEach(function( link ){
      whitelist.forEach(function( find ){
        if( findKey( link, find ) === "attrs" ){
          returnObj.push( link.attrs );
        }
      });
    });
    returnObj.push({
      rel: "alternate",
      hreflang: "en",
      href: [ serverConfig.protocol || "http", "://", serverConfig.host, uri ].join( "" )
    });
    return returnObj;
  }

  render(){
    const
      {json:{response:{options}, serverConfig } } = this.props;
    let
      pageMeta = this.constructMeta( options.headers.meta || [] ),
      link = this.constructHeadLinks( options.headers.link || [], get( options, `requestUrl` ) || "/", serverConfig || {} ),
      script=[],
      helmetComponent = <Helmet
        title={get( options, "headers.title[0].textContent" ) }
        meta={pageMeta}
        link={link}
        script={script}
      />;
    return <BaseWithHelpers {...this.props} helmetComponent={helmetComponent} />;
  }
}

export default Carbon;
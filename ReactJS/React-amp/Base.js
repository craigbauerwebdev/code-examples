import React from "react";
import shallowCompare from "react-addons-shallow-compare";
import get from "lodash/get";
import Ad from "./ArticleComponents/Ad.js";
import Article from "./Article";
import Header from "./Header";
import Footer from "./Footer";
//import Nav from "./Nav";

class Base extends React.Component{
  constructor( props ){
    super( props );
  }

  shouldComponentUpdate( nextProps, nextState ){
    return shallowCompare( this, nextProps, nextState );
  }

  getSidebarData( response, key, defaultWidget={} ){
    const
      {sidebars, widgets} = response;
    return get( sidebars, [ "dataDetails", key, "widgets" ].join( "." ), [] ).
      map(function( widgetId ){
        return get( widgets, widgetId, defaultWidget );
      });
  }

  getNavItems( navs ){
    let returnData = {};

    navs.forEach( ( item ) => {
      if( item.props.sidebar === "carbonsidebar/nav/main" ){
        returnData[ "nav" ] = item;
      }else if( item.props.sidebar === "carbonsidebar/nav/blueiv" ){
        returnData[ "blueivnav" ] = item;
      }else if( item.props.sidebar === "carbonsidebar/nav/footer" ){
        returnData[ "footer" ] = item;
      }else if( item.props.sidebar === "carbonsidebar/nav/promo_links" ){
        returnData[ "promo_links" ] = item;
      }
    });
    return returnData;
  }

  render(){
    const
      {json, helmetComponent} = this.props,
      {response} = json,
      //settings = response,
      postInfo = get(response, "widgets[\"carbonwidget/single-1\"].params"),
      mainNav = get(response, "widgets[\"carbonwidget/nav/main\"]"),
      footerNav = get(response, "widgets[\"carbonwidget/nav/footer\"]"),
      postDetails = response.widgets["carbonwidget/single-1"].dataDetails[ response.widgets["carbonwidget/single-1"].data[0] ],
      postUrl = response.widgets["carbonwidget/single-1"].dataDetails[ response.widgets["carbonwidget/single-1"].data[0] ].url,
      sideBars = response.sidebars.dataDetails["header-sidebar"].widgets,
      designOptions = get(response, "options.blogOptions.design_option_live"),
      stationInfo = get(response, "options.blogOptions._station_info"),
      activeDomain = get(response, "options.activeDomain"),
      adVars = get(response, "options.adVars"),
      containerClasses = "site-container",
      accent_hue = get(designOptions, "nav_hover_hue"),
      adTargetInfo = get(response, "options.scriptVars.dfp.adPageSettings.attrs"), //categories //tags //kw //genre //id //author //device:web
      showComments = get(response, "options.blogOptions.FacebookCommentsOptions.show_comments"),
      social = response.widgets["carbonwidget/single-1"].dataDetails[ response.widgets["carbonwidget/single-1"].data[0] ].social;

    return(
      <div id="container" className={containerClasses}>
        {helmetComponent}
        <div className="container-inner">
          {/*maintop*/}
          <div className="site-content clearfix">
            <div className="main-content amp-site-wrapper">
              <Header postUrl={postUrl} {...designOptions} {...stationInfo} {...postInfo} sideBars={sideBars} accent={accent_hue} activeDomain={activeDomain} />
              {/*<TopAd />*/}
              <div className="bling-bar">
                <Ad width="320" height="50" {...stationInfo} adTargetInfo={adTargetInfo} size="small" position="top,320a" id="bling-bar-ad" />
              </div>
              <Article showComments={showComments} postUrl={postUrl} {...postDetails} {...postInfo} accent={accent_hue} mainNav={mainNav} domain={activeDomain} social={social} adVars={adVars} stationInfo={stationInfo} adTargetInfo={adTargetInfo} proto="http://"/>
            </div>
          </div>
          <Footer {...designOptions} footerNav={footerNav} stationInfo={stationInfo} adTargetInfo={adTargetInfo} />
        </div>
      </div>
    );
  }
}

export default Base;
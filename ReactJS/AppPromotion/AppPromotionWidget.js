import React from "react";
import get from "lodash/get";
import shallowCompare from "react-addons-shallow-compare";
import {fireEvent, gaApiRoot} from "../../../../../common/api";
import OpenMessageInput from "../OpenMessageInput";

class BrandedAppPromoWidget extends React.Component{
  constructor (props) {
    super(props);
  }

  componentDidMount(){
    this.fireGa( "app promo", "impression", "widget" );
  }

  shouldComponentUpdate( nextProps, nextState ){
    return shallowCompare( this, nextProps, nextState );
  }

  fireGa( ec, ea, el ){
    fireEvent({
      data: {
        eventCategory: ec,
        eventAction: ea,
        eventLabel: el
      },
      ga: {
        ids: gaApiRoot.getAccounts( "ids" )
      },
      ca: {},
      pa: {}
    });
  }

  render(){
    const
      blogName = get( this.props, `blogInfo.legalName`),
      siteIcons = get( this.props, `blogOptions._station_logos`);
    return(
      <div className="widget-content branded-app-promo-widget">
        <OpenMessageInput blogName={blogName} type="widget" />
      </div> 
    );
  }
}

export default BrandedAppPromoWidget;
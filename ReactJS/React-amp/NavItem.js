import React from "react";
import shallowCompare from "react-addons-shallow-compare";
import get from "lodash/get";

class NavItem extends React.Component{
  constructor( props ){
    super( props );
  }

  shouldComponentUpdate( nextProps, nextState ){
    return shallowCompare( this, nextProps, nextState );
  }

  getItemMarkup(title, href, label, hasSub, id) {

    return(<li><a href={href}>{label}</a></li>);

/*    if(hasSub){
      const
        tapId = "tap:"+id+".open";
      return(<li on={tapId}><a className="tap-sub-wrap nav-item">{label}<span className="right-arrow">&raquo;</span></a></li>);
    }
    return(<li><a href={href}>{label}</a></li>);*/
  }

  isObject (value) {
    return value && typeof value === "object" && value.constructor === Object;
  }

  render() {
    const
      {indexs, menuId, hasSubMenu} = this.props,
      label = get(this.props, `attrs.title`) || "Default Title",
      href = get(this.props, `attrs.href`) || "",
      subId = label.toLowerCase().replace(/ /g, "-"), // + "-" + menuId,
      isObj = this.isObject( this.props.indexs );
    let
      hasSub = isObj ? true : false;

    //console.log("Has Sub: ",hasSub);

    return (
      <span>
        {this.getItemMarkup(indexs, href, label, hasSub, subId)}
      </span>
    );
  }
}

export default NavItem;
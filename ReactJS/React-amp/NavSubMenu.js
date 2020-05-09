import React from "react";
//import shallowCompare from "react-addons-shallow-compare";
//import get from "lodash/get";
//import NavItem from "./NavItem";
import SubNavItem from "./SubNavItem";


class NavSubMenu extends React.Component{
  /*constructor( props ){
    super( props );
  }

  shouldComponentUpdate( nextProps, nextState ){
    return shallowCompare( this, nextProps, nextState );
  }*/

  isObject (value) {
    return value && typeof value === "object" && value.constructor === Object;
  }

  getNavItems(items, id, details) {
    let
      navItems = [];

    items.forEach(( key, i ) => {

      let title = null;

      if(this.isObject(key)) {
        for(let param in key){
          title = param;
        }
        console.log("item is obj");
        navItems.push( <SubNavItem hasSubMenu={true} details={details} menuId={title} /> );
      } else {
        title = key;
        navItems.push( <SubNavItem menuId={title} hasSubMenu={false} details={details} /> ); // need to pass the menu id to get label and id
      }
      // check each key for sub nav

      /* Inside here check each index for a sub nav and run <SubNav... and pass in indexs and stuff */
    });

    return navItems;
  }

  render() {

    //all wrong!!!!!
    const
      {items, id, details, parentTitle, url} = this.props,
    //label = attrs.title,
    //subId = label.toLowerCase().replace(/ /g, "-") + "-" + menuId, //menuId doesn't exist yet
      close = "tap:"+id+".close";

    //const parentTitle = "xxxxx";//details[id].attrs.title;

    //console.log("Parent Title: ", details[id]);

    return (
      <amp-sidebar id={id} class="amp-sidebar" layout="nodisplay" side="left">
        <ul>
          <li on={close} style={{color: "#fff", boxShadow: "0 0 5px 0 #000", background: "#000"}}>
            <span className="menu-arrow">&laquo;</span>BACK
          </li>
          <li><a href={url}>{parentTitle}</a></li>
        </ul>
        <ul>
          {this.getNavItems(items, id, details)}
        </ul>
      </amp-sidebar>
    );
  }
}

export default NavSubMenu;
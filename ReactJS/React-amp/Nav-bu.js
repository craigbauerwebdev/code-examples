import React from "react";
import shallowCompare from "react-addons-shallow-compare";
import get from "lodash/get";
import NavItem from "./NavItem";
import NavSubMenu from "./NavSubMenu";

class Nav extends React.Component{
  constructor( props ){
    super( props );
  }

  shouldComponentUpdate( nextProps, nextState ){
    return shallowCompare( this, nextProps, nextState );
  }

  getMenuItems(indexs, details){
    let
      menu = [];

    indexs.forEach(( indx, i ) => {
      const
        x = i + 1;
      if( details[ x ] && details[ x ].attrs && details[ x ].attrs.title ){
        menu.push( <NavItem {...details[ x ]} indexs={indexs[i]} subMenu={details} /> );
      }
    });
    return menu;
  }

  isObject (value) {
    return value && typeof value === "object" && value.constructor === Object;
  }

  getSubMenus(indexs, details) {
    let
      subMenus = [];
    indexs.forEach(( indx, i ) => { //iterate through top level looking for sub menus
      const
        x = i + 1,
        title = details[x].attrs.title,
        menuId = details[x].menuId,//.replace(/./g, "-"),
        url = details[x].attrs.href,
        subNavId = title.toLowerCase().replace(/ /g, "-");// + "-" + menuId;
      if(this.isObject(indx)) {
        for(let param in indx){
          // first level of subnavs
          //subMenus.push(<NavSubMenu id={subNavId} items={indx[param]} details={details} parentTitle={title} url={url} />); //subNavTitle={details[i].attrs.title}
          //next level of subs
          const  // copy start
            indx2 = indx[param];
          indx2.forEach(( subIndx, i ) => {
            if(this.isObject(subIndx)) {
              for(let param in subIndx) {
                const
                  title = details[param].attrs.title,
                  url = details[param].attrs.href,
                  id = param;//.replace(/./g, "-");
                let
                  subNavId = title.toLowerCase().replace(/ /g, "-");// + "-" + id;
                //console.log("SubIndx: ", subIndx, param, title);
                subMenus.push(<NavSubMenu id={subNavId} items={subIndx[param]} details={details}  parentTitle={title} url={url} />);
                //end start
                // 3rd level sub Nav
                //paste copy -> end for 3rd level
                const  // copy start
                  indx3 = subIndx[param];
                indx3.forEach(( subIndx2, i ) => {
                  if(this.isObject(subIndx2)) {
                    for(let param in subIndx2) {
                      const
                        title = details[param].attrs.title,
                        url = details[param].attrs.href,
                        id = param;//.replace(/./g, "-");
                      let
                        subNavId = title.toLowerCase().replace(/ /g, "-");// + "-" + id;
                      //console.log("SubIndx: ", subIndx, param, title);
                      subMenus.push(<NavSubMenu id={subNavId} items={subIndx[param]} details={details}  parentTitle={title} url={url} />);
                    }
                  }
                });
              }
            }
          });
        }
      }
    });

    //console.log(subMenus);
    return subMenus;

    // call below function and append the response to body.
    //document.getElementsByTagName("body")[0].style.background = "red";
  }

  /*appendAmpSidebars(strHtml) {
    let
      sidebarBegin = 0,
      sidebarEnd = 0;
    const sidebars = [];
    do {
      sidebarBegin = strHtml.indexOf("<amp-sidebar", sidebarBegin);
      if (sidebarBegin !== -1) {
        sidebarEnd = strHtml.indexOf("</amp-sidebar>', sidebarBegin") + 14;
        sidebars.push(strHtml.slice(sidebarBegin, sidebarEnd));
        strHtml = strHtml.slice(0, sidebarBegin) + strHtml.slice(sidebarEnd);
      }
    } while (sidebarBegin !== -1);
    if (sidebars.length) {
      strHtml = strHtml + sidebars.join("");
    }

    return strHtml;
  }*/


  render() {
    const
      indexs = get(this.props, `mainNav.data`) || [],
      details = get(this.props, `mainNav.dataDetails`) || {};

    /*return (
      <div>
        <amp-sidebar id="mainmenu" class="amp-sidebar" layout="nodisplay" side="left">
          <ul>
            <li on="tap:mainmenu.close" style={{color: "#fff", boxShadow: "0 0 5px 0 #000", background: "#000"}}>
              <span className="menu-arrow" style={{fontSize: "22px"}} >&laquo;</span> Close
            </li>
            {this.getMenuItems(indexs, details)}
          </ul>
        </amp-sidebar>

        {this.getSubMenus(indexs, details)}

      </div>
    );*/
    return (
      <amp-sidebar id="mainmenu" class="amp-sidebar" layout="nodisplay" side="left">
        <ul>
          <li on="tap:mainmenu.close" style={{color: "#fff", boxShadow: "0 0 5px 0 #000", background: "#000"}}>
            <span className="menu-arrow" style={{fontSize: "22px"}} >&laquo;</span> Close
          </li>
          {this.getMenuItems(indexs, details)}
        </ul>
        {this.getSubMenus(indexs, details)}
      </amp-sidebar>
    );
  }

}

export default Nav;
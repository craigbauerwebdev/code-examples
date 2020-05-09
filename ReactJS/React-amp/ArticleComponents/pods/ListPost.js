import React from "react";
import get from "lodash/get";
import ListItem from "./ListItem";

class ListPost extends React.Component{
  render() {
    let list = [];
    const items = get(this.props, `data.items`);
    items.forEach(function (item, index) {
      list.push(<ListItem {...item} />);
    });
    return (
      <div>
        <p>{list}</p>
      </div>
    );
  }

}

export default ListPost;
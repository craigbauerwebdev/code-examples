import React from "react";
import ListPost from "./ListPost";
import PlaylistPost from "./PlaylistPost";
import GenericButton from "./GenericButton";

class SinglePostList extends React.Component{

  render() {
    const {data, postUrl} = this.props,
      {layout} = data;
    return (
      <div>
        {layout === "standard" &&
          <ListPost layout={layout} data={data} />
        }
        {layout === "playlist" &&
          <PlaylistPost data={data} />
        }
        {layout === "twitter" &&
          <div>Twitter Layout Not Supported.</div>
        }
        {layout === "oembed" &&
          <GenericButton href={postUrl} title="View Full Oembed Gallery" />
        }
        {layout === "media-poll" &&
          <GenericButton href={postUrl} title="Vote Now" />
        }
      </div>
    );
  }

}

export default SinglePostList;
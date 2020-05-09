//import ArticleThumbnail from "./ArticleThumbnail"; // Not using in amp
import SinglePostGallery from "./pods/SinglePostGallery";
import SinglePostGravityform from "./pods/SinglePostGravityform";
import SinglePostImage from "./pods/SinglePostImage";
import SinglePostInArticleAd from "./pods/SinglePostInArticleAd";
import SinglePostList from "./pods/SinglePostList";
import SinglePostOembed from "./pods/SinglePostOembed";
import SinglePostPano from "./pods/SinglePostPano";
//import SinglePostPolldaddy from "./SinglePostPolldaddy";
//import SinglePostSweepsBoard from "./pods/SinglePostSweepsBoard";
import SinglePostSweepsBar from "./pods/SinglePostSweepsBar";
//import SinglePostSweepsHeader from "./pods/SinglePostSweepsHeader";

//import SinglePostOembedProcessed from "../../../../../common/components/post/SinglePostOembedProcessed";
//import SinglePostOembedYouTube from "./SinglePostOembedYoutube";
//import SinglePostOembedInstagram from "./SinglePostOembedInstagram";
//import SinglePostOembedTwitter from "./SinglePostOembedTwitter";
//import SinglePostOembedFacebook from "./SinglePostOembedFacebook";
//import SinglePostOembedRafflecopter from "./SinglePostOembedRafflecopter";
import SinglePostButton from "./pods/SinglePostButton";
import SinglePostAudio from "./pods/SinglePostAudio";

const Pods = {
  //ArticleThumbnail, //replaced by banner Component
  SinglePostImage,
  SinglePostInArticleAd,
  SinglePostList,
  SinglePostOembed,
  //SinglePostOembedProcessed,
  SinglePostGallery,
  SinglePostGravityform,
  SinglePostPano,
  //SinglePostPolldaddy,
  //SinglePostSweepsBoard,
  SinglePostSweepsBar,
  //SinglePostSweepsHeader,
  SinglePostButton,
  SinglePostAudio
};

const SinglePostOembedComponents = {
  //youtube: SinglePostOembedYouTube,
  //instagram: SinglePostOembedInstagram,
  //twitter: SinglePostOembedTwitter,
  //facebook: SinglePostOembedFacebook,
  //rafflecopter: SinglePostOembedRafflecopter,
  //polldaddy: SinglePostPolldaddy
};
export {Pods, SinglePostOembedComponents};
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Comments from "../../Components/Comments/Comments";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
// import vid from "../../Components/Video/vid.mp4";
import LikeWatchLaterSaveBtns from "./LikeWatchLaterSaveBtns";
import "./VideoPage.css";
import { addToHistory } from "../../actions/History";
import { viewVideo } from "../../actions/video";
import CustomVideoPlayer from "../../Components/customVideoPlayer/customVideoPlayer";
function VideoPage() {
  const { vid } = useParams();
  // console.log(vid)

  // const chanels = useSelector((state) => state?.chanelReducers);

  // console.log(Cid)
  // const currentChanel = chanels.filter((c) => c._id === vid)[0];

  const vids = useSelector((state) => state.videoReducer);

  // const vv = vids?.data.filter((q) => q._id === vid)[0];

  const [index,setIndex] =useState(vids?.data.findIndex((q) => q._id === vid));
  console.log(index);
  const [vv,setVv]=useState(vids.data[index]);
  const sz=vids.data.length;
  console.log("before",vv.filePath);
  const normalizeFilePath = (filePath) => {
    // Replace backslashes with forward slashes
    return filePath.replace(/\\/g, '/');
  };

  normalizeFilePath(vv.filePath);
  console.log("after",vv.filePath);

  const handleNextVideo=()=>{
    if(index+1<sz){
      setIndex(preindex=>preindex+1);
    }else{
      setIndex(0);
    }

   
  }

  useEffect(()=>{
    setVv(vids.data[index]);
  },[index])

  // console.log(vids.data[0].filePath);

  const dispatch = useDispatch();

  const CurrentUser = useSelector((state) => state?.currentUserReducer);

  const handleHistory = () => {
    dispatch(
      addToHistory({
        videoId: vid,
        Viewer: CurrentUser?.result._id,
      })
    );
  };
  const handleViews = () => {
    dispatch(
      viewVideo({
        id: vid,
      })
    );
  };
  useEffect(() => {
    if (CurrentUser) {
      handleHistory();
    }
    handleViews();
  }, []);

  return (
    <>
      <div className="container_videoPage">
        <div className="container2_videoPage">
          <div className="video_display_screen_videoPage">
{/*            
            <CustomVideoPlayer
              url={`http://localhost:8080/${vv?.filePath}`}
              onTripleTapMiddle={handleNextVideo}
              videoId={vv._id}
            />  */}
             <CustomVideoPlayer
              url={`https://youtubeclone007jnv.onrender.com/${vv?.filePath}`}
              onTripleTapMiddle={handleNextVideo}
            /> 
            <div className="video_details_videoPage">
              <div className="video_btns_title_VideoPage_cont">
                <p className="video_title_VideoPage"> {vv?.videoTitle}</p>
                <div className="views_date_btns_VideoPage">
                  <div className="views_videoPage">
                    {vv?.Views} views <div className="dot"></div>{" "}
                    {moment(vv?.createdAt).fromNow()}
                  </div>
                  <LikeWatchLaterSaveBtns vv={vv} vid={vid} />
                </div>
              </div>
              <Link
                to={`/chanel/${vv?.videoChanel}`}
                className="chanel_details_videoPage"
              >
                <b className="chanel_logo_videoPage">
                  <p>{vv?.Uploder.charAt(0).toUpperCase()}</p>
                </b>
                <p className="chanel_name_videoPage">{vv?.Uploder}</p>
              </Link>
              <div className="comments_VideoPage">
                <h2>
                  <u>Comments</u>
                </h2>
                <Comments videoId={vv._id} />
               
              </div>
            </div>
          </div>
          <div className="moreVideoBar">More video</div>
        </div>
      </div>
    </>
  );
}

export default VideoPage;

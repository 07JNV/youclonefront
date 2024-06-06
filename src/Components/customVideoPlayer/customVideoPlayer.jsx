import React, { useState, useRef } from "react";

import url1 from "./Videos/test.mp4";
import TemperatureData from "../TemperatureData/TemperatureData";
import CommentSection from "../CommentSection/CommentSection";

const CustomVideoPlayer = ({ url,onTripleTapMiddle, videoId}) => {
  const [tapCount, setTapCount] = useState(0);
  const [showTemp, setShowTemp] = useState(false);
  const timeoutRef = useRef(null);
  const firstTapTimeRef = useRef(0);
  const videoRef = useRef(null);
  const longPressTimeoutRef = useRef(null);
  const [showComment,setShowComment]=useState(false);

  // handling tap part

  const handleTap = (event) => {
    event.preventDefault();
    const currentTime = Date.now();
    const { clientX, clientY } = event;
    const videoRect = videoRef.current.getBoundingClientRect();
    const videoWidth = videoRect.width;
    const videoHeight = videoRect.height;
    const relativeX = clientX - videoRect.left;
    const relativeY = clientY - videoRect.top;
    const side = relativeX > videoWidth / 2 ? 1 : 0;

    if (firstTapTimeRef.current === 0) {
      firstTapTimeRef.current = currentTime;
      setTapCount(1);
    } else {
      const elapsedTime = currentTime - firstTapTimeRef.current;
      if (elapsedTime <= 500) {
        setTapCount((prevCount) => prevCount + 1);
      } else {
        setTapCount(1);
        firstTapTimeRef.current = currentTime;
      }
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (tapCount + 1 === 2) {
        const currentTime = videoRef.current.currentTime;
        if (side) {
          videoRef.current.currentTime = currentTime + 10;
        } else {
          videoRef.current.currentTime = currentTime - 10;
        }
      }

      const exitApplication = () => {
        const newWindow = window.open("", "_self");
        newWindow.document.write("<title>Closing...</title>");
        newWindow.document.close();
        newWindow.close();
      };
      console.log(tapCount + 1);
      if (tapCount + 1 === 3) {
        if (side) {
          if (relativeX > (7 * videoWidth) / 10) {
            exitApplication();
          }
        } else {
          if (relativeX < (3 * videoWidth) / 10) {
              setShowComment(true);
              console.log("show comment")
          }
        }

        if (
          relativeX >= (3 * videoWidth) / 10 &&
          relativeX <= (7 * videoWidth) / 10
        ) {
          onTripleTapMiddle();
          console.log("move to next video")
        }
      }

      if (tapCount + 1 === 1) {
        if (relativeX >= (3 * videoWidth) / 4 && relativeY <= videoHeight / 4) {
          setShowTemp(true);
          console.log("single tap");
        } else {
          if (
            relativeX >= (3 * videoWidth) / 10 &&
            relativeX <= (7 * videoWidth) / 10
          ) {
            if (videoRef.current.paused) {
              videoRef.current.play();
            } else {
              videoRef.current.pause();
            }
          }
        }
      }

      setTapCount(0);
      firstTapTimeRef.current = 0;
      timeoutRef.current = null;
    }, 800);
  };

  // handling 2x faster and slower
  const handleLongPress = (event) => {
    const { clientX } = event;
    const videoRect = videoRef.current.getBoundingClientRect();
    const videoWidth = videoRect.width;
    const relativeX = clientX - videoRect.left;
    const side = relativeX > videoWidth / 2 ? 1 : 0;
    if (side) {
      if (videoRef.current.playbackRate * 2 <= 2) {
        videoRef.current.playbackRate = videoRef.current.playbackRate * 2;
      } // 2 times faster
    } else {
      if (videoRef.current.playbackRate / 2 >= 0.5) {
        videoRef.current.playbackRate = videoRef.current.playbackRate / 2;
      }
      // 2 times slower
    }
    console.log("Long press detected");
  };

  const handleMouseDown = (event) => {
    longPressTimeoutRef.current = setTimeout(() => handleLongPress(event), 500); // 500ms for long press
  };

  const handleMouseUp = () => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }
  };

  const handleVideoEnd = () => {
    console.log("Video ended. 5 points added to the user's account.");
  };

  return (
    <div>
      <video
        onClick={handleTap}
        ref={videoRef}
        src={url}
        onEnded={handleVideoEnd}
        controls={true}
        style={{ width: "100%", height: "auto", cursor: "pointer" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />

      {showTemp && (
        <div style={{ position: "absolute", zIndex: 10000 }}>
          <TemperatureData setShowTemp={setShowTemp} />
        </div>
      )}

      {showComment &&(
        <div>
             <CommentSection setShowComment={setShowComment} showComment={showComment} videoId={videoId}/>
        </div>
      )}
    </div>
  );
};

export default CustomVideoPlayer;

import React from "react";
import "./CommentSection.css"; 
import Comments from "../Comments/Comments";

const CommentSection = ({ setShowComment, showComment,videoId }) => {
  const handleClose = () => {
    setShowComment(false);
  };

  return (
    <div className="comment-section">
      <div className="comment-content">
        <button className="close-button" onClick={handleClose}>
          X
        </button>
        <h2>Comments</h2>
        <Comments videoId={videoId} />
      </div>
    </div>
  );
};

export default CommentSection;

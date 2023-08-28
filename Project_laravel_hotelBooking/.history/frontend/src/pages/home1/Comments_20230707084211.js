import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "../../css/comment.css";
import tokenService from "../../services/token.service";

export default function Comments({ roomId }) { //khởi tạo state và biến lưu trữ trong thành phần
  const [comments, setComments] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [userData, setUserData] = useState(tokenService.getToken());

  const postComment = async () => {
    await axios
      .post(`http://127.0.0.1:8000/api/comments`, {
        content: commentInput,
        room_id: roomId,
        user_id: userData.user_id,
      })
      .then((response) => {
        setComments(response.data.original);
        setCommentInput(""); // Xóa nội dung trong ô input
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (commentInput && roomId && userData.user_id) {
      postComment();
    }
    // console.log("content:", commentInput);
    // console.log("room ID:", roomId);
    // console.log("user_id:", userData.user_id);
  };

  const handleChangeComment = (event) => {
    setCommentInput(event.target.value);
  };

  const formatTime = (time) => {
    const now = moment();
    const commentTime = moment(time);
    const diffHours = now.diff(commentTime, "hours");
    if (diffHours < 12) {
      return commentTime.fromNow();
    } else {
      return commentTime.format("DD/MM/YYYY [lúc] HH:mm");
    }
  };

  const fetchComment = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/comments/${roomId}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (!comments) {
      fetchComment();
    }
  }, [comments, commentInput]);

  return (
    <div className="comments-container">
      <input
        className="comment-input"
        placeholder="Bình luận..."
        value={commentInput} // Gán giá trị của ô input bằng giá trị của state
        onChange={handleChangeComment}
      />
      <button className="comment-submit" type="submit" onClick={handleSubmit}>
        Gửi
      </button>
      <div className="comment-list w-25">
        <h5 className="comment-header">Bình luận</h5>
        {comments && comments.length > 0 ? (
          comments.map((item, index) => (
            <div key={index} className="comment-item">
              <div className="comment-user d-flex justify-content-start align-items-baseline h-6">
                <img
                  className="comment-avatar "
                  src={item.image}
                  alt="Avatar"
                />
                <h6 className="comment-username mx-1">{item.name}</h6>
                <p className="comment-date">{formatTime(item.created_at)}</p>
              </div>
              <div className="contents mx-0 ">{item.content}</div>
            </div>
          ))
        ) : (
          <h6>there is have no comment!</h6>
        )}
      </div>
    </div>
  );
}

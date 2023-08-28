import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'; // Thêm import cho thư viện moment
import '../../css/comment.css';
import tokenService from "../../services/token.service";


export default function Comments({ roomId }) {
  const [comments, setComments] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch comments for the current room
    if (!comments) {
      axios
        .get(`http://127.0.0.1:8000/api/comments/${roomId}`)
        .then(response => {
          setComments(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }

  }, [comments]);

  const handleChangeComment = event => {
    setCommentInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Send a comment for the current room
    axios
      .post(`http://127.0.0.1:8000/api/comments/`, {
        content: commentInput,
        room_id: roomId,
        user_id: userData.id
      })
      .then(response => {
        setCommentInput('');
        // Fetch comments for the current room after submitting a comment
        axios
          .get(`http://127.0.0.1:8000/api/comments/${roomId}`)
          .then(response => {
            setComments(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  };
  const user = tokenService.getToken();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users");
        const data = response.data;
        const userItem = data.find(item => item.email === user.email);
        setUserData(userItem);
        console.log(userItem.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  // Hàm định dạng thời gian hiển thị
  const formatTime = time => {
    const now = moment(); // Thời gian hiện tại
    const commentTime = moment(time); // Thời gian của bình luận
    const diffHours = now.diff(commentTime, 'hours'); // Số giờ chênh lệch

    if (diffHours < 8) {
      return commentTime.fromNow(); // Hiển thị "x giờ trước"
    } else {
      return commentTime.format('DD/MM/YYYY [lúc] HH:mm');
    }
  };

  return (
    <div className="comments-container">
      <input
        className="comment-input"
        placeholder="Bình luận..."
        value={commentInput}
        onChange={handleChangeComment}
      />
      <button className="comment-submit" type="submit" onClick={handleSubmit}>
        Gửi
      </button>
      <div className="comment-list" style={{ margin: '3px' }}>
        <p className="comment-header">Bình luận ({comments ? comments.length : 0})</p>
        {
          comments ?
            comments.map(item => (
              <div key={item.id} className="comment-item">
                <div className="comment-user">
                  <img
                    className="comment-avatar"
                    src={userData.image}
                    alt="Avatar"
                  />
                  <p className="comment-username">{item.name}</p>
                  <p className="comment-date">{formatTime(item.created_at)}</p>
                </div>
                <p className="comment-content">{item.content}</p>
              </div>
            ))
            : <h6>have no comment</h6>}
      </div>
    </div>
  );
}

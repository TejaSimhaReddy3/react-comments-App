import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, isLike, isDeleted} = props
  const {id, name, comment, date, isLiked, initialColor} = commentDetails

  const initialWord = name ? name[0].toUpperCase() : ''
  const likeText = isLiked ? 'liked like' : 'like'

  const likedImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const timeDetails = formatDistanceToNow(date)

  const onLikeButton = () => {
    isLike(id)
  }

  const onDelete = () => {
    isDeleted(id)
  }

  return (
    <li className="list-container">
      <div className="list-header-container">
        <div className={`${initialColor} initCont`}>
          <p className="initial">{initialWord}</p>
        </div>
        <div className="header-container">
          <div className="name-date-container">
            <p className="username">{name}</p>
            <p className="date-item">{timeDetails} ago</p>
          </div>
          <p className="comment-item">{comment}</p>
        </div>
      </div>
      <div className="buttons-container">
        <div className="like-container">
          <img src={likedImage} className="like-img" alt="like" />
          <button className={likeText} type="button" onClick={onLikeButton}>
            Like
          </button>
        </div>
        <button className="delete-button" testid="delete" type="button">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-btn"
            onClick={onDelete}
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem

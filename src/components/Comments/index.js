import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentsSection from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsLists: [],
  }

  onChangeName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeComment = event => {
    this.setState({commentInput: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBgColor = `${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialColor: initialBgColor,
    }

    this.setState(prevState => ({
      commentsLists: [...prevState.commentsLists, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  isLike = id => {
    this.setState(prevState => ({
      commentsLists: prevState.commentsLists.map(eachList => {
        if (id === eachList.id) {
          return {...eachList, isLiked: !eachList.isLiked}
        }
        return eachList
      }),
    }))
  }

  isDeleted = commentId => {
    const {commentsLists} = this.state

    this.setState({
      commentsLists: commentsLists.filter(comment => comment.id !== commentId),
    })
  }

  renderCommentsList = () => {
    const {commentsLists} = this.state

    return commentsLists.map(eachList => (
      <CommentsSection
        key={eachList.id}
        commentDetails={eachList}
        isLike={this.isLike}
        isDeleted={this.isDeleted}
      />
    ))
  }

  render() {
    const {commentsLists, nameInput, commentInput} = this.state
    return (
      <div className="bg-container">
        <div className="content-container">
          <h1 className="app-heading">Comments</h1>
          <div className="form-container">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="commentAbout">
                Say something about 4.0 Technologies
              </p>
              <input
                className="nameInput"
                onChange={this.onChangeName}
                placeholder="Your Name"
                type="text"
                value={nameInput}
              />
              <textarea
                className="textarea"
                onChange={this.onChangeComment}
                placeholder="Your Comment"
                rows="6"
                value={commentInput}
              />
              <button type="submit" className="button">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="commentsImage"
            />
          </div>
          <hr className="hr-line" />
          <p className="comments-head">
            <span className="count-p">{commentsLists.length}</span> Comments
          </p>
          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments

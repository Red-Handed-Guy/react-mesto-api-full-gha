import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function Card({ cardData, onCardClick, onLikeClick, onCardDelete }) {
  const { name: cardName, link: cardLink, likes: cardLikes, owner: cardOwner } = cardData
  const { _id: userId } = React.useContext(CurrentUserContext)

  const isOwn = cardOwner === userId

  const isLiked = cardLikes.some((like) => like === userId)

  const cardLikeButtonClassName = `element__like-img ${isLiked ? 'element__like-img_active' : ''}`

  function handleClick() {
    onCardClick(cardData)
  }

  function handleLikeClick() {
    onLikeClick(cardData)
  }

  function handleDeleteClick() {
    onCardDelete(cardData)
  }

  return (
    <article className="element">
      {isOwn && (
        <button
          onClick={handleDeleteClick}
          type="button"
          className="element__delete-button"></button>
      )}
      <div className="element__img-wrapper">
        <img src={cardLink} alt={cardName} className="element__img" onClick={handleClick} />
      </div>
      <div className="element__wrapper">
        <h2 className="element__title">{cardName}</h2>
        <div className="element__like-wrapper">
          <button
            type="button"
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}></button>
          <p className="element__like-counter">{cardLikes.length}</p>
        </div>
      </div>
    </article>
  )
}

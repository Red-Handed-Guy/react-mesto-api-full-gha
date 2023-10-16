import React from 'react'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onLikeClick,
  cards,
  onCardDelete,
}) {
  const {
    name: userName,
    about: userDescription,
    avatar: userAvatar,
  } = React.useContext(CurrentUserContext)

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__wrapper">
          <button type="button" onClick={onEditAvatar} className="profile__avatar-wrapper">
            <img src={userAvatar} alt="аватар" className="profile__avatar" />
            <div className="profile__avatar-overlay"></div>
          </button>
          <div className="profile__info">
            <div className="profile__info-wrapper">
              <h1 className="profile__title">{userName}</h1>
              <button
                onClick={onEditProfile}
                type="button"
                className="profile__edit-button"></button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__add-button"></button>
      </section>
      <section className="elements" aria-label="Галерея">
        {cards.map((card) => {
          return (
            <Card
              cardData={card}
              key={card._id}
              onCardClick={onCardClick}
              onLikeClick={onLikeClick}
              onCardDelete={onCardDelete}
            />
          )
        })}
      </section>
    </main>
  )
}

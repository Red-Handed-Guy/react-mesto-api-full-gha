import React from 'react'
import { Routes, Route } from 'react-router-dom'
import headerLogo from '../images/01header/logo.svg'
import popupOkImg from '../images/04reg/ok.svg'
import popupNotOkImg from '../images/04reg/not_ok.svg'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import InfoTooltipPopup from './InfoTooltip'
import ImagePopup from './ImagePopup'
import api from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Login from './Login'
import Register from './Register'
import { checkToken } from '../utils/Auth'
import {
  ProtectedRouteElementNotLoggedIn,
  ProtectedRouteElementLoggedIn,
  ProtectedRouteRandomAddress,
} from './ProtectedRoute'

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [userEmail, setUserEmail] = React.useState('')
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = React.useState(false)

  const handleUpdateUser = ({ name, about }) => {
    api
      .setUserProfile({ name, about })
      .then((userDataUpdate) => {
        setCurrentUser(userDataUpdate)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  const handleUpdateAvatar = (avatar) => {
    api
      .setUserAvatar(avatar)
      .then((userDataUpdate) => {
        setCurrentUser(userDataUpdate)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }
  const handleAddPlaceSubmit = ({ name, link }) => {
    console.log({ name, link } )
    api
      .setNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  const handleCardClick = (card) => {
    setIsImagePopupOpen(true)
    setSelectedCard(card)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)
    setIsInfoTooltipPopupOpen(false)
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id)

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .toggleCardLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)))
      })
      .catch((err) => console.log(err))
  }

  function handleDeleteClick(card) {
    api
      .delCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch((err) => console.log(err))
  }

  React.useEffect(() => {
    checkToken()
      .then((res) => {
        setUserEmail(res.email)
        setLoggedIn(true)
      })
      .catch((err) => console.log(err))
  }, [])

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserProfile(), api.getInitialCards()])
        .then(([userData, initialCards]) => {
          const newInitialCards = initialCards.reverse()
          setCurrentUser(userData)
          setCards(newInitialCards)
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header
            headerLogo={headerLogo}
            userEmail={userEmail}
            setLoggedIn={setLoggedIn}
            setUserEmail={setUserEmail}
            setCards={setCards}
            setCurrentUser={setCurrentUser}
          />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRouteElementNotLoggedIn
                  element={Main}
                  loggedIn={loggedIn}
                  onCardDelete={handleDeleteClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onLikeClick={handleCardLike}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                <ProtectedRouteElementLoggedIn
                  element={Register}
                  setIsInfoTooltipPopupOpen={setIsInfoTooltipPopupOpen}
                  setIsSuccessInfoTooltipStatus={setIsSuccessInfoTooltipStatus}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <ProtectedRouteElementLoggedIn
                  element={Login}
                  loggedIn={loggedIn}
                  setIsInfoTooltipPopupOpen={setIsInfoTooltipPopupOpen}
                  setIsSuccessInfoTooltipStatus={setIsSuccessInfoTooltipStatus}
                  setLoggedIn={setLoggedIn}
                  setUserEmail={setUserEmail}
                />
              }
            />
            <Route path="*" element={<ProtectedRouteRandomAddress loggedIn={loggedIn} />} />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />
          <ImagePopup
            isOpen={isImagePopupOpen}
            selectedCard={selectedCard}
            onClose={closeAllPopups}
          />
          <InfoTooltipPopup
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            popupOkImg={popupOkImg}
            popupNotOkImg={popupNotOkImg}
            isSuccessInfoTooltipStatus={isSuccessInfoTooltipStatus}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

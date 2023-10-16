import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const { name: currentUserName, about: currentUserAbout } = React.useContext(CurrentUserContext)
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({
      name,
      about: description,
    })
  }

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUserName)
      setDescription(currentUserAbout)
    }
  }, [currentUserName, currentUserAbout, isOpen])

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      title="Редактировать профиль"
      name="profile"
      buttonText="Сохранить">
      <div className="popup__input-wrapper">
        <input
          name="name"
          placeholder="Имя"
          className="popup__input popup__input_type_name"
          type="text"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleChangeName}
          required
        />
        <span id="name-error" className="popup__error"></span>
        <input
          name="about"
          placeholder="Вид деятельности"
          className="popup__input popup__input_type_subtitle"
          type="text"
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleChangeDescription}
          required
        />
        <span id="about-error" className="popup__error"></span>
      </div>
    </PopupWithForm>
  )
}

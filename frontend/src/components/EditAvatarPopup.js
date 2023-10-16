import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar(avatarRef.current.value)
  }

  React.useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = ''
    }
  }, [isOpen])

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить">
      <div className="popup__input-wrapper">
        <input
          name="avatar-url"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_subtitle"
          type="url"
          required
          ref={avatarRef}
        />
        <span id="avatar-url-error" className="popup__error"></span>
      </div>
    </PopupWithForm>
  )
}

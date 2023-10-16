import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const [cardName, setCardName] = React.useState('')
  const [cardLink, setCardLink] = React.useState('')

  function handleChangeCardName(e) {
    setCardName(e.target.value)
  }

  function handleChangeCardLink(e) {
    setCardLink(e.target.value)
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault()
    onAddPlaceSubmit({ name: cardName, link: cardLink })
  }

  React.useEffect(() => {
    if (isOpen) {
      setCardName('')
      setCardLink('')
    }
  }, [isOpen])

  return (
    <PopupWithForm
      onSubmit={handleAddPlaceSubmit}
      isOpen={isOpen}
      onClose={onClose}
      title="Новое место"
      name="new-card"
      buttonText="Создать">
      <div className="popup__input-wrapper">
        <input
          name="card-name"
          placeholder="Название"
          className="popup__input popup__input_type_name"
          type="text"
          minLength="2"
          maxLength="30"
          required
          value={cardName}
          onChange={handleChangeCardName}
        />
        <span id="card-name-error" className="popup__error"></span>
        <input
          name="card-url"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_subtitle"
          type="url"
          required
          value={cardLink}
          onChange={handleChangeCardLink}
        />
        <span id="card-url-error" className="popup__error"></span>
      </div>
    </PopupWithForm>
  )
}

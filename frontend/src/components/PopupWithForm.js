import React from 'react'

export default function PopupWithForm({
  title,
  name,
  buttonText,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button type="button" onClick={onClose} className="popup__close-button"></button>
        <form name={`${name}-form`} className="popup__form" noValidate onSubmit={onSubmit}>
          {children}
          <button className="popup__save-button" type="submit">
            <p className="popup__save-button-text">{buttonText}</p>
          </button>
        </form>
      </div>
    </div>
  )
}

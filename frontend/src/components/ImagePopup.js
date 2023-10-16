import React from 'react'

export default function ImagePopup({ isOpen, selectedCard, onClose }) {
  return (
    <div className={`popup popup_type_img ${isOpen ? 'popup_opened' : ''}`}>
      <figure className="popup__img-container">
        <img src={selectedCard.link} alt={selectedCard.name} className="popup__img" />
        <figcaption className="popup__img-caption">{selectedCard.name}</figcaption>
        <button type="button" className="popup__close-button" onClick={onClose}></button>
      </figure>
    </div>
  )
}

import React from 'react'

export default function InfoTooltipPopup({
  isOpen,
  onClose,
  popupOkImg,
  popupNotOkImg,
  isSuccessInfoTooltipStatus,
}) {
  return (
    <div className={`popup popup_type_info-tooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <img
          className="popup__confirmation-img"
          src={isSuccessInfoTooltipStatus ? popupOkImg : popupNotOkImg}
          alt={isSuccessInfoTooltipStatus ? 'зеленая галочка' : 'красный крестик'}
        />
        <h2 className="popup__title popup__title_type_confirmation">
          {isSuccessInfoTooltipStatus
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
        <button type="button" onClick={onClose} className="popup__close-button"></button>
      </div>
    </div>
  )
}

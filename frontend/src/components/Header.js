import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { logout } from '../utils/Auth'

export default function Header({
  headerLogo,
  userEmail,
  setLoggedIn,
  setUserEmail,
  setCards,
  setCurrentUser,
}) {
  const [headerSlideBar, setHeaderSlideBar] = React.useState(false)

  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    .then(() => {
      setLoggedIn(false)
      navigate('/sign-in')
      setUserEmail('')
      setCards([])
      setCurrentUser({})
      handleCloseHeaderSlideBar()
    })
    .catch((err) => console.log(err))
  }

  const handleToggleHeaderSlideBar = () => {
    setHeaderSlideBar(!headerSlideBar)
  }

  const handleCloseHeaderSlideBar = () => {
    setHeaderSlideBar(false)
  }

  return (
    <header className="header">
      <div className={`header__slider ${headerSlideBar ? 'header__slider_active' : ''}`}>
        <p className="header__slider-email">{userEmail}</p>
        <button type="button" className="header__slider-link" onClick={handleLogout}>
          Выйти
        </button>
      </div>
      <div className="header__wrapper">
        <img className="header__logo logo" src={headerLogo} alt="Логотип место-россия" />
        <Routes>
          <Route
            path="/sign-in"
            element={
              <Link className="header__link" to="/sign-up">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link className="header__link" to="/sign-in">
                Войти
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <>
                <button
                  type="button"
                  className={`header__burger-button ${
                    headerSlideBar ? 'header__burger-button_close' : ''
                  }`}
                  onClick={handleToggleHeaderSlideBar}></button>
                <div className="header__link-wrapper">
                  <p className="header__email">{userEmail}</p>
                  <button
                    type="button"
                    className="header__link header__link_type_logout"
                    onClick={handleLogout}>
                    Выйти
                  </button>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </header>
  )
}

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../utils/Auth'

export default function Login({
  setLoggedIn,
  setUserEmail,
  setIsSuccessInfoTooltipStatus,
  setIsInfoTooltipPopupOpen,
}) {
  const navigate = useNavigate()
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormValue({
      ...formValue,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(formValue.password, formValue.email)
      .then((res) => {
        localStorage.setItem('token', res.token)
        setLoggedIn(true)
        setUserEmail(formValue.email)
        setFormValue({
          email: '',
          password: '',
        })
        navigate('/')
      })
      .catch((err) => {
        setIsSuccessInfoTooltipStatus(false)
        setIsInfoTooltipPopupOpen(true)
        console.log(err)
      })
  }

  return (
    <main className="main">
      <section className="log-reg">
        <h1 className="log-reg__title">Вход</h1>
        <form onSubmit={handleSubmit} name="login-form" className="log-reg__form" noValidate>
          <div className="log-reg__input-wrapper">
            <input
              name="email"
              placeholder="Email"
              className="log-reg__input log-reg__input_type_email"
              type="email"
              minLength="2"
              maxLength="40"
              required
              onChange={handleChange}
              value={formValue.email}
            />
            <input
              name="password"
              placeholder="Пароль"
              className="log-reg__input log-reg__input_type_password"
              type="password"
              minLength="2"
              maxLength="40"
              required
              onChange={handleChange}
              value={formValue.password}
            />
          </div>
          <button className="log-reg__submit-button" type="submit">
            <p className="log-reg__submit-button-text">Войти</p>
          </button>
        </form>
      </section>
    </main>
  )
}

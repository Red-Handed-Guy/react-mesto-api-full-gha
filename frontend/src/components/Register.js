import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../utils/Auth'

export default function Register({ setIsInfoTooltipPopupOpen, setIsSuccessInfoTooltipStatus }) {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormValue({
      ...formValue,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    register(formValue.password, formValue.email)
      .then(() => {
        setIsSuccessInfoTooltipStatus(true)
        setFormValue({
          email: '',
          password: '',
        })
        navigate('/sign-in')
      })
      .catch((err) => {
        setIsSuccessInfoTooltipStatus(false)
        console.log(err)
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true)
      })
  }

  return (
    <main className="main">
      <section className="log-reg">
        <h1 className="log-reg__title">Регистрация</h1>
        <form onSubmit={handleSubmit} name="register-form" className="log-reg__form" noValidate>
          <div className="log-reg__input-wrapper">
            <input
              name="email"
              placeholder="Email"
              className="log-reg__input log-reg__input_type_email"
              type="email"
              minLength="2"
              maxLength="40"
              required
              value={formValue.email}
              onChange={handleChange}
            />
            <input
              name="password"
              placeholder="Пароль"
              className="log-reg__input log-reg__input_type_password"
              type="password"
              minLength="2"
              maxLength="40"
              required
              value={formValue.password}
              onChange={handleChange}
            />
          </div>
          <button className="log-reg__submit-button" type="submit">
            <p className="log-reg__submit-button-text">Зарегистрироваться</p>
          </button>
        </form>
        <p className="log-reg__clue">
          Уже зарегистрированы?
          <Link className="log-reg__clue-link" to="/sign-in">
            {' '}
            Войти
          </Link>
        </p>
      </section>
    </main>
  )
}

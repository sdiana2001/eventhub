import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../LoginPage/LoginPage.module.scss'; 
import { useAppDispatch } from '../../store/hook';
import { setCredentials } from '../../store/slices/authSlice';
import { registerApi } from '../../api/auth';
import axios from 'axios';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
      try {
        const data = await registerApi({ name, email, password });
        dispatch(setCredentials(data));
        navigate('/');
      } catch (err) {
        console.error('Ошибка регистрации:', err);
        if (axios.isAxiosError(err) && err.response?.status === 409) {
          setError('Пользователь с таким email уже существует');
        } else {
          setError('Не удалось зарегистрироваться');
        }
      }


  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Регистрация</h1>
        <p className={styles.subtitle}>
          Создайте аккаунт, чтобы бронировать билеты и организовывать события
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Имя и фамилия</label>
            <div className={styles.inputWrapper}>
              <span className={styles.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
  <circle cx="12" cy="7" r="4" /></svg>

              </span>
              <input
                id="name"
                type="text"
                placeholder="Иван Иванов"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Электронная почта</label>
            <div className={styles.inputWrapper}>
                          <span className={styles.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
  <rect x="3" y="5" width="18" height="14" rx="3" /><path d="M3 7l8.2 5.467a1.5 1.5 0 0 0 1.6 0L21 7" /></svg>
              </span>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Пароль</label>
            <div className={styles.inputWrapper}>
                <span className={styles.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
  <rect x="5" y="11" width="14" height="10" rx="2" />
  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
</svg>

              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Придумайте пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                  {showPassword ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
  <circle cx="12" cy="12" r="3" /></svg>
: 
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
  <path d="M10.733 5.076a10.744 10.744 0 0 1 1.267-.076c5 0 9.27 3.11 11 7.5a11.79 11.79 0 0 1-3.23 4.5" />
  <path d="M14.12 14.12a3 3 0 0 1-4.24-4.24" />
  <path d="M1 1l22 22" />
  <path d="M6.7 6.7C3.9 8.2 1.8 10.6 1 12.5c1.73 4.39 6 7.5 11 7.5 1.5 0 2.9-.28 4.2-.8" />
</svg>
}
              </button>
            </div>
          </div>
{error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submitBtn}>
            Зарегистрироваться
          </button>
        </form>

        <div className={styles.divider}>
          <span>Уже есть аккаунт?</span>
        </div>

        <Link to="/login" className={styles.registerLink}>
          Войти
        </Link>
      </div>
    </div>
  );
};
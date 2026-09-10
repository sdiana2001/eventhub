import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginPage.module.scss'; 

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь позже подключим Redux dispatch(login({ email, password }))
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Вход</h1>
        <p className={styles.subtitle}>
          Войдите в свой аккаунт, чтобы управлять мероприятиями и покупать билеты
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Электронная почта</label>
            <div className={styles.inputWrapper}>
              <span className={styles.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
  <rect x="5" y="11" width="14" height="10" rx="2" />
  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
</svg>

              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
  <circle cx="12" cy="12" r="3" /></svg>
: 
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
  <path d="M10.733 5.076a10.744 10.744 0 0 1 1.267-.076c5 0 9.27 3.11 11 7.5a11.79 11.79 0 0 1-3.23 4.5" />
  <path d="M14.12 14.12a3 3 0 0 1-4.24-4.24" />
  <path d="M1 1l22 22" />
  <path d="M6.7 6.7C3.9 8.2 1.8 10.6 1 12.5c1.73 4.39 6 7.5 11 7.5 1.5 0 2.9-.28 4.2-.8" />
</svg>
}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Войти
          </button>
        </form>

        <div className={styles.divider}>
          <span>Нет аккаунта?</span>
        </div>

        <Link to="/register" className={styles.registerLink}>
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};
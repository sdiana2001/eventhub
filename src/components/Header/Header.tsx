import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { logout } from '../../store/slices/authSlice';

export const Header: React.FC = () => {
  const { token, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftNav}>
          <Link to="/" className={styles.logo}>
            Event<span>Hub</span>
          </Link>
          <nav className={styles.nav}>
            <Link to="/" className={`${styles.navLink} ${styles.active}`}>
              Мероприятия
            </Link>
            {token && (
              <Link to="/my-events" className={styles.navLink}>
                Мои мероприятия
              </Link>
            )}
          </nav>
        </div>

        <div className={styles.rightNav}>
          <button className={styles.searchIconBtn} aria-label="Поиск">
            🔍
          </button>

          {token ? (
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.name || 'Пользователь'}</span>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Выйти
              </button>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login" className={styles.loginBtn}>
                Войти
              </Link>
              <Link to="/register" className={styles.registerBtn}>
                Зарегистрироваться
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
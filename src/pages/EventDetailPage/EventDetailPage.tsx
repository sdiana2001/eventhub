import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
  fetchEventById,
  registerForEvent,
  unregisterFromEvent,
  fetchMyJoinedEvents,
  deleteEvent,
  clearDeleteError,
} from '../../store/slices/eventsSlice';
import { Header } from '../../components/Header/Header';
import styles from './EventDetailPage.module.scss';
import { ConfirmModal } from '../../components/ConfirmModal/ConfirmModal';
import { formatPrice } from '../../utils/formatPrice';

export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedEvent = useAppSelector((state) => state.events.selectedEvent);
  const isEventLoading = useAppSelector((state) => state.events.isEventLoading);
  const isRegistering = useAppSelector((state) => state.events.isRegistering);
  const registerError = useAppSelector((state) => state.events.registerError);
  const myJoinedEvents = useAppSelector((state) => state.events.myJoinedEvents);
  const token = useAppSelector((state) => state.auth.token);
  const currentUser = useAppSelector((state) => state.auth.user);
  const isRegistered = !!selectedEvent && myJoinedEvents.some((e) => e.id === selectedEvent.id);
  const isDeleting = useAppSelector((state) => state.events.isDeleting);
  const deleteError = useAppSelector((state) => state.events.deleteError);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isOwner = !!selectedEvent && !!currentUser && selectedEvent.user?.id === currentUser.id;


  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(Number(id)));
    }
    if (token) {
      dispatch(fetchMyJoinedEvents());
    }
  }, [id, dispatch, token]);

  const refreshEventData = () => {
    if (id) {
      dispatch(fetchEventById(Number(id)));
      dispatch(fetchMyJoinedEvents());
    }
  };

  const handleRegister = async () => {
    if (!id) return;
    const result = await dispatch(registerForEvent(Number(id)));
    if (registerForEvent.fulfilled.match(result)) {
      refreshEventData();
    }
  };

  const handleUnregister = async () => {
    if (!id) return;
    const result = await dispatch(unregisterFromEvent(Number(id)));
    if (unregisterFromEvent.fulfilled.match(result)) {
      refreshEventData();
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    const result = await dispatch(deleteEvent(Number(id)));
    if (deleteEvent.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {isEventLoading ? (
            <p>Загрузка...</p>
          ) : !selectedEvent ? (
            <p>Мероприятие не найдено</p>
          ) : (
            <>
              <Link to="/" className={styles.backLink}>
                ← Назад к мероприятиям
              </Link>

              <div className={styles.layout}>
                <img src={selectedEvent.coverUrl} alt={selectedEvent.title} className={styles.cover} />

                <div className={styles.rightCol}>
                  <span className={styles.categoryBadge}>{selectedEvent.category.name}</span>
                  <h1 className={styles.title}>{selectedEvent.title}</h1>

                  <div className={styles.metaList}>
                    <p>
                      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="5" width="18" height="16" rx="2" />
                        <path d="M16 3v4M8 3v4M3 10h18" />
                      </svg>
                      {new Date(selectedEvent.date).toLocaleDateString('ru-RU', {
                        day: 'numeric', month: 'long', year: 'numeric',
                      })}, {new Date(selectedEvent.date).toLocaleTimeString('ru-RU', {
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </p>
                    <p>
                      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                      {selectedEvent.address}, {selectedEvent.location}
                    </p>
                    <p>
                      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v10M15 9.5c0-1.1-1.34-2-3-2s-3 .9-3 2 1.34 2 3 2 3 .9 3 2-1.34 2-3 2-3-.9-3-2" />
                      </svg>
                      {formatPrice(selectedEvent.price)}
                    </p>
                    <p>
                      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      Осталось {selectedEvent.capacity - (selectedEvent.registrationsCount ?? 0)} мест из {selectedEvent.capacity}
                    </p>
                    <p>
                      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      {selectedEvent.user?.name ?? 'Не указан'} <span className={styles.subLabel}>Организатор</span>
                    </p>
                  </div>

                  {isRegistered ? (
                    <button
                      className={styles.unregisterButton}
                      onClick={handleUnregister}
                      disabled={isRegistering}
                    >
                      {isRegistering ? 'Отменяем...' : 'Отменить запись'}
                    </button>
                  ) : (
                    <button
                      className={styles.registerButton}
                      onClick={handleRegister}
                      disabled={isRegistering}
                    >
                      {isRegistering ? 'Записываем...' : 'Записаться'}
                    </button>
                  )}
                  {isOwner && (
                    <div className={styles.ownerActions}>
                      <Link to={`/events/${selectedEvent.id}/edit`} className={styles.editButton}>
                        Редактировать
                      </Link>
                      <button
                        className={styles.deleteButton}
                        onClick={() => {
                          dispatch(clearDeleteError());
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        Удалить мероприятие
                      </button>
                    </div>
                  )}
                  {registerError && <p className={styles.errorMessage}>{registerError}</p>}
                  <p className={styles.note}>
                    <svg className={styles.iconSmall} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    Ваши данные защищены. Запись поможет организатору подготовить мероприятие.
                  </p>
                  {isDeleteModalOpen && (
                    <ConfirmModal
                      title="Удалить мероприятие?"
                      message="Это действие необратимо. Все записавшиеся потеряют доступ к мероприятию."
                      confirmText="Удалить"
                      isLoading={isDeleting}
                      onConfirm={handleDelete}
                      onCancel={() => setIsDeleteModalOpen(false)}
                      error={deleteError}
                    />
                  )}
                </div>
              </div>

              {selectedEvent.description && (
                <div className={styles.card}>
                  <h2>О мероприятии</h2>
                  <p>{selectedEvent.description}</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};
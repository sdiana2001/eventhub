import React from 'react';
import styles from './EventCard.module.scss';
import type { IEvent } from '../../types/event';

interface EventCardProps {
  event: IEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatPrice = (price: number | 'Бесплатно') => {
    if (typeof price === 'number') {
      return price === 0 ? 'Бесплатно' : `${price.toLocaleString('ru-RU')} ₽`;
    }
    return price;
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={event.imageUrl} alt={event.title} className={styles.image} />
        <span className={styles.categoryBadge}>{event.category}</span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{event.title}</h3>

        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span>📅</span> {event.date}
          </div>
          <div className={styles.infoItem}>
            <span>📍</span> {event.location}
          </div>
          <div className={styles.infoItem}>
            <span>💰</span> {formatPrice(event.price)}
          </div>
          <div className={styles.infoItem}>
            <span>👤</span> Осталось {event.seatsLeft} мест
          </div>
        </div>

        <button className={styles.button}>Подробнее</button>
      </div>
    </div>
  );
};
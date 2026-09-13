import React from 'react';
import styles from './EventCard.module.scss';
import type { IEvent } from '../../types/event';

interface EventCardProps {
  event: IEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatPrice = (price: number) => {
    return price === 0 ? 'Бесплатно' : `от ${price.toLocaleString('ru-RU')} ₽`;
  };

  const categoryName = typeof event.category === 'object' ? event.category.name : event.category;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img 
          src={event.coverUrl} 
          alt={event.title} 
          className={styles.image} 
        />
        <span className={styles.categoryBadge}>{categoryName}</span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{event.title}</h3>

        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span>📅</span> {event.date}
          </div>
          <div className={styles.infoItem}>
            <span>📍</span> {event.address}
          </div>
          <div className={styles.infoItem}>
            <span>💰</span> {formatPrice(event.price)}
          </div>
          <div className={styles.infoItem}>
            <span>👤</span> Осталось {event.capacity} мест
          </div>
        </div>

        <button className={styles.button}>Подробнее</button>
      </div>
    </div>
  );
};
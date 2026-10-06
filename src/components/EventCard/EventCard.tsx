import React from 'react';
import styles from './EventCard.module.scss';
import type { IEvent } from '../../types/event';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';

interface EventCardProps {
  event: IEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {

  const categoryName = event.category.name;

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
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M16 3v4M8 3v4M3 10h18" />
            </svg>
            {new Date(event.date).toLocaleDateString('ru-RU')}
          </div>
          <div className={styles.infoItem}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {event.address}, {event.location}
          </div>
          <div className={styles.infoItem}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v10M15 9.5c0-1.1-1.34-2-3-2s-3 .9-3 2 1.34 2 3 2 3 .9 3 2-1.34 2-3 2-3-.9-3-2" />
            </svg>
            {formatPrice(event.price)}
          </div>
          <div className={styles.infoItem}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Осталось {event.capacity - (event.registrationsCount ?? 0)} мест из {event.capacity}
          </div>
        </div>

        <Link to={`/events/${event.id}`} className={styles.button}>Подробнее</Link>
      </div>
    </div>
  );
};
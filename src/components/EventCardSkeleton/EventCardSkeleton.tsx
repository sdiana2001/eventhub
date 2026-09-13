import React from 'react';
import { Skeleton } from '../ui/Skeleton/Skeleton';
import styles from './EventCardSkeleton.module.scss';

export const EventCardSkeleton: React.FC = () => {
  return (
    <div className={styles.card}>
      <Skeleton height="180px" borderRadius="12px" />

      <div className={styles.content}>
        <Skeleton width="85%" height="22px" borderRadius="6px" />
        <div className={styles.info}>
          <Skeleton width="55%" height="16px" />
          <Skeleton width="70%" height="16px" />
          <Skeleton width="40%" height="16px" />
          <Skeleton width="50%" height="16px" />
        </div>
        <Skeleton width="100%" height="40px" borderRadius="8px" />
      </div>
    </div>
  );
};
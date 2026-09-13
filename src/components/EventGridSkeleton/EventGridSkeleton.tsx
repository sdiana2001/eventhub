import React from 'react';
import { EventCardSkeleton } from '../EventCardSkeleton/EventCardSkeleton';

interface EventGridSkeletonProps {
  count?: number;
}

export const EventGridSkeleton: React.FC<EventGridSkeletonProps> = ({ count = 8 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </>
  );
};
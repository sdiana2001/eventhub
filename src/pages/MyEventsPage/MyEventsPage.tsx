import React, { useState } from 'react';
import styles from './MyEventsPage.module.scss';
import { Header } from '../../components/Header/Header';
import { EventCard } from '../../components/EventCard/EventCard';
import { EventGridSkeleton } from '../../components/EventGridSkeleton/EventGridSkeleton';
import { useAppSelector } from '../../store/hook';
type TabType = 'created' | 'joined';

export const MyEventsPage: React.FC = () => {
  
const [activeTab, setActiveTab] = useState<TabType>('created');
 
const myCreatedEvents = useAppSelector((state) => state.events.myCreatedEvents) || [];
const myJoinedEvents = useAppSelector((state) => state.events.myJoinedEvents) || [];
const isLoading = useAppSelector((state) => state.events.isLoading);
const currentEvents = activeTab === 'created' ? myCreatedEvents : myJoinedEvents;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Мои мероприятия</h1>
         
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'created' ? styles.active : ''}`}
              onClick={() => setActiveTab('created')}
            >
              Созданные мной
            </button>
            
            <button
              className={`${styles.tab} ${activeTab === 'joined' ? styles.active : ''}`}
              onClick={() => setActiveTab('joined')}
            >
              Я записан
            </button>
          </div>
         
          <div className={styles.content}>
            {isLoading ? (
              <EventGridSkeleton count={4} />
            ) : currentEvents.length === 0 ? (
              <div className={styles.emptyState}>
                <p>
                  {activeTab === 'created'
                    ? 'Вы пока не создали ни одного мероприятия'
                    : 'Вы пока не записались ни на одно мероприятие'}
                </p>
              </div>
            ) : (
              <div className={styles.grid}>
                {currentEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
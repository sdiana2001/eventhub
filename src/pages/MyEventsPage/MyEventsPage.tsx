import React, { useState } from 'react';
import styles from './MyEventsPage.module.scss';
import { Header } from '../../components/Header/Header';
import { EventCard } from '../../components/EventCard/EventCard';
import { EventGridSkeleton } from '../../components/EventGridSkeleton/EventGridSkeleton';
import { useAppSelector } from '../../store/hook';
type TabType = 'created' | 'joined';

export const MyEventsPage: React.FC = () => {
  // 1. Создаем "переключатель" табов (по умолчанию активна вкладка 'created')
const [activeTab, setActiveTab] = useState<TabType>('created');

  // 2. Достаем данные из Redux (пока массивы пустые, пока Аскат делает бэк)
const myCreatedEvents = useAppSelector((state) => state.events.myCreatedEvents) || [];
const myJoinedEvents = useAppSelector((state) => state.events.myJoinedEvents) || [];
const isLoading = useAppSelector((state) => state.events.isLoading);

  // 3. Выбираем, какой список покажем: если activeTab === 'created', то созданные, иначе — записанные
  const currentEvents = activeTab === 'created' ? myCreatedEvents : myJoinedEvents;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Мои мероприятия</h1>

          {/* Кнопки переключения вкладок */}
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
              // Показываем скелетоны во время загрузки
              <EventGridSkeleton count={4} />
            ) : currentEvents.length === 0 ? (
              // Показываем текст-заглушку, если список пустой
              <div className={styles.emptyState}>
                <p>
                  {activeTab === 'created'
                    ? 'Вы пока не создали ни одного мероприятия'
                    : 'Вы пока не записались ни на одно мероприятие'}
                </p>
              </div>
            ) : (
              // Отрисовываем сетку с карточками
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
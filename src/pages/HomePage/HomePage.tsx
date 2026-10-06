import styles from './HomePage.module.scss';
import { Header } from '../../components/Header/Header';
import { EventCard } from '../../components/EventCard/EventCard';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchEvents, fetchCategories, setSearchQuery, setSelectedCategory, setSelectedSort } from '../../store/slices/eventsSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import type { IEvent } from '../../types/event';
import { EventGridSkeleton } from '../../components/EventGridSkeleton/EventGridSkeleton';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events, categories, isLoading, searchQuery, selectedCategory, selectedSort, currentPage, hasMore } =
    useAppSelector((state) => state.events);
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const observerTarget = useRef<HTMLDivElement>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  useEffect(() => {
    dispatch(fetchEvents(1));
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          dispatch(fetchEvents(currentPage + 1));
        }
      },
      { threshold: 1 }
    );

    const target = observerTarget.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [currentPage, hasMore, isLoading, dispatch]);

  const filteredEvents = events
    .filter((event: IEvent) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'Все категории' ||
        event.category.name === selectedCategory;
      const isUpcoming = new Date(event.date).getTime() >= new Date().getTime();

      return matchesSearch && matchesCategory && isUpcoming;
    })
    .sort((a: IEvent, b: IEvent) => {
      if (selectedSort === 'Сначала дешевые') {
        const priceA = Number(a.price);
        const priceB = Number(b.price);
        return priceA - priceB;
      }

      if (selectedSort === 'Сначала дорогие') {
        const priceA = Number(a.price);
        const priceB = Number(b.price);
        return priceB - priceA;
      }

      if (selectedSort === 'Сначала ближайшие') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
      }

      return 0;
    });

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <h1 className={styles.title}>Афиша мероприятий</h1>
            <p className={styles.subtitle}>Открывайте интересные события рядом с вами</p>
          </div>
          <div className={styles.filters}>
            <div className={styles.searchWrapper}>
              <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Поиск мероприятий по названию..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
              className={styles.select}
            >
              <option value="Все категории">Все категории</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              value={selectedSort}
              onChange={(e) => dispatch(setSelectedSort(e.target.value))}
              className={styles.select}>
              <option value="Сначала ближайшие">Сначала ближайшие</option>
              <option value="Сначала дешевые">Сначала дешевые</option>
              <option value="Сначала дорогие">Сначала дорогие</option>
            </select>
          </div>
          <div className={styles.sectionHeader}>
            <h2>Ближайшие мероприятия</h2>
          </div>
          <div className={styles.grid}>
            {events.length === 0 && isLoading ? (
              <EventGridSkeleton count={8} />
            ) : (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            )}
          </div>
          <div ref={observerTarget} className={styles.scrollTrigger} />
          {isLoading && events.length > 0 && <p className={styles.loadingMore}>Загружаем ещё...</p>}
          {!hasMore && events.length > 0 && <p className={styles.endMessage}>Это все мероприятия</p>}
        </div>
      </main>
    </div>
  );
};
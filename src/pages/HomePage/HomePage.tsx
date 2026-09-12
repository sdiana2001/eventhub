
import styles from './HomePage.module.scss';
import { Header } from '../../components/Header/Header';
import { EventCard } from '../../components/EventCard/EventCard';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setSearchQuery, setSelectedCategory, setSelectedSort } from '../../store/slices/eventsSlice';



export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events, searchQuery, selectedCategory, selectedSort} = useAppSelector((state)=> state.events);


const filteredEvents = events
  .filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Все категории' ||
      event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  })
  .sort((a, b) => {
    // 1. Сначала дешевые
    if (selectedSort === 'Сначала дешевые') {
      const priceA = typeof a.price === 'number' ? a.price : 0;
      const priceB = typeof b.price === 'number' ? b.price : 0;
      return priceA - priceB;
    }

    // 2. Сначала дорогие
    if (selectedSort === 'Сначала дорогие') {
      const priceA = typeof a.price === 'number' ? a.price : 0;
      const priceB = typeof b.price === 'number' ? b.price : 0;
      return priceB - priceA;
    }

    // 3. Сначала ближайшие (по дате)
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

          {/* Панель фильтров */}
          <div className={styles.filters}>
            <div className={styles.searchWrapper}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Поиск мероприятий по названию..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className={styles.searchInput}
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
              className={styles.select}
            >
              <option value="Все категории">Все категории</option>
              <option value="Концерт">Концерт</option>
              <option value="Лекция">Лекция</option>
              <option value="Выставка">Выставка</option>
              <option value="Спорт">Спорт</option>
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

          {/* Заголовок секции */}
          <div className={styles.sectionHeader}>
            <h2>Ближайшие мероприятия</h2>
            <button className={styles.showAllBtn}>Показать все</button>
          </div>

          {/* Сетка с карточками */}
          <div className={styles.grid}>
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
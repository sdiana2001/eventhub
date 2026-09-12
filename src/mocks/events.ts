import { type Event } from '../types/event';

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Летний джаз в Саду «Эрмитаж»',
    category: 'Концерт',
    date: '12 июн. 2025, 19:00',
    location: 'Москва, ул. Каретный Ряд, 3',
    price: 1200,
    seatsLeft: 48,
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500&q=80',
  },
  {
    id: '2',
    title: 'Как развивать креативное мышление',
    category: 'Лекция',
    date: '14 июн. 2025, 16:00',
    location: 'Москва, ул. Покровка, 47',
    price: 500,
    seatsLeft: 23,
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&q=80',
  },
  {
    id: '3',
    title: 'Современное искусство: новые имена',
    category: 'Выставка',
    date: '15 июн. 2025, 11:00',
    location: 'Москва, ул. Крымский Вал, 10',
    price: 700,
    seatsLeft: 67,
    imageUrl: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=500&q=80',
  },
  {
    id: '4',
    title: 'Зеленый забег 5 км',
    category: 'Спорт',
    date: '16 июн. 2025, 09:00',
    location: 'Москва, Парк Горького',
    price: 1000,
    seatsLeft: 120,
    imageUrl: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=500&q=80',
  },
];

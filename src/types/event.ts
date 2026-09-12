export interface IEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  price: number | 'Бесплатно';
  seatsLeft: number;
  imageUrl: string;
}

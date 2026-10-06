export interface ICategory {
  id: number;
  name: string;
}

export interface IEvent {
  id: number | string;
  title: string;
  description?: string;
  date: string;
  address: string;
  location: string;
  price: number;
  capacity: number;
  registrationsCount?: number;
  coverUrl: string;
  category: ICategory;
  user: {
    id: number;
    name: string;
    email: string;
  } | null;
}
export interface IEventsResponse {
  items: IEvent[];
  total: number;
}
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
  price: number;
  capacity: number;
  coverUrl: string;
  category: ICategory | string;
}

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IEvent } from '../../types/event';
import { MOCK_EVENTS } from '../../mocks/events';


interface EventState {
    events: IEvent[];
    searchQuery: string;
    selectedCategory:string;
    selectedSort: string;
}

const initialState: EventState = {
    events: MOCK_EVENTS,
    searchQuery: '',
     selectedCategory: 'Все категории',
     selectedSort: 'Сначала ближайшие',
}

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedSort: (state, action: PayloadAction<string>) => {
      state.selectedSort = action.payload;
    },
    setEvents: (state, action: PayloadAction<IEvent[]>) => {
      state.events = action.payload;
    },
  },
});

export const { setSearchQuery, setSelectedCategory, setSelectedSort, setEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
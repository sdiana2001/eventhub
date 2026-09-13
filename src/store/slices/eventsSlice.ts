import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { IEvent } from '../../types/event';
// import { MOCK_EVENTS } from '../../mocks/events';

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<IEvent[]>('http://localhost:3000/events');
      return response.data;
    } catch (error: unknown) {
      // ← Заменили any на unknown (или можно просто catch (error))
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Не удалось загрузить мероприятия');
      }
      return rejectWithValue('Произошла непредвиденная ошибка');
    }
  },
);

interface EventState {
  events: IEvent[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string;
  selectedSort: string;
}

const initialState: EventState = {
  // events: MOCK_EVENTS, 
  events: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  selectedCategory: 'Все категории',
  selectedSort: 'Сначала ближайшие',
};

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, setSelectedCategory, setSelectedSort, setEvents } =
  eventsSlice.actions;
export default eventsSlice.reducer;

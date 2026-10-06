import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { IEvent, ICategory, IEventsResponse } from '../../types/event';
import { $api } from '../../api/axios';

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await axios.get<IEventsResponse>('http://localhost:3000/events', {
        params: { page, limit: 12 },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Не удалось загрузить мероприятия');
      }
      return rejectWithValue('Произошла непредвиденная ошибка');
    }
  },
);
export const fetchMyCreatedEvents = createAsyncThunk(
  'users/me/events',
  async (_, { rejectWithValue }) => {
    try {
      const response = await $api.get('/users/me/events');
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Не удалось загрузить мероприятия');
      }
      return rejectWithValue('Произошла непредвиденная ошибка');
    }
  },
);
export const fetchMyJoinedEvents = createAsyncThunk(
  'users/me/registrations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await $api.get('/users/me/registrations');
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Не удалось загрузить мероприятия');
      }
      return rejectWithValue('Произошла непредвиденная ошибка');
    }
  },
);
export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await $api.get(`/events/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Не удалось загрузить мероприятия');
      }
      return rejectWithValue('Произошла непредвиденная ошибка');
    }
  },
);

export const registerForEvent = createAsyncThunk(
  'events/registerForEvent',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await $api.post(`/events/${id}/register`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Не удалось записаться на мероприятие');
      }
      return rejectWithValue('Произошла непредвиденная ошибка');
    }
  },
);
export const unregisterFromEvent = createAsyncThunk(
  'events/unregisterFromEvent',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await $api.delete(`/events/${id}/unregister`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Не удалось отменить запись');
      }
      return rejectWithValue('Произошла непредвиденная ошибка');
    }
  },
);
export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await $api.delete(`/events/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Не удалось удалить мероприятие');
      }
      return rejectWithValue('Произошла непредвиденная ошибка');
    }
  },
);

export const fetchCategories = createAsyncThunk(
  'events/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<ICategory[]>('http://localhost:3000/category');
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Не удалось загрузить категории');
      }
      return rejectWithValue('Произошла непредвиденная ошибка');
    }
  },
);

export const uploadImage = createAsyncThunk(
  'events/uploadImage',
  async (file: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await $api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.url;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Не удалось загрузить изображение');
      }
      return rejectWithValue('Произошла непредвиденная ошибка');
    }
  },
);
export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData: any, { rejectWithValue }) => {
    try {
      const response = await $api.post('/events', eventData);
      return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message;
          return rejectWithValue(
            Array.isArray(message) ? message.join(', ') : message || 'Не удалось создать мероприятие',
          );
        }
        return rejectWithValue('Произошла непредвиденная ошибка');
      }
  },
);
export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ id, data }: { id: number; data: any }, { rejectWithValue }) => {
    try {
      const response = await $api.patch(`/events/${id}`, data);
      return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message;
          return rejectWithValue(
            Array.isArray(message) ? message.join(', ') : message || 'Не удалось сохранить изменения',
          );
        }
        return rejectWithValue('Произошла непредвиденная ошибка');
      }
  },
);

interface IEventState {
  events: IEvent[];
  categories: ICategory[];
  myCreatedEvents: IEvent[];
  myJoinedEvents: IEvent[];
  selectedEvent: IEvent | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string;
  selectedSort: string;
  isEventLoading: boolean;
  isRegistering: boolean;
  registerError: string | null;
  isUploading: boolean;
  uploadedImageUrl: string | null;
  isCreating: boolean;
  createError: string | null;
  isDeleting: boolean;
  deleteError: string | null;
  currentPage: number;
  totalEvents: number;
  hasMore: boolean;
  isUpdating: boolean;
  updateError: string | null;
}

const initialState: IEventState = {
  events: [],
  categories: [],
  myCreatedEvents: [],
  myJoinedEvents: [],
  selectedEvent: null,
  isEventLoading: false,
  isLoading: false,
  error: null,
  searchQuery: '',
  selectedCategory: 'Все категории',
  selectedSort: 'Сначала ближайшие',
  isRegistering: false,
  registerError: null,
  isUploading: false,
  uploadedImageUrl: null,
  isCreating: false,
  createError: null,
  isDeleting: false,
  deleteError: null,
  currentPage: 1,
  totalEvents: 0,
  hasMore: true,
  isUpdating: false,
  updateError: null,
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
    clearDeleteError: (state) => {
      state.deleteError = null;
    },
    clearFormErrors: (state) => {
      state.createError = null;
      state.updateError = null;
    },
    clearUploadedImage: (state) => {
      state.uploadedImageUrl = null;
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
        if (action.meta.arg === 1) {
          state.events = action.payload.items;
        } else {
          state.events = [...state.events, ...action.payload.items];
        }
        state.currentPage = action.meta.arg;
        state.totalEvents = action.payload.total;
        state.hasMore = state.events.length < action.payload.total;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchCategories.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(fetchMyCreatedEvents.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchMyCreatedEvents.fulfilled, (state, action) => {
        state.myCreatedEvents = action.payload;
      })
      .addCase(fetchMyCreatedEvents.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(fetchMyJoinedEvents.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchMyJoinedEvents.fulfilled, (state, action) => {
         state.myJoinedEvents = action.payload.map((registration: any) => registration.event);
      })
      .addCase(fetchMyJoinedEvents.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchEventById.pending, (state) => {
        state.error = null;
        state.isEventLoading = true;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
         state.selectedEvent = action.payload;
         state.isEventLoading = false;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isEventLoading = false;
      })
      .addCase(registerForEvent.pending, (state) => {
        state.isRegistering = true;
        state.registerError = null;
      })
      .addCase(registerForEvent.fulfilled, (state) => {
        state.isRegistering = false;
      })
      .addCase(registerForEvent.rejected, (state, action) => {
        state.isRegistering = false;
        state.registerError = action.payload as string;
      })
      .addCase(unregisterFromEvent.pending, (state) => {
        state.isRegistering = true;
        state.registerError = null;
      })
      .addCase(unregisterFromEvent.fulfilled, (state) => {
        state.isRegistering = false;
      })
      .addCase(unregisterFromEvent.rejected, (state, action) => {
        state.isRegistering = false;
        state.registerError = action.payload as string;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.isDeleting = true;
        state.deleteError = null;
      })
      .addCase(deleteEvent.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isDeleting = false;
        state.deleteError = action.payload as string;
      })
      .addCase(uploadImage.pending, (state) => {
        state.isUploading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isUploading = false;
        state.uploadedImageUrl = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isUploading = false;
        state.error = action.payload as string;
      })
      .addCase(createEvent.pending, (state) => {
        state.isCreating = true;
        state.createError = null;
      })
      .addCase(createEvent.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isCreating = false;
        state.createError = action.payload as string;
      })
      .addCase(updateEvent.pending, (state) => {
        state.isUpdating = true;
        state.updateError = null;
      })
      .addCase(updateEvent.fulfilled, (state) => {
        state.isUpdating = false;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError = action.payload as string;
      });
  },
});

export const { setSearchQuery, setSelectedCategory, setSelectedSort, setEvents, clearDeleteError, clearUploadedImage, clearFormErrors } =
  eventsSlice.actions;
export default eventsSlice.reducer;
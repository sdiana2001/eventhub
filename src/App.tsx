import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { HomePage } from './pages/HomePage/HomePage';
import { MyEventsPage } from './pages/MyEventsPage/MyEventsPage';
import { EventDetailPage } from './pages/EventDetailPage/EventDetailPage';
import { CreateEventPage } from './pages/CreateEventPage/CreateEventPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/my-events" element={<MyEventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/events/create" element={<CreateEventPage/>} />
        <Route path="/events/:id/edit" element={<CreateEventPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
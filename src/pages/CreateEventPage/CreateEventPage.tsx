import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchCategories, uploadImage, createEvent, clearUploadedImage, fetchEventById, updateEvent, clearFormErrors } from '../../store/slices/eventsSlice';
import { Header } from '../../components/Header/Header';
import styles from './CreateEventPage.module.scss';

export const CreateEventPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector((state) => state.events.categories);
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const selectedEvent = useAppSelector((state) => state.events.selectedEvent);
  const isUpdating = useAppSelector((state) => state.events.isUpdating);
  const updateError = useAppSelector((state) => state.events.updateError);
  const createError = useAppSelector((state) => state.events.createError);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    address: '',
    location: '',
    price: '',
    capacity: 0,
    coverUrl: '',
    categoryId: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
useEffect(() => {
    dispatch(fetchCategories());
    dispatch(clearUploadedImage());
    dispatch(clearFormErrors());
    if (id) {
        dispatch(fetchEventById(Number(id)));
    }
}, [dispatch, id]);

useEffect(() => {
  if (!isEditMode || !selectedEvent || String(selectedEvent.id) !== id) return;

  const d = new Date(selectedEvent.date);
  const pad = (n: number) => String(n).padStart(2, '0');

  setFormData({
    title: selectedEvent.title,
    description: selectedEvent.description ?? '',
    date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
    address: selectedEvent.address,
    location: selectedEvent.location,
    price: String(Number(selectedEvent.price)),
    capacity: selectedEvent.capacity,
    coverUrl: selectedEvent.coverUrl,
    categoryId: selectedEvent.category.id,
  });
}, [isEditMode, selectedEvent, id]);
    const uploadedImageUrl = useAppSelector((state) => state.events.uploadedImageUrl);
    const isUploading = useAppSelector((state) => state.events.isUploading);
    const isCreating = useAppSelector((state) => state.events.isCreating);

    useEffect(() => {
        if (uploadedImageUrl) {
            setFormData((prev) => ({
            ...prev,
            coverUrl: uploadedImageUrl,
            }));
            dispatch(clearUploadedImage());
        }
    }, [uploadedImageUrl, dispatch]);

    const uploadFile = (file: File | undefined) => {
  if (file && file.type.startsWith('image/')) {
    dispatch(uploadImage(file));
  }
};

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  uploadFile(e.target.files?.[0]);
};

const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
  e.preventDefault();
  setIsDragging(true);
};

const handleDragLeave = () => {
  setIsDragging(false);
};

const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
  e.preventDefault();
  setIsDragging(false);
  uploadFile(e.dataTransfer.files?.[0]);
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  const isNumberField = name === 'capacity' || name === 'categoryId';

  setFormData((prev) => ({
    ...prev,
    [name]: isNumberField ? Number(value) : value,
  }));
};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedData = {
    ...formData,
    title: formData.title.trim(),
    description: formData.description.trim(),
    address: formData.address.trim(),
    location: formData.location.trim(),
    coverUrl: formData.coverUrl.trim(),
    price: Number(formData.price || 0),
    date: `${formData.date}T${formData.time}`,
  };

    if (isEditMode && id) {
        const result = await dispatch(updateEvent({ id: Number(id), data: cleanedData }));
        if (updateEvent.fulfilled.match(result)) {
            navigate(`/events/${id}`);
        }
        } else {
        const result = await dispatch(createEvent(cleanedData));
        if (createEvent.fulfilled.match(result)) {
            navigate('/');
        }
    }
  };
  return (
    <div className={styles.page}>
        <Header />
        <main className={styles.main}>
        <div className={styles.container}>
            <h1 className={styles.title}>{isEditMode ? 'Редактировать мероприятие' : 'Создать мероприятие'}</h1>
            <p className={styles.subtitle}>Расскажите о вашем мероприятии, чтобы привлечь участников</p>

            <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.layout}>
                <div className={styles.leftCol}>
                <div className={styles.field}>
                    <label htmlFor="title">Название мероприятия</label>
                    <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Например, Летний джаз в Саду «Эрмитаж»"
                    required
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="description">Описание</label>
                    <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Расскажите, о чём ваше мероприятие, что ждёт участников..."
                    rows={4}
                    />
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                    <label htmlFor="date">Дата</label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                    </div>

                    <div className={styles.field}>
                    <label htmlFor="time">Время</label>
                    <input
                        id="time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                    <label htmlFor="address">Адрес</label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Например, ул. Покровка, 47"
                        required
                    />
                    </div>

                    <div className={styles.field}>
                    <label htmlFor="location">Город</label>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Например, Москва"
                        required
                    />
                    </div>
                </div>
                </div>

                <div className={styles.rightCol}>
                <label htmlFor="coverImage" className={styles.uploadLabel}>
                    Изображение мероприятия
                </label>
                <label
                    htmlFor="coverImage"
                    className={`${styles.uploadBox} ${isDragging ? styles.uploadBoxActive : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {formData.coverUrl && !isUploading ? (
                    <img src={formData.coverUrl} alt="Превью" className={styles.imagePreview} />
                    ) : (
                    <>
                        <svg className={styles.uploadIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="3" />
                        <circle cx="9" cy="9" r="2" />
                        <path d="M21 15l-5-5L5 21" />
                        </svg>
                        <span className={styles.uploadText}>
                        {isUploading ? 'Загрузка...' : 'Загрузите изображение'}
                        </span>
                        <span className={styles.uploadHint}>
                        Перетащите файл сюда или нажмите для выбора
                        </span>
                        <span className={styles.uploadHint}>JPG, PNG, до 5 МБ</span>
                    </>
                    )}
                </label>
                <input
                    id="coverImage"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={styles.hiddenFileInput}
                />
                </div>
            </div>

            <div className={styles.bottomRow}>
                <div className={styles.field}>
                <label htmlFor="categoryId">Категория</label>
                <select
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                >
                    <option value={0} disabled>Выберите категорию</option>
                    {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                    ))}
                </select>
                </div>

                <div className={styles.field}>
                <label htmlFor="price">Цена билета</label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Пусто или 0, если бесплатно"
                />
                </div>

                <div className={styles.field}>
                <label htmlFor="capacity">Количество мест</label>
                <input
                    id="capacity"
                    name="capacity"
                    type="number"
                    min="1"
                    value={formData.capacity === 0 ? '' : formData.capacity}
                    onChange={handleChange}
                    placeholder="Например, 100"
                    required
                />
                </div>
            </div>
            {updateError && isEditMode && <p className={styles.error}>{updateError}</p>}
            {createError && !isEditMode && <p className={styles.error}>{createError}</p>}
            <div className={styles.actions}>
                <button type="button" className={styles.cancelLink} onClick={() => navigate('/')}>
                ← Отмена
                </button>
                <button type="submit" className={styles.submitBtn} disabled={isCreating || isUpdating}>
                {isCreating || isUpdating ? 'Сохраняем...' : isEditMode ? 'Сохранить' : 'Создать мероприятие'}
                </button>
                
            </div>
            </form>
        </div>
        </main>
    </div>
    );
};
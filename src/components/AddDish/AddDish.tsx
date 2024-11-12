import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { addDish } from '../../features/dishSlice';

const DishForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddDish = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await dispatch(addDish({ title, price: parseFloat(price), image })).unwrap();
      alert('Блюдо добавлено успешно');
      setTitle('');
      setPrice('');
      setImage('');
    } catch (error) {
      console.error('Ошибка при добавлении блюда:', error);
      alert('Ошибка при добавлении блюда');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dish-form">
      <h2>Добавить блюдо</h2>
      <form onSubmit={handleAddDish}>
        <label>
          Название:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Цена:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          URL изображения:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </label>
        {image && <img src={image} alt="Превью изображения" width={100} />}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Добавление...' : 'Добавить блюдо'}
        </button>
      </form>
    </div>
  );
};

export default DishForm;

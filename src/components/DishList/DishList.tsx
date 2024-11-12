"use client"
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDishes } from '../../features/dishSlice';
import { AppDispatch, RootState } from '../../store/store';
import { Spinner } from '../Spinner/Spinner';
import Link from 'next/link';
import { Dish } from '../../features/dishSlice';
// import DishModal from '../DishModal/DishModal';
import './DishList.css';

const DishList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.dishes);
  const [selectedDish, setSelectedDish] = useState<Dish>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      dispatch(fetchDishes());
    } catch (err) {
      console.error("Error fetching dishes:", err);
    }
  }, [dispatch]);

  // const handleDelete = (id: string) => {
  //   dispatch(deleteDish(id));
  //   alert("Блюдо удалено");
  //   setIsModalOpen(false);
  // };

  const handleSelectDish = (dish: Dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  // const handleCloseModalBtn = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   setIsModalOpen(false);
  // };

  const handleCloseModal = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      setIsModalOpen(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="dish-list">
      <h1 className="dish-list__title">Меню</h1>
      <Link href="/add-dish">
        <button className="dish-list__add-button">Добавить блюдо</button>
      </Link>
      <ul className="dish-list__items">
        {items.map(dish => (
          <li key={dish.id} className="dish-list__item" onClick={() => handleSelectDish(dish)}>
            <img src={dish.image} alt={`${dish.title} photo`} className="dish-list__image" />
            <div className="dish-list__info">
              <p className="dish-list__title">{dish.title}</p>
              <p className="dish-list__price">{dish.price}тг</p>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && selectedDish && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          {/* <DishModal dish={selectedDish} onClose={handleCloseModalBtn} onDelete={handleDelete} /> */}
        </div>
      )}
    </div>
  );
};

export default DishList;

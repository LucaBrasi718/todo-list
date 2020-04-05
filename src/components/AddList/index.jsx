import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { List, Badge } from '../index';

import addSvg from '../../assets/img/add.svg';
import closeSvg from '../../assets/img/close.svg';
import './AddList.scss';

export default function AddList({ colors, onAdd }) {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, selectColor] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (Array.isArray(colors)) {
      selectColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    selectColor(colors[0].id);
    setInputValue('');
    setVisiblePopup(false);
  }

  const addList = () => {
    if (!inputValue) {
      alert('Введите название списка!');
      return;
    }
    
    setIsLoading(true);
    axios
      .post('http://localhost:3001/lists', {
        name: inputValue,
        colorId: selectedColor
      })
      .then(({ data }) => {
        const color = colors.filter(c => c.id === selectedColor)[0].name;
        const listObj = { ...data, color: { name: color } };
        onAdd(listObj);
        onClose();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
        {
            className: "add-list__button",
            icon: addSvg,
            name: 'Добавить список',
            active: false
        }
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img src={closeSvg} onClick={onClose} alt="Close" className="add-list__popup-close-btn"/>
          <input
            className="field"
            type="text"
            placeholder="Название списка"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <div className="add-list__popup-colors">
            {colors.map((color, index) => (
              <Badge
                onClick={() => selectColor(color.id)}
                key={index}
                color={color.name}
                className={selectedColor === color.id && 'active'}
              />
            ))}
          </div>
          <button onClick={addList} className="button">
            {isLoading ? 'Добавление...' : 'Добавить'}
          </button>
        </div>
      )}
    </div>
  );
}
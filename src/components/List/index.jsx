import React from 'react';
import classNames from 'classnames';
import axios from 'axios';
import { Badge } from '../index';

import './List.scss';
import removeSvg from '../../assets/img/remove.svg';

export default function List({ items, isRemovable, onClick, onRemove }) {

  const confirmRemove = (item) => {
    if (window.confirm('Вы действительно хотите удалить список?')) {
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        onRemove(item.id);
      });
    }
  }
  return (
    <ul className="list" onClick={onClick}>
      {items.map((item, index) => (
        <li key={index} className={classNames(item.className, {active: item.active})}>
          {item.icon ? (
            <i>
              <img src={item.icon} alt="Icon list"/>
            </i>
          ) : (
            <Badge color={item.color.name} />
          )}
          <span>{item.name}</span>
          {isRemovable && (
            <img
              className="list__remove-icon"
              src={removeSvg}
              alt="remove icon"
              onClick={() => confirmRemove(item)}
            />
          )}
        </li>
      ))}
    </ul>
  )
}
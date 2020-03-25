import React from 'react';

import './List.scss';

export default function List({ items }) {
  return (
    <ul className="list">
      {items.map((item, index) => (
        <li key={index} className={item.active ? 'active' : ''}>
          {item.icon ? (
            <i>
              <img src={item.icon} alt="Icon list"/>
            </i>
          ) : (
            <i className={`badge badge--${item.color}`}>
            </i>
          )}
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  )
}
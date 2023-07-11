import React from 'react';

const Menu = ({ menu, onOrder }) => {
  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {menu.map((dish) => (
          <li key={dish.id}>
            {dish.dish_name} - ${dish.dish_price} - {dish.availability}
            <button onClick={() => onOrder(dish.id)}>Order Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;

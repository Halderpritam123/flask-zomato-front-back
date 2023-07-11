import React from 'react';

const Order = ({ order, onRemoveOrder, onUpdateOrderStatus }) => {
  return (
    <div>
      <h2>Order</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Dish Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {order.map((dish) => (
            <tr key={dish.id}>
              <td>{dish.id}</td>
              <td>{dish.dish_name}</td>
              <td>{dish.dish_price}</td>
              <td>{dish.status}</td>
              <td>
                <button onClick={() => onRemoveOrder(dish.id)}>Remove</button>
                <select
                  value={dish.status}
                  onChange={(e) => onUpdateOrderStatus(dish.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;

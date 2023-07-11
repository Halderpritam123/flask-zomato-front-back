import React, { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import Menu from './components/Menu';
import Order from './components/Order';
import './styles.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/menu');
      const data = await response.json();
      setMenu(data);
    } catch (error) {
      console.log('Error fetching menu:', error);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        console.log('Login failed:', response.status);
      }
    } catch (error) {
      console.log('Error logging in:', error);
    }
  };

  const handleRegister = async (email, password) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        console.log('Registration failed:', response.status);
      }
    } catch (error) {
      console.log('Error registering:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/logout', {
        method: 'POST',
      });

      if (response.ok) {
        setIsLoggedIn(false);
        setOrder([]);
      } else {
        console.log('Logout failed:', response.status);
      }
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

 
  const handleOrder = (dishId) => {
    const selectedDish = menu.find((dish) => dish.id === dishId);
    if (selectedDish) {
      setOrder([...order, selectedDish]);
    }
  };

  const handleRemoveOrder = (dishId) => {
    const updatedOrder = order.filter((dish) => dish.id !== dishId);
    setOrder(updatedOrder);
  };

  const handleUpdateOrderStatus = (dishId, newStatus) => {
    const updatedOrder = order.map((dish) => {
      if (dish.id === dishId) {
        return { ...dish, status: newStatus };
      }
      return dish;
    });
    setOrder(updatedOrder);
  };

  return (
    <div className="app-container">
      <h1>Welcome to Zesty Zomato 🚀</h1>
      {isLoggedIn ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <Menu menu={menu} onOrder={handleOrder} />
          <Order
            order={order}
            onRemoveOrder={handleRemoveOrder}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        </>
      ) : (
        <div className="auth-container">
          <AuthForm title="Login" buttonText="Login" onSubmit={handleLogin} />
          <AuthForm title="Register" buttonText="Register" onSubmit={handleRegister} />
        </div>
      )}
    </div>
  );
};


export default App;

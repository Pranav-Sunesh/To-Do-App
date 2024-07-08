import React from 'react';
import { useState, useEffect } from 'react';
import ListSection from './components/ListSection';
import ListItem from './components/ListItem';
import axios from 'axios';
import Auth from './components/Auth';
import { useCookies } from 'react-cookie';
const App = () => {
  
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [items, setItems] = useState([]);
  const AuthToken = cookies.token;
  const userEmail = cookies.email;
  const getItems = async () => {
    const result = await axios.get(`http://localhost:5000/items/${userEmail}`);
    const data = result.data;
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
    setItems(data);
  }
  useEffect(() => {
    getItems();
  },[]);

  return (
    <div >
      {AuthToken?<div className='app'>
      <ListSection name={"To-Do List 📋"} getItems={getItems}/>
      {items.map((item, index) => (
        <ListItem 
          item={item.title} 
          key={index} 
          getItems={getItems} 
          progress={item.progress} 
          date={item.date}
          id={item.id}
        />
        ))}  
      </div>: <Auth />}
    </div>
  )
}

export default App

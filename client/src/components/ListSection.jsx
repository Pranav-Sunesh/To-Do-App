import React, { useCallback } from 'react';
import Modal from './Modal';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';


const ListSection = ({name, getItems}) => {
  const [popModal, setPopModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  return (
    <div className='list-section'>
      <h1>{name}</h1>
      <div>
        <button className='add-button button' onClick={() => {setPopModal(true)}}>ADD NEW</button>
        <button className='button signout' onClick={() => {removeCookie('email');removeCookie('token');}}>Sign Out</button>
      </div>
      {popModal && <Modal setPopModal={setPopModal} mode={'create'} getItems={getItems}/>}
    </div>
  )
}

export default ListSection
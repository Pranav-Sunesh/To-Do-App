import { useEffect, useState } from 'react';
import Modal from './Modal';
import ProgressBar from './ProgressBar';
import axios from 'axios';
import TickIcon from './TickIcon';
const ListItem = ({ item , getItems , progress , id }) => {
  
  const [popModal, setPopModal] = useState(false);
  const [tick, setTick] = useState(false);
  useEffect(() => {
    setTick(progress === 100? true : false);
    getItems();
  },[progress]);
  const deleteItem = async() => {
    try {
    const response = await axios.delete(`http://localhost:5000/submit/${id}`);
    getItems();
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='list-item'>
        <div className='item-container'>
            <div className="tick-container">
              {tick && <TickIcon />}
            </div>
            <div className="title-container">
              <h4>{item}</h4>
            </div>
            <div className='progressbar-container'>
              <ProgressBar progress={progress}/>
            </div>
            <div className="button-container">
                <button className='edit-button button' onClick={() => setPopModal(true)}>EDIT</button>
                <button className='delete-button button'onClick={deleteItem}>DELETE</button>
            </div>
        </div>
        {popModal && <Modal setPopModal={setPopModal} mode={'edit'} getItems={getItems} item={item} itemProgress={progress}  id={id} />}
    </div>
  )
}

export default ListItem
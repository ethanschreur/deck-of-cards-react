import {useEffect, useState} from 'react';
import axios from 'axios';

function DrawTypeTwo() {
  const [deckId, setDeckID] = useState()
  const [cardImage, setCardImage] = useState('')
  const[blnShowErr, setBlnShowErr] = useState(false);
  const [isRunning, setIsRunning] = useState(false)
  const [interval, setTheInterval] = useState()
  useEffect(()=>{
    axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then((res)=>{
      setDeckID(res.data.deck_id)
    })
  }, [])

  useEffect(()=>{
    if (blnShowErr){
        clearInterval(interval)
        alert('Error: no cards remaining!')
    }
  }, [blnShowErr])

  const handleButtonClick = ()=>{
      if (!isRunning){
    setIsRunning(true);
    setTheInterval(setInterval(()=>{
        axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`).then((res)=>{
            if (res.data.remaining === 0){
              setBlnShowErr(true);
            }
            if (res !== undefined){
          setCardImage(res.data.cards[0].image)}})
          
    },100));}
else {
    clearInterval(interval)
    setIsRunning(false)
}};


  
  return (
  <>
  <button onClick={handleButtonClick}>{isRunning ? 'Stop drawing' : 'Start drawing'}</button>
  <br></br>
  {cardImage && <img src={cardImage} alt="card"></img>
  }</>
  );
}

export default DrawTypeTwo;

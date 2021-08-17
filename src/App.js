import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import DrawTypeTwo from './DrawTypeTwo';

function App() {
  const [deckId, setDeckID] = useState()
  const [cardImage, setCardImage] = useState('')
  const[blnShowErr, setBlnShowErr] = useState(false);
  useEffect(()=>{
    axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then((res)=>{
      setDeckID(res.data.deck_id)
    })
  }, [])
  const draw = ()=>{
    if (!blnShowErr) {
    axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`).then((res)=>{
      if (res.data.remaining === 0){
        setBlnShowErr(true);
      }
      if (res !== undefined){
    setCardImage(res.data.cards[0].image)}
    })} else {
      alert('Error: no cards remaining!')
    }
  }
  return (
  <>
  <button onClick={draw}>Draw a Card</button>
  <br></br>
  {cardImage && <img src={cardImage} alt="card"></img>}
  <br></br>
  <DrawTypeTwo/></>
  );
}

export default App;

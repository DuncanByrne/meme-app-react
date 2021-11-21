import React, { useEffect, useState } from 'react';
import styles from './styles.module.css'

export const Meme = () =>{

  const [memes, setMemes] = useState([])

useEffect(() => {
  fetch('https://api.imgflip.com/get_memes').then(res => res.json().then(res =>{
    const memes = res.data.memes;
    setMemes(memes);

  }))
});
  return(
  memes.length ? 
  <div className={styles.container}>
    <button onClick={() => console.log('click!')} className={styles.skip}>Skip</button>
    <img src={memes[0].url} alt='meme'/> 
  </div>: 
  <></>);
};
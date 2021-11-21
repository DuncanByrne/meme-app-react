import React, { useEffect, useState } from 'react';
import styles from './styles.module.css'

export const Meme = () =>{

  const [memes, setMemes] = useState([])
  const [memeIndex, setMemeIndex ] = useState(0);

useEffect(() => {
  fetch('https://api.imgflip.com/get_memes').then(res => res.json().then(res =>{
    const memes = res.data.memes;
    setMemes(memes);

  }))
});
  return(
  memes.length ? 
  <div className={styles.container}>
    <button onClick={() => setMemeIndex(memeIndex + 1)} className={styles.skip}>Skip</button>
    <img src={memes[memeIndex].url} alt='meme'/> 
  </div>: 
  <></>);
};
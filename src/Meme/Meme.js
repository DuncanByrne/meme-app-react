import React, { useEffect, useState } from 'react';

export const Meme = () =>{

  const [memes, setMemes] = useState([])

useEffect(() => {
  fetch('https://api.imgflip.com/get_memes').then(res => res.json().then(res =>{
    const memes = res.data.memes;
    setMemes(memes);

  }))
});
  return(
  memes.length ? <div>
    <button>Skip</button>
    <img src={memes[0].url}/> 
  </div>: 
  <></>);
};
import React, { useEffect } from 'react';

export const Meme = () =>{

useEffect(() => {
  fetch('https://api.imgflip.com/get_memes').then(res => res.json().then(res =>{
    console.log(res);
  }))
});
  return(<> hello</>)
};
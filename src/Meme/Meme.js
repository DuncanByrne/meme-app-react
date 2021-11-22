import React, { useEffect, useState } from 'react';
import styles from './styles.module.css'

export const Meme = () =>{

  const [memes, setMemes] = useState([])
  const [memeIndex, setMemeIndex ] = useState(0);
  const [captions, setCaptions ] = useState([]);

  // this function updates the captions
  const updateCaption = (e, index) => {
    const text =e.target.value || '';
    setCaptions(
      captions.map((c, i) => {
        if(index === i){
          return text;
        } else{
          return c;

        }
      })
    )
  }

  const generateMeme = () =>{
    const currentMeme = memes[memeIndex];
    // form data object
    const formData = new FormData();
    // append username
    formData.append('username', 'duncanbyrne' );
    // password
    formData.append('password', 'Password123');
    // template id
    formData.append('template_id', currentMeme.id);
    // loop through captions to set a value for each
    captions.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));
    // fetch api
    fetch('https://api.imgflip.com/caption_image',{
      method: 'POST',
      body: formData
    }).then(res => {
      res.json().then(res => {
        console.log(res)
      })
    })
  }

  // this function shuffles the order that the memes appear in
  const shuffleMemes = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
// fetch the api to gather the memes
  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes').then(res => {
      res.json().then(res => {
        const _memes = res.data.memes;
        shuffleMemes(_memes);
        setMemes(_memes);
      });
    });
  }, []);

  useEffect(() => {
    if(memes.length){
      setCaptions(Array(memes[memeIndex].box_count).fill(''));
    }
  }, [memeIndex, memes]);

  // useEffect(() =>{
  //   console.log(captions)
  // },[captions])

  return(
  memes.length ? 
  <div className={styles.container}>
    {/* generate button */}
    <button onClick={generateMeme} className={styles.generate}>Generate</button>
    {/* skip to another meme */}
    <button onClick={() => setMemeIndex(memeIndex + 1)} className={styles.skip}>Skip</button>
    {
      captions.map((c, index) =>(
        <input onChange = {(e)=> updateCaption(e, index)} key ={index}/>
      ))
    }
    <img src={memes[memeIndex].url} alt='meme'/> 
  </div>: 
  <></>);
};
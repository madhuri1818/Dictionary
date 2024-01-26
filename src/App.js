import { React, useState,useEffect } from "react";
import Axios from "axios";
import "./App.css";
import { FcSpeaker } from "react-icons/fc";
function App() {
  const [data,setData]=useState("")
  const[searchData,setSearchData]=useState("")
  function handleKeyPress(e) {
      if (e.keyCode === 13) {
      fetchDef();
      listen();
    }
  }
  useEffect(() => {
    if (data && data.phonetics && data.phonetics[0] && data.phonetics[0].audio) {
      listen();
    }
  }, [data]);
  function fetchDef(){
    Axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchData}`)
    .then((res)=>{setData(res.data[0]);listen();})
    .catch((err)=>{console.log(err)})
  }
  function listen() {
    try {
      if (data.phonetics[0].audio) {
        let audio = new Audio(data.phonetics[0].audio);
        audio.play();
      }
    } catch (err) {
      console.log(err);
    }
    // let audio = new Audio(data.phonetics[0].audio);
    // audio.play();
    // .catch((err)=>{console.log(err)})
  }
  return (
    <div className="App">
      <h1>Dictionary</h1>
      <div className="sBox">
        <input type="text" placeholder="Enter Word" onChange={(e) => { setSearchData(e.target.value);}}onKeyDown={handleKeyPress} />
     </div>
     {data && (
        <div className="showResults">
          <h2>
            {data.word}{" "}
            <button
              onClick={() => {
                listen();
              }}
            >
              <FcSpeaker size="26px" />
            </button>
          </h2>
          <h4>Parts of speech:</h4>
          <p>{data.meanings[0].partOfSpeech}</p>

          <h4>Definition:</h4>
          <p>{data.meanings[0].definitions[0].definition}</p>

          <h4>Example:</h4>
          <p>{data.meanings[0].definitions[0].example}</p>
        </div>
      )}
    </div>
  );
}

export default App;

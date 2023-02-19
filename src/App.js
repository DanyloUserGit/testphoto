import './App.css';
import { Addbtn, Camerabtn } from './components/buttons';
import { Video } from './components/Form';
import { Username } from './components/names';
import {useEffect, useState, useRef, useCallback} from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
function App() {
  const ApiKey = "c28528763c8b4a7c8f0a000f4f602c8e";
  const [addWork, setaddWork] = useState("");
  const [cameraOn, setcameraOn] = useState("none");
  const webRef = useRef(null);
  const videoConstraints = {
    facingMode: { exact: "environment" }
  };
  const successCallback = (position) => {
    const {latitude, longitude} = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${ApiKey}`)
    .then(response=>response.json())
    .then(data=>{
      const img = webRef.current.getScreenshot();
      setaddWork(img);
      console.log(data);
      fetch(('https://photobase-a34b5-default-rtdb.europe-west1.firebasedatabase.app/data/-NOdw0sdfmPqwLwsrRmh.json?id=2'),{
        method: 'PATCH',
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify({userworks:[{
          img:img,
          date:data.timestamp.created_http,
          location: data.results[0].formatted
        }]})
      })
    })
  }; 
  const errorCallback = (error) => {
    console.log(error);
  };
  const getUserWorks = (userId) =>{
    axios.get(`https://photobase-a34b5-default-rtdb.europe-west1.firebasedatabase.app/data/-NOdw0sdfmPqwLwsrRmh.json?id=${userId}`).then(resp => {
        
    console.log(resp.data.userworks);
    })
  }
  // const TakePhoto = useCallback(()=>{
  //   const img = webRef.current.getScreenshot();
  //   setaddWork(img);
  // })
  
  return (
    <div>
      {getUserWorks(2)}
      <Webcam ref={webRef} audio={false} className={"preview"} style={{display: cameraOn}} videoConstraints={videoConstraints} />
      <Camerabtn style={{display: cameraOn}} onclickHandle={(e)=>{
        e.preventDefault();
        // TakePhoto()
        setcameraOn("none");
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      }}/>
      <Username margin={5} name={"James Bond"}/>

      <Addbtn onclickHandle={()=>{
        setcameraOn("block");
      }}/>    
      <ul style={{marginLeft: 5 + "vw", marginTop: 5/2 + "vw"}}>
        <li><img src={addWork} alt='Taken photo'/></li>
      </ul>
    </div>
  );
}

export default App;

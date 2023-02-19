import './App.css';
import { Addbtn, Camerabtn } from './components/buttons';
import { Video } from './components/Form';
import { Username } from './components/names';
import {useEffect, useState, useRef} from 'react';
import Webcam from 'react-webcam';
function App() {
  const ApiKey = "c28528763c8b4a7c8f0a000f4f602c8e";
  const [addWork, setaddWork] = useState('');
  const [cameraOn, setcameraOn] = useState("none");
  const webRef = useRef(null);
  const videoConstraints = {
    facingMode: { exact: "environment" }
  };
  let img = null;
  const TakePhoto = () => {
    img = webRef.current.getScreenshot();
    setaddWork(img);
  }
  const successCallback = (position) => {
    const {latitude, longitude} = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${ApiKey}`)
    .then(response=>response.json())
    .then(data=>{
      let obj = data;
      alert(data.results[0].formatted);
      console.log(latitude+","+longitude);
    })
  }; 
  const errorCallback = (error) => {
    console.log(error);
  };
  return (
    <div>
      <Webcam ref={webRef} audio={false} className={"preview"} style={{display: cameraOn}} videoConstraints={videoConstraints} />
      <Camerabtn style={{display: cameraOn}} onclickHandle={()=>{
        TakePhoto()
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        setcameraOn("none");
      }}/>
      <Username margin={5} name={"James Bond"}/>

      <Addbtn onclickHandle={()=>{
        setcameraOn("block");
        
        // (async () => {
        //   const rawResponse = await fetch('https://photobase-a34b5-default-rtdb.europe-west1.firebasedatabase.app/data/-NOZVnHqO2sU4YAxle3B.json', {
        //     method: 'POST',
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({userworks:[{
        //       img:addWork,
        //       date:Date.now(),
        //       location: 
        //     }]})
        //   });
        //   const content = await rawResponse.json();
        
        //   console.log(content);
        // })();
      }}/>
      <ul style={{marginLeft: 5 + "vw", marginTop: 5/2 + "vw"}}>
        <li><img src={addWork} alt='Taken photo'/></li>
      </ul>
    </div>
  );
}

export default App;

import './App.css';
import { Addbtn, Camerabtn } from './components/buttons';
import { Video } from './components/Form';
import { Username } from './components/names';
import {useEffect, useState, useRef} from 'react';
import Webcam from 'react-webcam';

function App() {
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
    console.log(img);
  }
  return (
    <div>
      <Webcam ref={webRef} audio={false} className={"preview"} style={{display: cameraOn}} videoConstraints={videoConstraints} />
      <Camerabtn style={{display: cameraOn}} onclickHandle={()=>{
        TakePhoto()
        setcameraOn("none");
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

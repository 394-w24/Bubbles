import React, { useState } from "react";
import Webcam from "react-webcam";
import { storage } from "../Utilities/firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import Header from "./Header";
import NavBar from "./NavBar";
import "./Scanner.css";
import "./Translations.css";
import DummyTranslations from "./DummyTranslation";
import DummyInstructions from "./DummyInstructions";
import Loading from "./Loading";
import WashInstructions from "./WashInstructions";
import DryInstructions from "./DryInstructions";
import { getInstructions } from "./FunctionCallTest";
import { TrySharp } from "@mui/icons-material";
import data from "../../data/symbol.json";

const transformTranslations = (arr) => {
  // console.log(`called transform translations with ${arr}`);
  // console.log("transform", arr);
  try {
    const convertedArray = arr.map(x => {
      const num = Number(x);
      if (isNaN(num)) { // Check if the conversion result is NaN
        throw new Error(`Cannot convert "${x}" to a Number`);
      }
      return num;
    });
    return convertedArray;
  } catch(error) {
    console.error('Error while processing: ', error.message);
    //return arr.constructor === Array ? arr.join(", ") : arr;
    return arr.join(", ");
  }
}

const Translations = ({translations}) => {
  // console.log(translations);
  const arrayOfSymbolArrays = Object.keys(data).map(header => data[header]);
  const arrayOfSymbols = [].concat(...arrayOfSymbolArrays);
  const requestedSymbols = arrayOfSymbols.filter(symbol => translations.includes(symbol.id));
  // console.log(requestedSymbols);
  return (<div className="translations">
    <ul>
    {requestedSymbols.map((symbol) => (
        <li key={symbol.id}>
          <img src={symbol.url} alt={symbol.alt} />
          {symbol.translation}
        </li>
      ))}
    </ul>
    </div>);
}

const Scanner = ({ user }) => {
  const [image, setImage] = useState("");
  const webcamRef = React.useRef(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [processingImage, setProcessingImage] = useState(false);
  const [translations, setTranslations] = useState([]);

  // example usage: 
  // getInstructions("https://t3.ftcdn.net/jpg/00/95/78/00/240_F_95780051_BQyIHBd1VfdpBeN9YSGMcWFuNC8DZ5Cb.jpg");

  const dummyProcessImage = () => {
    setImageUploaded(true);
    setTimeout(() => {
      setImageLoading(false);
    }, 3000);
  };

  // function to capture image from Webcam
  // const capture = React.useCallback(() => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   setImage(imageSrc);
  //   // directly upload the image to Firebase
  //   console.log(imageSrc);
  //   // uploadImageToFirebase(imageSrc);
  // }, [webcamRef]);

  const displayTranslations = (translations) =>{
    // Image Processed
    setProcessingImage(false);
    // console.log("displayTranslations", translations);
    if (typeof translations === "string"){
      alert(translations);
    } else {
      setTranslations(translations);
    }
  }

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    // directly upload the image to Firebase
    try{
      setProcessingImage(true);
      const translations = await getInstructions(imageSrc);
      displayTranslations(transformTranslations(translations));
    } catch (error) {
      console.error('Error while processing image:', error);
    }
  }

  // function to handle file upload (e.g., from input field)
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    // uploadFileToFirebase(file);
  };

  const base64StringToBlob = (base64, contentType) => {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  // Upload image to Firebase
  const uploadImageToFirebase = async (imageSrc) => {
    // Convert imageSrc to file/blob here and upload to Firebase
    // Implementation depends on your Firebase storage setup
    // Convert the base64 string to a Blob
    const imageBlob = base64StringToBlob(imageSrc, "image/jpeg");

    // Create a reference to 'images/fileName.jpg' in Firebase Storage
    const storageReference = storageRef(
      storage,
      `images/${new Date().toISOString()}.jpg`
    );

    try {
      // Upload the Blob to Firebase Storage
      const snapshot = await uploadBytes(storageReference, imageBlob);
      console.log("Uploaded a blob or file!", snapshot);

      // Optionally, get the download URL of the uploaded file
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("File available at", downloadURL);
      // You can store this URL in your database or state to display the image later
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  // Upload file to Firebase
  const uploadFileToFirebaseStorage = async (file) => {
    const storageReference = storageRef(storage, `images/${file.name}`);
    try {
      const snapshot = await uploadBytes(storageReference, file);
      console.log("Uploaded a blob or file!", snapshot);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <div className="scanner">
      <Header user={user} />

      {translations.length > 0 ?
      <>
      <div className="scanner-translations-container">
        <Translations translations={translations} />
      </div>
      <button onClick={() => {setImage(""); setTranslations([]);}}>Retake Image</button>
      </>
      : (processingImage ? <Loading /> : (image ? (
        <div>
          <img src={image} alt="Captured" />
          <button onClick={() => setImage("")}>Retake Image</button>
        </div>
      ) : (
        <div className="scanner-webcam-div">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="scanner-webcam"
          />
          <div className="scanner-webcam-controls">
            <button onClick={capture}>Capture Photo</button>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
          </div>
        </div>
      ))    )}


      {/* {image ? (
        <div>
          <img src={image} alt="Captured" />
          <button onClick={() => setImage("")}>Retake Image</button>
        </div>
      ) : (
        <div className="scanner-webcam-div">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="scanner-webcam"
          />
          <div className="scanner-webcam-controls">
            <button onClick={capture}>Capture Photo</button>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
          </div>
        </div>
      )} */}

      {/* {imageUploaded ? (
        <div className="scanner-content">
          {imageLoading ? (
            <Loading />
          ) : (
            <>
              <DummyTranslations />
              <WashInstructions />
              <DryInstructions />
            </>
          )}
        </div>
      ) : (
        <div className="scanner-webcam-div">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="scanner-webcam"
            videoConstraints={{
              facingMode: "environment", // This tells the browser to use the rear camera by default
            }}
          />
          <div className="scanner-webcam-controls">
            <button onClick={dummyProcessImage}>Capture Photo</button>
            <input type="file" accept="image/*" onChange={dummyProcessImage} />
          </div>
        </div>
      )} */}

      <NavBar />
    </div>
  );
};

export default Scanner;

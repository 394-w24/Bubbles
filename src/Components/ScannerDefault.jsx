import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import Header from "./Header";
import NavBar from "./NavBar";
import "./Scanner.css";
import "./Translations.css";
import Loading from "./Loading";
import { getInstructions } from "./FunctionCallTest";
import data from "../../data/symbol.json";

const transformTranslations = (arr) => {
  // console.log(`called transform translations with ${arr}`);
  // console.log("transform", arr);
  try {
    const transformedArray = arr.map((x) => {
      const num = Number(x);
      if (isNaN(num)) {
        // Check if the conversion result is NaN
        throw new Error(`Cannot convert "${x}" to a Number`);
      }
      return num;
    });
    return transformedArray;
  } catch (error) {
    console.error("Error while processing: ", error.message);
    //return arr.constructor === Array ? arr.join(", ") : arr;
    return arr.join(", ");
  }
};

const Translations = ({ translations }) => {
  // console.log(translations);
  const arrayOfSymbolArrays = Object.keys(data).map((header) => data[header]);
  const arrayOfSymbols = [].concat(...arrayOfSymbolArrays);
  const requestedSymbols = arrayOfSymbols.filter((symbol) =>
    translations.includes(symbol.id)
  );
  // console.log(requestedSymbols);
  return (
    <div className="translations">
      <ul>
        {requestedSymbols.map((symbol) => (
          <li key={symbol.id}>
            <img src={symbol.url} alt={symbol.alt} />
            {symbol.translation}
          </li>
        ))}
      </ul>
    </div>
  );
};

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const ScannerDefault = ({ user }) => {
  const [image, setImage] = useState("");
  const webcamRef = useRef(null);
  const [processingImage, setProcessingImage] = useState(false);
  const [translations, setTranslations] = useState([]);

  const displayTranslations = (translations) => {
    // Image Processed
    setProcessingImage(false);
    // console.log("displayTranslations", translations);
    if (typeof translations === "string") {
      alert(translations);
      setImage("");
      setTranslations([]);
    } else {
      setTranslations(translations);
    }
  };

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    try {
      setProcessingImage(true);
      const translations = await getInstructions(imageSrc);
      displayTranslations(transformTranslations(translations));
      setImage(imageSrc);
    } catch (error) {
      console.error("Error while processing image:", error);
    }
  };

  // function to handle file upload (e.g., from input field)
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    // console.log(file);
    try {
      setProcessingImage(true);
      const base64Image = await getBase64(file);
      const translations = await getInstructions(base64Image);
      displayTranslations(transformTranslations(translations));
      setImage(base64Image);
    } catch (error) {
      console.error("Error while processing image:", error);
    }
  };

  return (
    <div className="scanner">
      <Header user={user} />

      {image && translations.length > 0 ? (
        <div className="scanner-display-image-and-translations">
          <img src={image} alt="Captured" />
          <div className="scanner-translations-container">
            <Translations translations={translations} />
          </div>
          <div className="scanner-webcam-controls">
            <button
              onClick={() => {
                setImage("");
                setTranslations([]);
              }}
            >
              Retake Image
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setTranslations([]);
                setImage("");
                handleFileUpload(e);
              }}
            />
          </div>
        </div>
      ) : processingImage ? (
        <Loading />
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
      )}

      <NavBar />
    </div>
  );
};

export default ScannerDefault;

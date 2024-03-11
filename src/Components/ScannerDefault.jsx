import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import "./Scanner.css";
import "./Translations.css";
import Loading from "./Loading";
import data from "../../data/symbol.json";
// import { getIcos } from "./AccessFuncs";
import { getInstructions } from "./FunctionCalls";

var done = false;

export const transformTranslations = (arr) => {
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

export const Translations = ({ translations }) => {
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

export const getBase64 = (file) => {
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
    done = true;
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
      return -1;
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

  const [scaleX, setScaleX] = useState(1);
  const mirrorCam = () => {
    setScaleX(-scaleX);
  }


  return (
    <div className="scanner">
      {translations.length > 0 ? (
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
            style = {{transform: `scaleX(${scaleX})`}}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="scanner-webcam"
            videoConstraints={{

                facingMode: "environment", // This tells the browser to use the rear camera by default
            }}
          />
          <div className="scanner-webcam-controls">
            <div className="scanner-webcam-buttons">
            <button data-testid="capture button" data-cy="capture" onClick={capture}>Capture Photo</button>
            <button onClick={mirrorCam}>Mirror Cam</button>
            </div>

            <h3>
                Or, upload a photo from your camera reel below
            </h3>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
            
          </div>
        </div>
      )}
    </div>
  );
};

export {done};
export default ScannerDefault;

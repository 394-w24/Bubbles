import Header from "./Header";
import NavBar from "./NavBar";
import Loading from "./Loading";
import { getInstructions } from "./FunctionCallTest";
import check from "../Utilities/check.mjs";
import "./Scanner.css";
import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";

const transformSymbolIds = (arr) => {
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

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const CompareAndDisplay = ({ images, translations }) => {
  const comparisonResult = check(translations[0], translations[1]);
  return (
    <div>
      <div>
        {comparisonResult.washCapatible ? (
          <>
            <h4>You can wash these together with the following setting:</h4>
            <ul>
              <li>{comparisonResult.wash}</li>
            </ul>
          </>
        ) : (
          <h4>You can not wash these together</h4>
        )}
      </div>
      <div>
        {comparisonResult.dryCapatible ? (
          <>
            <h4>You can dry these together with the following setting:</h4>
            <ul>
              <li>{comparisonResult.dry}</li>
            </ul>
          </>
        ) : (
          <h4>You can not dry these together</h4>
        )}
      </div>
    </div>
  );
};

const ScannerCompatibility = ({ user }) => {
  const [images, setImages] = useState([]);
  const webcamRef = useRef(null);
  const [processingImage, setProcessingImage] = useState(false);
  const [translations, setTranslations] = useState([]);

  const saveTranslation = (translation, image) => {
    // Image Processed
    setProcessingImage(false);
    // console.log("displayTranslations", translations);
    if (typeof translation === "string") {
      alert(translation);
    } else {
      setTranslations((translations) => [...translations, translation]);
      setImages((prevImages) => [...prevImages, image]);
    }
  };

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    try {
      setProcessingImage(true);
      const symbolIds = await getInstructions(imageSrc);
      saveTranslation(transformSymbolIds(symbolIds), imageSrc);
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
      const symbolIds = await getInstructions(base64Image);
      saveTranslation(transformSymbolIds(symbolIds), base64Image);
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
      <Header user={user} />
      {!processingImage && images.length > 0 && (
        <div className="scanner-compatibilty-images">
          {images.map((image) => (
            <img key={image} src={image}></img>
          ))}
        </div>
      )}
      {translations.length > 1 ? (
        <div className="scanner-compatibility-comparison-result">
          <CompareAndDisplay images={images} translations={translations} />
          <button
            onClick={() => {
              setImages([]);
              setTranslations([]);
            }}
          >
            Re-Compare
          </button>
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
            <button onClick={capture}>Capture Photo</button>
            <button onClick={mirrorCam}>Mirror Cam</button>
            </div>
            <h3>
                Or, upload a photo from your camera reel below
            </h3>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
            
          </div>
        </div>
      )}
      <NavBar />
    </div>
  );
};

export default ScannerCompatibility;

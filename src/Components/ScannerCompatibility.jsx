import Loading from "./Loading";
import { getInstructions } from "./FunctionCalls";
import check from "../Utilities/check.mjs";
import { transformSymbolIds, getBase64 } from "../Utilities/scanner";
import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import "./Scanner.css";
import "./Instructions.css";

const CompareAndDisplay = ({ translations }) => {
  const comparisonResult = check(translations[0], translations[1]);
  return (
    <div className="instructions">
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

  // Function to handle file upload (e.g., from input field)
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
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
  };

  return (
    <div className="scanner">
      {!processingImage && images.length > 0 && (
        <div className="scanner-compatibilty-images">
          {images.map((image, i) => (
            <img key={`${image}-${i}`} src={image}></img>
          ))}
        </div>
      )}
      {translations.length > 1 ? (
        <div className="scanner-compatibility-comparison-result">
          <CompareAndDisplay translations={translations} />
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
            style={{ transform: `scaleX(${scaleX})` }}
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
            <h3>Or, upload a photo from your camera reel below</h3>

            <input type="file" accept="image/*" onChange={handleFileUpload} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ScannerCompatibility;

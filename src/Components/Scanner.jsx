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
import DummyTranslations from "./DummyTranslation";
import DummyInstructions from "./DummyInstructions";
import Loading from "./Loading";

const Scanner = ({ user }) => {
  const [image, setImage] = useState("");
  const webcamRef = React.useRef(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const dummyProcessImage = () => {
    setImageUploaded(true);
    setTimeout(() => {
      setImageLoading(false);
    }, 3000);
  };

  // function to capture image from Webcam
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    // directly upload the image to Firebase
    uploadImageToFirebase(imageSrc);
  }, [webcamRef]);

  // function to handle file upload (e.g., from input field)
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    uploadFileToFirebase(file);
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
          <div className="scanner-webcam-controls">
            <button onClick={dummyProcessImage}>Capture Photo</button>
            <input type="file" accept="image/*" onChange={dummyProcessImage} />
          </div>
        </div>
      )} */}

      {imageUploaded ? (
        <div className="scanner-content">
          {imageLoading ? (
            <Loading />
          ) : (
            <>
              <DummyTranslations />
              <DummyInstructions />
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
          />
          <div className="scanner-webcam-controls">
            <button onClick={dummyProcessImage}>Capture Photo</button>
            <input type="file" accept="image/*" onChange={dummyProcessImage} />
          </div>
        </div>
      )}

      <NavBar />
    </div>
  );
};

export default Scanner;

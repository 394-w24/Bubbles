import { getFunctions, httpsCallable } from "firebase/functions";
import { firebase } from "../Utilities/firebase";

const callFirebaseFunction = url => {
    const functions = getFunctions();
    const callableRequestExample = httpsCallable(functions, 'onRequestExample');

    callableRequestExample(url).then((result) => {
        console.log(result.data.output);
    }).catch((error) => {
        console.log(`error: ${JSON.stringify(error)}`);
    });
}

function FunctionCallTester(url) {
    const imageUrl = url; // Example image URL
    fetch('https://us-central1-bubbles-7ba5c.cloudfunctions.net/onRequestExample', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: imageUrl }),
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response data from the Cloud Function
            console.log(data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error likely due to cors:', error);
        });

}

export { FunctionCallTester, callFirebaseFunction };

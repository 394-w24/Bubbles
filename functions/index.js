/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// Import required modules
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Configuration, OpenAIApi } = require("openai");

// Initialize Firebase app
admin.initializeApp();

//EXAMPLE USAGE
// JavaScript to upload the image and send the URL to Firebase Functions
// function uploadImage(event) {
//     const file = event.target.files[0];
//     const storageRef = firebase.storage().ref(`images/${file.name}`);
//     storageRef.put(file).then((snapshot) => {
//       snapshot.ref.getDownloadURL().then((url) => {
//         // Now we have the URL, send it to Firebase Functions
//         fetch('/your-firebase-function-url', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ imageUrl: url }),
//         })
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(error => console.error('Error:', error));
//       });
//     });
//   }

// Define the Cloud Function
exports.onRequestExample = functions.https.onRequest(async (req, res) => {
  try {
    // Check for POST request
    if (req.method !== "POST") {
      res.status(405).send("Only POST requests are accepted");
      return;
    }

    // Get the OpenAI API key from environment variables
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      throw new Error("The OPENAI_API_KEY environment variable is not set.");
    }

    // Initialize OpenAI client
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // Parse the request body to get the image URL
    const requestJson = req.body;
    if (!requestJson || !requestJson.imageUrl) {
      res.status(400).send("No image URL provided.");
      return;
    }
    const imageUrl = requestJson.imageUrl;

    // Perform the API call
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "You are a laundry expert who has excellent knowledge of laundry care symbols. Please analyze the image and output what each laundry symbol means as a direct translation. Please format the output as just the translations separated by newlines.",
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
                detail: "low",
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    });

    const symbols = chatCompletion.data.choices[0].message.content.split("\n");

    // Return the symbols as the response
    res.send(symbols);
  } catch (e) {
    // Handle any errors that occur during the API call
    res.status(500).send(`An error occurred: ${e.message}`);
  }
});

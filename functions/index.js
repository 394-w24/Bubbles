/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onCall, HttpsError } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// Import required modules
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Configuration, OpenAIApi } = require("openai");

// Initialize Firebase app
admin.initializeApp();

exports.getAPIkey = onCall(
  { cors: true },
  (req) => {
    // if (!OPENAI_API_KEY) {
    //   throw new Error("The OPENAI_API_KEY environment variable is not set.");
    // }
    return { key: "INSERT KEY HERE OR OTHERWISE FIND WAY TO GET KEY" }
  });


// Define the Cloud Function
exports.onRequestExamplev2 = onCall(
  { cors: true },
  (req) => {

    try {
      // Check for POST request
      // if (req.method !== "POST") {
      //   res.status(405).send("Only POST requests are accepted");
      //   return;
      // }

      // Get the OpenAI API key from environment variables
      const OPENAI_API_KEY = functions.config().openai.key;
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
      const chatCompletion = openai.createChatCompletion({
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

      // symbols = "1234567"

      // Return the symbols as the response
      return {
        dan: symbols
      }
    } catch (e) {
      // Handle any errors that occur during the API call
      throw new HttpsError(500, `hi ${e.message}`);
    }
    // });
  });
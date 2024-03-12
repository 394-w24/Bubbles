# Laundry Helper Setup

## Description

An app to identify laundry tags and check washing and drying compatibility.

## Getting Started

### Dependencies

* Node.js - Download and install Node.js and npm from [here](https://nodejs.org/en/download/)

### Downloading and Installing

1. Download the repo to your computers. 
    - The usual way is via cloning the repository (repo): `git clone https://github.com/394-w24/Bubbles.git`.
    - We recommend using [github desktop](https://desktop.github.com/) instead to make things a bit easier to manage.
2. Navigate into the project directory: `cd FILEPATH_TO_PROJECT`
3. Install the dependencies: `npm install`

### Running the app

1. Start the app in the development mode: `npm start`
2. Open the lochalhost link (typically [localhost:5173](http://localhost:5173)) to view it in the browser.

## Setting up Firebase

1. Create a Firebase account: Go to the Firebase console (https://console.firebase.google.com/) and sign up.
2. Create a new project in the Firebase console.
3. Set up Firebase Hosting: Run `firebase init` in the project directory and follow the prompts to set up hosting.
4. Set up Realtime Database: In the Firebase console, go to "Database" and then "Create Database". Choose the "Realtime Database" option and follow the prompts.
5. Set up Firebase Functions v2: Run `firebase init functions` in the project directory and follow the prompts. Make sure to choose the "Functions v2" option.
6. Set up Firebase Storage: In the Firebase console, go to "Storage" and then "Get Started". Follow the prompts to set up storage.
7. In the project settings, under the "General" tab scroll down to "Your apps". Then click "Generate new private key" to download a JSON file with your Firebase configuration data.
8. Copy whats in the curly braces after `const firebaseConfig =` (apiKey, authDomain, ... measurementId). Then, go to `src\Utilities\firebase.js` and pate that information under the same `const firebaseConfig =` section.

## Setting up ChatGPT API

1. Create an account on the [ChatGPT website](https://chatgpt.com/)
2. In your account dashboard, navigate to the API section and generate a new API key (note that this is a paid process, and the specific actions might change over time).
3. In the `./functions/` folder (note, not to be confused with the `./functions/functions` folder), create a file called `/.env`, and paste in `OPENAI_API_KEY=PLACE_CHATGPT_API_KEY_HERE` on the first line. Replace PLACE_CHATGPT_API_KEY_HERE with the actual API key you got from above.
4. Deploy your functions (see below at [Deploying Firebase Functions](#deploying-firebase-functions) ).

## Building the App

To build a production version of your app, run the following command in the project directory:
```
npm run build
```
This will create a `build` directory with a production-ready version of your app. 

## Hosting the App on Firebase

To host the app on Firebase, follow these steps:

1. Make sure you have set up Firebase Hosting as described in the previous section.
2. Run `npm run build` to create a production version of your app.
3. Run `firebase deploy` to deploy your app to Firebase Hosting.
4. Once the deployment is complete, your app will be live at the hosting URL displayed in the Firebase console.

Note: If you want to host your app at a custom domain, you can set this up in the Firebase Hosting dashboard.

## Deploying Firebase Functions

To deploy your Firebase Functions, follow these steps:

1. Make sure you have set up Firebase Functions as described in the previous section.
2. Write your functions in the `functions` directory of your project.
3. Run `firebase deploy --only functions` to deploy your functions to Firebase. Alternatively use `firebase deploy --only functions:myFunction` to specifically deploy/update only the function `myFunction`.
4. Once the deployment is complete, your functions will be live and can be invoked using their HTTPS trigger URL.


## Additonal Notes

- You'll  want to make sure any new images you add are copied into the `./public` folder.

## Credits

React-Vitest built and maintained by [Chris Riesbeck](https://github.com/criesbeck).

Inspired by [SafdarJamal/vite-template-react](https://github.com/SafdarJamal/vite-template-react).
Expanded to include Vitest and some sample tests.

Thanks to Rich Harris for [degit](https://www.npmjs.com/package/degit).

Gitignore file created with [the Toptal tool](https://www.toptal.com/developers/gitignore/api/react,firebase,visualstudiocode,macos,windows).


## License

This project is licensed under the terms of the [MIT license](./LICENSE).


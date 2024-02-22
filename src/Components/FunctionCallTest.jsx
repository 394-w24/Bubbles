import { getFunctions, httpsCallable } from "firebase/functions";
import { firebase } from "../Utilities/firebase";
import OpenAI from "openai";
const callFirebaseFunction = async (url) => {

    const functions = getFunctions(firebase);
    const onRequestExample2 = httpsCallable(functions, 'getAPIkey');

    const OPENAI_API_KEY = "a"

    onRequestExample2().then((result) => {

        getGPT(result.data.key, url)
        // Perform the API call

    }).catch((error) => {
        console.error(`error: please input api key, currently removed for security reasons and to prevent excessive use of tokens`);
    });

    console.log(1)
    // // console.log(symbols)
}

const getGPT = async (OPENAI_API_KEY, imageUrl) => {

    const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
    });
    const chatCompletion = await openai.chat.completions.create({
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
    const symbols = chatCompletion.choices[0].message;
}


function FunctionCallTester(url) {
    const imageUrl = url; // Example image URL
    fetch('https://onrequestexample2-zbtki6uvnq-uc.a.run.app', {
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
            console.log(error)
            console.error('Error likely due to cors:', error);
        });


    // axios.get(`https://cors-anywhere.herokuapp.com/https://us-central1-bubbles-7ba5c.cloudfunctions.net/onRequestExample`, {
    //     headers: {
    //     }
    // })
    //     .then(response => {
    //         const $ = cheerio.load(response.data);
    //     });


};


export { FunctionCallTester, callFirebaseFunction };

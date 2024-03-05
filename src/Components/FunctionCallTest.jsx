import { getFunctions, httpsCallable } from "firebase/functions";
import { firebase } from "../Utilities/firebase";
import OpenAI from "openai";

// const getInstructions = async (url) => {

//     const functions = getFunctions(firebase);
//     const onRequestExample2 = httpsCallable(functions, 'getAPIkey');
//     console.log(1)

//     onRequestExample2().then((result) => {

//         var key = result.data["res"]

//         // console.log(key)

//         // var res = "7, 14, 17, 29, 34"
//         // console.log(res.split(", "))

//         getGPT(key, url).then((res) => {
//             // Perform the API call
//             console.log(res)
//             console.log(1)
//             return res.split(", ")
//         })

//     }).catch((error) => {
//         console.error(`error: ${error}`);
//     });

//     console.log(1)
//     // // console.log(symbols)
// }

const getInstructions = async (url) => {
  if (!url){
    console.log(url)
    return ["no url/image provided"]
  }
  try {
    const functions = getFunctions(firebase);
    const onRequestExample2 = httpsCallable(functions, "getAPIkey");
    console.log(1);


    // Await the call to onRequestExample2
    const result = await onRequestExample2();
    var key = result.data["res"];

    // Now await the result of getGPT
    const res = await getGPT(key, url);
    console.log(res);
    console.log(1);

    // This return value will be wrapped in a Promise because the function is async
    return res.split(",");
  } catch (error) {
    console.error(`error: ${error}`);
    // It's usually a good idea to rethrow the error or handle it accordingly
    throw error; // Rethrow or return an alternative value
  }
};

const getGPT = async (OPENAI_API_KEY, imageUrl) => {
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `You are a laundry expert who has excellent knowledge of laundry care symbols. Please analyze the image and output *just* the id values corresponding to the direct translation of each laundry symbol, using the following tables for reference, and do NOT output anything else, except if you cannot read it, in that case output "There was an error reading". :
                        {
                            "washing":[
                                { "id": 0, "translation": "Machine Wash at or below 95°C/203°F!" },
                                { "id": 1, "translation": "Machine Wash at or below 70°C/160°F!" },
                                { "id": 2, "translation": "Machine Wash at or below 60°C/140°F!" },
                                { "id": 3, "translation": "Permanent Press Machine Wash at or below 60°C/140°F!" },
                                { "id": 4, "translation": "Machine Wash at or below 40°C/105°F!" },
                                { "id": 5, "translation": "Permanent Press Machine Wash at or below 40°C/105°F!" },
                                { "id": 6, "translation": "Delicate Machine Wash at or below 40°C/105°F!" },
                                { "id": 7, "translation": "Machine Wash at or below 30°C/85°F!" },
                                { "id": 8, "translation": "Permanent Press Machine Wash at or below 30°C/85°F!" },
                                { "id": 9, "translation": "Delicate Machine Wash at or below 30°C/85°F!" },
                                { "id": 10, "translation": "Hand Wash Only!" },
                                { "id": 11, "translation": "Do not Wash!" }
                        
                            ],
                            "bleaching":[
                                { "id": 12, "translation": "Allowed for both chlorine and oxygen bleach" },
                                { "id": 13, "translation": "Allowed for non chlorine bleach" },
                                { "id": 14, "translation": "Allowed for non chlorine bleach" }  
                            ],
                            "drying":[
                                { "id": 15, "translation": "Tumble dry at medium heat (not exceeding 60°C/140°F!)" },
                                { "id": 16, "translation": "Tumble dry at low heat (not exceeding 40°C/104°F!)" },
                                { "id": 17, "translation": "Do not tumble dry. Air dry only" },
                                { "id": 18, "translation": "Drip Dry" },
                                { "id": 19, "translation": "Do not wring. Drip Dry" },
                                { "id": 20, "translation": "Dry Flat" },
                                { "id": 21, "translation": "Do not wring. Dry Flat" },
                                { "id": 22, "translation": "Drip dry in shade" },
                                { "id": 23, "translation": "Do not wring. Drip dry in shade" },
                                { "id": 24, "translation": "Dry Flat. Dry in shade" },
                                { "id": 25, "translation": "Do not wring. Dry Flat. Dry in shade" }
                            ],
                            "ironing":[
                                { "id": 26, "translation": "Hot Iron. Max Temp. 200°C/390°F" },
                                { "id": 27, "translation": "Warm Iron. Max Temp. 150°C/300°F" },
                                { "id": 28, "translation": "Cool Iron. Max Temp. 110°C/230°F" },
                                { "id": 29, "translation": "Do not Iron" }
                            ],
                            "professionalCleaning":[
                                { "id": 30, "translation": "Dry clean, tetrachloroethylene(PCE) only" },
                                { "id": 31, "translation": "Gentle cleaning with PCE" },
                                { "id": 32, "translation": "Dry clean, hydrocarbon solvents(HCS) only" },
                                { "id": 33, "translation": "Gentle cleaning with HCS" },
                                { "id": 34, "translation": "Do not dry" },
                                { "id": 35, "translation": "Professional wet cleaning" },
                                { "id": 36, "translation": "Gentle wet cleaning" },
                                { "id": 37, "translation": "Very gentle wet cleaning" },
                                { "id": 38, "translation": "Do not wet clean" }
                            ]
                        
                        }.`,
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
  const symbols = chatCompletion.choices[0].message.content;
  return symbols;
};

export { getInstructions };

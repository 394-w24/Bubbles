import { getFunctions, httpsCallable } from "firebase/functions";
import { firebase } from "../Utilities/firebase";
import OpenAI from "openai";
const getInstructions = async (url) => {

    const functions = getFunctions(firebase);
    const onRequestExample2 = httpsCallable(functions, 'getAPIkey');
    console.log(1)

    onRequestExample2().then((result) => {

        var key = result.data["res"]
        // console.log(key);
        // console.log("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");
        getGPT(key, url).then((res) => {
            // Perform the API call
            console.log(res)
            console.log(1)
            return res.split("\n")
        })

    }).catch((error) => {
        console.error(`error: ${error}`);
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
    const symbols = chatCompletion.choices[0].message.content;
    return symbols;
}

export { getInstructions };

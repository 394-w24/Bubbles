# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`
import os
from openai import OpenAI
import json

from firebase_functions import https_fn
from firebase_admin import initialize_app

initialize_app()


@https_fn.on_request()
def on_request_example(req: https_fn.Request) -> https_fn.Response:
    
    try:
        OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]
        # api_key = os.environ.get("OPENAI_API_KEY")
        # if not api_key:
        #     raise ValueError("The OPENAI_API_KEY environment variable is not set.")

        #EXPECTING JSON IN FORMAT:
        # {
        #     "imageUrl": "https://example.com/path/to/image.jpg"
        # }

        client = OpenAI(api_key=OPENAI_API_KEY)

        # Parse the request body to get the image URL
        request_json = req.get_json()
        if not request_json or 'imageUrl' not in request_json:
            return https_fn.Response("No image URL provided.", status=400)
        image_url = request_json['imageUrl']

        chat_completion = client.chat.completions.create(
            model="gpt-4-vision-preview",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "You are a laundry expert who has excellent knowledge of laundry care symbols. Please analyze the image and output what each laundry symbol means as a direct translation. Please format the output as just the translations separated by newlines."},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": image_url,
                                "detail": "low"
                            },
                        },
                    ],
                }
            ],
            max_tokens=300,
        )

        symbols = chat_completion.choices[0].message.content.split("\n")

        print(symbols)

    # Return the symbols as the response
        return https_fn.Response(str(symbols))
    
    except Exception as e:
        # Handle any errors that occur during the API call
        return https_fn.Response(f"An error occurred: {str(e)}", status=500)
    #['Machine wash at 30°C on a gentle cycle', 
    # 'Do not bleach', 
    # 'Iron at low temperature', 
    # 'Dry clean with any solvent except trichloroethylene', 
    # 'Dry flat']


    #firebase functions:config:set someservice.key="THE_API_KEY"




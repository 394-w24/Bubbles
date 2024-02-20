import os
from openai import OpenAI

# Make sure to set the environment variable OPENAI_API_KEY with your actual API key beforehand
OPENAI_API_KEY = "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"
# api_key = os.environ.get("OPENAI_API_KEY")
# if not api_key:
#     raise ValueError("The OPENAI_API_KEY environment variable is not set.")

client = OpenAI(api_key=OPENAI_API_KEY)

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
                        "url": "https://www.persil.com/images/h0nadbhvm6m4/d43079688bfbb1ac185fc333595ef482/15beb6138d5aec8d609090f5e4c4e761/aHR0cHNfX19hc3NldC1hbWVyaWNhcy51bmlsZXZlcnNvbHV0aW9ucy5jb21fY29udGVudF9kYW1fdW5pbGV2ZXJfZGlydF9pc19nb29kX2dsb2JhbF9nZW5lcmFsX2ltYWdlX2xhdW5kcnlfZmFicmljc19jbGVhbmluZy5qcGc/1280w-853h/a-clothing-label-showing-laundry-symbols-with-their-instructions..jpg",
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
#['Machine wash at 30°C on a gentle cycle', 
# 'Do not bleach', 
# 'Iron at low temperature', 
# 'Dry clean with any solvent except trichloroethylene', 
# 'Dry flat']

from fastapi import FastAPI, Request
import numpy as np
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

def main():
    pass

app.mount("/static", StaticFiles(directory="static"), name="static")

#homepage, displays initial data plot and a prompt to call the model
@app.get("/")
def read_root():
    pass

templates = Jinja2Templates(directory="templates")

#the result page, runs main() and grabs the predictions to display in a table
@app.get("/run_model", response_class=HTMLResponse)
def run_model(request: Request):
    pass
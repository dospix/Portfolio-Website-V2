from flask import Flask, request
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
import mimetypes
import requests

mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("text/css", ".css")

app = Flask(__name__, static_folder="../frontend/dist", static_url_path="")
CORS(app)


@app.route("/")
@cross_origin()
def serve_react():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/api-project/submit", methods=["POST"])
@cross_origin()
def fetch_books_from_google_api():
    form_response_json = request.get_json()
    # "Alice Wonderland" -> "intitle:Alice+intitle:Wonderland"
    title_keywords = "+".join([f"intitle:{word}" for word in form_response_json["titleKeywords"].split()])
    author_keywords = "+".join([f"inauthor:{word}" for word in form_response_json["authorKeywords"].split()])
    subjects = "+".join([f"subject:{key}" for key in list(form_response_json.keys()) if key not in ["titleKeywords", "authorKeywords", "previewFilter"] and form_response_json[key] == True])
    preview_filter = "" if form_response_json['previewFilter'] == "none" else f"&filter={form_response_json['previewFilter']}"
    
    if author_keywords:
        title_keywords += "+"
    if subjects:
        if author_keywords:
            author_keywords += "+"
        else:
            title_keywords += "+"

    returned_fields = "&fields=items(id, volumeInfo/title, volumeInfo/subtitle, volumeInfo/authors, volumeInfo/description, \
                    volumeInfo/imageLinks/thumbnail, volumeInfo/ratingsCount, volumeInfo/averageRating, accessInfo/viewability, volumeInfo/previewLink)"
    google_api_url = f"https://www.googleapis.com/books/v1/volumes?q={title_keywords}{author_keywords}{subjects}{preview_filter}{returned_fields}"

    gzip_headers = {
        "Accept-Encoding": "gzip",
        "User-Agent": "FlaskApp (gzip)"
    }
    response = requests.get(google_api_url, headers=gzip_headers).json()

    return response

if __name__ == "__main__":
    app.run()

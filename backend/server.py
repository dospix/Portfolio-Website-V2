from flask import Flask
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
import mimetypes

mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')

app = Flask(__name__, static_folder="../frontend/dist", static_url_path="")
CORS(app)


@app.route('/')
@cross_origin()
def serve_react():
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    print(app.static_folder)
    app.run()

import os

from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

channels_list = {0: "default"}

@app.route("/", methods=['GET', 'POST'])
def index():
    print("template reload")
    return render_template("index.html", channels_list=channels_list)

@socketio.on('submit channel')
def handle_channels(data):
    count = len(channels_list)
    channel_new = data["channel-name"]

    if channel_new in list(channels_list.values()):
        emit("channel name", False, broadcast=True)
    else:
        channels_list[count] = channel_new
        emit("channel name", channels_list, broadcast=True)


if __name__ == '__main__':
    socketio.run(app, debug=True)

import os

from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

channels_list = {0: "default"}

@app.route("/")
def index():
    print("========== channels list ============")
    print(channels_list)
    return render_template("index.html", channels_list=channels_list)

@socketio.on("submit channel")
def channel(data):
    print(data)
    count = len(channels_list)
    channel_new = data["channel-name"]
    channels_list[count] = channel_new
    print(channels_list)
    emit("channel name", channels_list, broadcast=True)

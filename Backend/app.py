from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import secrets
app = Flask(__name__)
secret_key = secrets.token_urlsafe(16)
app.config['SECRET_KEY'] = secret_key
socketio = SocketIO(app, cors_allowed_origins='*')

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)
    emit('message', data, broadcast=True)

if __name__ == '__main__':
    socketio.run(app,  debug=True, port=4000)
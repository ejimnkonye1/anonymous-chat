from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask import Flask, request, jsonify, session, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
import secrets
import datetime

uri = "mongodb+srv://ejimnkonyeonyedika:nPs0iXR5gyPvxZG2@cluster0.rdsyp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
app = Flask(__name__)
CORS(app)

secret_key = secrets.token_urlsafe(16)
app.secret_key = secret_key
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
 print(f'Error connecting to MongoDb: {e}')

db = client['database1']
user_collection = db['users']
messages_collection = db['messages']
@app.route('/register', methods=['POST'])
def register():
   # make the data a json
   data = request.get_json()
   
   username = data.get('username')
   password = data.get('password')

   if not username or not password:
      return jsonify({"error": "username and password is required"}), 400
   if len(password) < 8 :
      return jsonify({'error': 'password should be 8 and above'}),400
   #check if username is taken
   if user_collection.find_one({'username':username}):
      return jsonify({'error':'username is already taken'}), 401
   
  # hased the password
   hased_password = generate_password_hash(password)
   #store username and hased password in users collection
   user_collection.insert_one({
      'username': username,
       'password': hased_password
   })
 
   return jsonify({'message':'user succesfully registered'}),201
@app.route('/login', methods=['POST'])
def Login():
   data = request.get_json()
   username = data.get('username')
   password = data.get('password')

   if not username or not password:
      return jsonify({"error": "username and password is required"}), 400
   # find user in db
   user = user_collection.find_one({'username':username})
   #check if user exists
   if not user:
      return jsonify({'error': 'user not found'}), 404
   #check the password the user entered is same with the hashed password
   if check_password_hash(user['password'], password):
      session['user_id'] = str(user['_id']) 
      session['username'] = user['username']
      return jsonify({'message':'user exists logging in now', 'username': user['username']}),200
   else:
      return jsonify({'error': 'invalid password'}),401
   
@app.route('/sendmessage', methods=["POST"])
def sendmessage():
   data = request.get_json()
   sender_username = data.get('sender_username')
   messages = data.get('message')

   #find user
   sender_user = user_collection.find_one({"username":sender_username})   

   if not sender_user :
      return jsonify({"error": 'invalid sender ' }), 400
   receiver_user = list(user_collection.find({'username':{'$ne': sender_username} }))
   if not receiver_user :
      return jsonify({'error':'others users not found'}),400
   for receiver in receiver_user:
      messages_collection.insert_one({
       'senderId': sender_user['_id'],
       'receiverId': receiver['_id'],
       "messages": messages,
      
    })
   return jsonify({'message':'message successfully sent'}),201
@app.route('/fetchmessages', methods=['GET'])
def fetchmessage():
  #use args to query parameters in GET 
   senderId = request.args.get('senderId')


   sender_user = user_collection.find_one({'username':senderId})
   if not sender_user :
      return jsonify ({"error":'invalid user'}), 400
   messages = list(  messages_collection.find({ }))
   if not messages:
      return jsonify({'error':'Message not found'}),404
   for message in messages:
      message['_id'] = str(message['_id'])
      message['senderId'] = str(message['senderId'])
      message['receiverId'] = str(message['receiverId'])
   
   return jsonify({"message":messages}),200
if __name__ == '__main__':
   app.run(debug=True, port=5000)

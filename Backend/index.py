from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://ejimnkonyeonyedika:nPs0iXR5gyPvxZG2@cluster0.rdsyp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# uri = "mongodb+srv://ejimnkonyeonyedika:nPs0iXR5gyPvxZG2@cluster0.rdsyp.mongodb.net/?retryWrites=true&w=majority&tlsInsecure=true"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# client = MongoClient(uri, server_api=ServerApi('1'), tlsAllowInvalidCertificates=True)

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
 print(f'Erro connecting to MongoDb: {e}')

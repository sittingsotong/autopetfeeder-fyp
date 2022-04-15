### Sample script for using firebase

import pyrebase

config = {
  "apiKey": "AIzaSyD93rmvPfE_7DJ7hVxBd0qF5Gxm2SNQn8M",
  "authDomain": "petfeeder-fyp.firebaseapp.com",
  "databaseURL": "https://petfeeder-fyp-default-rtdb.europe-west1.firebasedatabase.app",
  "storageBucket": "petfeeder-fyp.appspot.com"
}

email = "test@gmail.com"
password = "123456"

## Connect to firebase 
firebase = pyrebase.initialize_app(config)

# Get a reference to the auth service
auth = firebase.auth()

# Log the user in
user = auth.sign_in_with_email_and_password(email, password)

# Get a reference to the database service
db = firebase.database()

# data to save
data = {
    "name": "Mortimer 'Morty' Smith"
}

# Pass the user's idToken to the push method, creates a unique key
# results = db.child("users").push(data, user['idToken'])

# Uses Morty as the key: path = /users/Morty
db.child("users").child("Morty").set(data, user['idToken'])

# user idToken expires every hour, refresh token before the 1 hour expiry:
user = auth.refresh(user['refreshToken'])

# now we have a fresh token at
user['idToken']
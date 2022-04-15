## Main script that runs continuously
import pyrebase
import datetime

# Initialise firebase objects
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


## Retrieves 
def checkFeedStatus():
    return firebase.get("/feed/manual", user['idToken'])


while True:
    pass
    ## TODO
    # Every hour check to refresh auth

    # When feed status updated with grams, convert to amount of motor rotation and execute

    # On every feed, update feed database

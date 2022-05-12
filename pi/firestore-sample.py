import firebase_admin
from firebase_admin import credentials

from google.cloud import firestore
from firebase_admin import firestore

from queue import Queue
import threading

from motor import Motor

cred = credentials.Certificate("petfeeder-key.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

#TODO: figure out user uid dynamically
user_uid = "2F1q9aXMkVOcr7LwyFfHxnYsh3i1" 

#adding first data
doc_ref = db.collection('user').document(user_uid)

## UNCOMMENT WHEN TESTING
# # testing doc
# doc_ref = db.collection('employee').document('empdoc')

### Global Variables
# Create a threading event for monitoring user db
feed_now = threading.Event()
feed_amt = Queue()

# Create a callback on_snapshot function to capture changes
def on_feed(doc_snapshot, changes, read_time):
    for doc in doc_snapshot:
        print("Received document snapshot:", doc.id)

    for change in changes:
        if change.type.name == "MODIFIED":
            data = change.document.to_dict()
            try:
                portion = int(data["feedNow"])
                if portion > 0:
                    feed_amt.put(portion)
                    feed_now.set()
            except:
                print("Feed amount not created yet")

# Watch the document
doc_watch = doc_ref.on_snapshot(on_feed)

# main loop
while True:
    # initialise motor object
    motor = Motor()

    while not feed_amt.empty():
        portion = feed_amt.get()

        # Set value back to 0 for next feed
        doc_ref.update({"feedNow": 0})

        # Call motor API to run motor
        motor.rotate(portion)

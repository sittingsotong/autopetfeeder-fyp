import firebase_admin
from firebase_admin import credentials

from firebase_admin import firestore

from datetime import datetime

### Class object for firestore 
class Firestore():
    def __init__(self, user_uid):
        cred = credentials.Certificate("petfeeder-key.json")
        firebase_admin.initialize_app(cred)

        self.db = firestore.client()

        self.user_uid = user_uid

        self.user_doc = self.db.collection('user').document(self.user_uid)

        self.data_col = self.db.collection(self.user_uid)

        ## UNCOMMENT WHEN TESTING
        # # testing doc
        # doc_ref = db.collection('employee').document('empdoc')

    def start_watch(self, doc_type, callback_func):
        """
        High level function that starts a on_snapshot to watch a document

        Arguments
        ---------
        doc_type: "user" = user_doc, "data" = data_doc

        callback_func: function to be executed on callback of the snapshot
        """

        if doc_type == "user":
            return self.user_doc.on_snapshot(callback_func)
        elif doc_type == "data":
            return self.data_doc.on_snapshot(callback_func)


    def update_user_doc(self, data):
        """
        High level function that uses the doc.update function to add data
        into the database

        Arguments
        ---------
        data: JSON payload containing key and data of the values to be added
        ---------
        """
        self.user_doc.set(data, merge=True)


    def add_to_data_col(self, portion):
        """
        Given the portion in grams that was fed, add the data into the firestore db

        Arguments
        ---------
        data: JSON payload containing key and data of the values to be added
        ---------
        """

        # datetime object containing current date and time
        now = datetime.now()

        # dd/mm/YY H:M:S
        date_str = now.strftime("%d-%m-%Y")

        today_doc = self.data_col.document(date_str)

        try:
            # Update fields by appending to array or incrementing values
            today_doc.update({
                    "times": firestore.ArrayUnion([now]), 
                    "portions": firestore.ArrayUnion([portion]),
                    "sumPortions": firestore.Increment(portion),
                    "updated": now
                })
        except:
            # document does not already exist, create it
            today_doc.set({
                "times": [now],
                "portions": [portion],
                "sumPortions": portion,
                "updated": now,
            })


    def add_pellet_count_to_db(self, estimate):
        """
        Given the estimate amount of pellets remaining in grams, update the document
        with the remaining amount of pellets
        """
        
        # datetime object containing current date and time
        now = datetime.now()

        # dd/mm/YY H:M:S
        date_str = now.strftime("%d-%m-%Y")

        today_doc = self.data_col.document(date_str)

        # Update fields by appending to array
        today_doc.update({
                "remaining": firestore.ArrayUnion([estimate]),
                "updated": now
            })


if __name__ == "__main__":
    ## TESTING
    fs = Firestore("2F1q9aXMkVOcr7LwyFfHxnYsh3i1")

    fs.add_to_data_col({"portion": 30})
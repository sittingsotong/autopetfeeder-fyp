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


    def add_to_data_col(self, data):
        """
        Given the dictionary of data to be added, the information is parsed and added into
        the user data collection

        Arguments
        ---------
        data: JSON payload containing key and data of the values to be added
        ---------
        """

        # If the day document exists, 
        # append to times arr, portion arr and add to sumPortion (optional)
        # Else,
        # create a new document with times arr = [time], portions = [portion]

        # datetime object containing current date and time
        now = datetime.now()
        
        print("now =", now)

        # dd/mm/YY H:M:S
        date_str = now.strftime("%d-%m-%Y")
        print("date and time =", date_str)

        today_doc = self.data_col.document(date_str)
        
        try:
            # Atomically add a new portion to the 'portions' array field.
            today_doc.update({"times": firestore.ArrayUnion([now])})
            today_doc.update({"portions": firestore.ArrayUnion([data["portion"]])})
            today_doc.update({"sumPortions": firestore.Increment(data["portion"])})
            today_doc.update({"updated": firestore.SERVER_TIMESTAMP})
        except:
            # document does not already exist, create it
            data = {
                "times": [now],
                "portions": [data["portion"]],
                "sumPortions": data["portion"],
                "updated": firestore.SERVER_TIMESTAMP,
            }

            today_doc.set(data)

if __name__ == "__main__":
    ## TESTING
    fs = Firestore("2F1q9aXMkVOcr7LwyFfHxnYsh3i1")

    fs.add_to_data_col({"portion": 30})
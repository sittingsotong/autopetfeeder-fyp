import firebase_admin
from firebase_admin import credentials

# from google.cloud import firestore
from firebase_admin import firestore
# from google.cloud.firestore_v1 import serverTimestamp


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
        High level function that uses the col.add function to add data
        into the database

        Arguments
        ---------
        data: JSON payload containing key and data of the values to be added
        ---------
        """

        data["created"] = firestore.SERVER_TIMESTAMP
        self.data_col.add(data)
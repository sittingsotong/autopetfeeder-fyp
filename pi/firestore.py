import firebase_admin
from firebase_admin import credentials

from google.cloud import firestore
from firebase_admin import firestore


### Class object for firestore 
class Firestore():
    def __init__(self, user_uid):
        cred = credentials.Certificate("petfeeder-key.json")
        firebase_admin.initialize_app(cred)

        self.db = firestore.client()

        self.user_uid = user_uid

        self.user_doc = self.db.collection('user').document(self.user_uid)

        self.data_doc = self.db.collection('data').document(self.user_uid)

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


    def update_doc(self, doc_type, data):
        """
        High level function that uses the doc.update function to add data
        into the database

        Arguments
        ---------
        doc_type: "user" = user_doc, "data" = data_doc

        data: JSON payload containing key and data of the values to be added
        ---------

        """
        if doc_type == "user":
            self.user_doc.update(data)
        elif doc_type == "data":
            self.data_doc.update(data)

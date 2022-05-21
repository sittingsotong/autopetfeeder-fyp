import datetime
import logging
import threading
from time import sleep

from firestore import Firestore
from motor import Motor
from queue import Queue

logging.basicConfig(
    level=logging.INFO,
    format="[%(levelname)s] (%(threadName)-10s) %(message)s",
)

#TODO: figure out user uid dynamically using bluetooth/wifi
user_uid = "2F1q9aXMkVOcr7LwyFfHxnYsh3i1" 

### Global Variables
# Queue for amount to manually feed
feed_amt = Queue()

# schdule is a global variable of a list of dictionaries
schedule = []

# initialise motor object to be used for feeding
motor = Motor()

# initialise a firestore object
db = Firestore(user_uid)

def user_callback(doc_snapshot, changes, _):
    """
    Callback function whenever changes have been made to the firestore db
    Updates the global feed queue and schedule based on db
    """
    for doc in doc_snapshot:
        logging.info("User: {} made changes".format(doc.id))

    for change in changes:
        # if change.type.name == "MODIFIED":
        data = change.document.to_dict()
        try:
            portion = int(data["feedNow"])
            if portion > 0:
                feed_amt.put(portion)

            global schedule
            schedule = data["schedule"]
        except:
            logging.error("Error reading values")

# Watch the document
doc_watch = db.start_watch("user", user_callback)

### Main Thread Logic

def feed_caller():
    """
    Feed loop, checks if the feed queue is empty, and triggers a dispense if not
    Feed queue will be updated by the firestore snapshot callback
    """
    while True:
        try:
            while not feed_amt.empty():
                portion = feed_amt.get()

                # Set value back to 0 for next feed
                db.update_user_doc({"feedNow": 0})

                # Add feeding data to data doc
                db.add_to_data_col({"portion": portion })

                # Call motor API to run motor
                motor.rotate(portion)

        except KeyboardInterrupt:
            motor.cleanup()
            exit(1)


def weekday_map(weekday):
    """
    Helper function for weekday matching to format stored in db
    1 = SUN, 2 = MON ...
    """
    return (weekday + 1) % 7


def check_schedule():
    """
    Based on the current time and day of week, 
    check if we need to feed now 
    """
    now = datetime.datetime.now()

    # for each schedule stored, check if matches and feed
    for s in schedule:
        if now.hour == s["hour"] and now.minute == s["minute"]:
            # Time matches
            weekday = now.isoweekday()

            if weekday_map(weekday) in s["days"]:
                # Day of week matches, start dispensing
                logging.info("dispensing {}g now".format(s["portion"]))

                # Add feeding data to data doc
                db.add_to_data_col({"portion": s["portion"]})

                motor.rotate(s["portion"])


def schedule_caller():
    """
    At 5 minute intervals, runs check_schedule
    """
    while True:
        # if current time is not a 5 minute interval, sleep until 5 minute interval reached
        while not datetime.datetime.now().minute % 5 == 0:
            sleep(1)

        # check schedule on every 5min interval
        check_schedule()
        sleep(300)


## THREADING ##
schedule_thread = threading.Thread(name="schedule-thread", target=schedule_caller, daemon=True)
feed_thread = threading.Thread(name="feed-thread", target=feed_caller, daemon=True)

schedule_thread.start()
feed_thread.start()

# Main loop to run while threads are daemonised
while True:
    pass

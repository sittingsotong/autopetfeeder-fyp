import datetime
import logging
import threading
from time import time, sleep

from camera import RPiCamera
from detector import PelletDetector
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

# Threading event to indicate if a feed has been done
feed_flag = threading.Event()

# schdule is a global variable of a list of dictionaries
schedule = []

# initialise motor object to be used for feeding
motor = Motor()

# initialise a firestore object
db = Firestore(user_uid)

# initialise detector model object
detector = PelletDetector('model.h5')

# initialise camera 
cam = RPiCamera()

### Callback Functions
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

            # Set value back to 0 for next feed
            db.update_user_doc({"feedNow": 0})

            # Keep local storage of schedule updated
            global schedule
            schedule = data["schedule"]
        except:
            logging.error("Error reading values")

# Watch the document
doc_watch = db.start_watch("user", user_callback)


### Main Threading Logic
def feed_caller():
    """
    Feed loop, checks if the feed queue is empty, and triggers a dispense 
    based on the portion provided
    Updates the firestore db with feed portion
    """
    while True:
        try:
            while not feed_amt.empty():
                start = time()

                portion = feed_amt.get()

                # Add feeding data to data doc
                db.add_to_data_col(portion)

                # Set feed flag 
                feed_flag.set()

                end = time()

                logging.info("time taken to execute 1 feed: " + str(end - start))

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
                portion = int(s["portion"])

                # Day of week matches, start dispensing
                logging.info("dispensing {}g now".format(portion))

                # Add amount to feed queue
                feed_amt.put(portion)


def schedule_caller():
    """
    At 5 minute intervals, runs check_schedule
    """
    while True:
        # if current time is not a 5 minute interval, sleep until 5 minute interval reached
        while not datetime.datetime.now().minute % 5 == 0:
            sleep(1)

        start = time()
        # check schedule on every 5min interval
        check_schedule()

        end = time()
        
        logging.info("Time taken to check schedule: " + str(end - start))
        sleep(300)


def detector_caller():
    """
    Thread triggered by a timer after a feed mechanism to check how much
    pellets are remaining in the bowl.

    An upgrade would be using RFID to detect when the pet has finished eating
    """
    while True: 
        if(feed_flag.is_set()):
            # wait 1min for the pet to finish eating
            sleep(5) ## CHANGE VALUE FOR TESTING

            start = time()
            # clear the flag
            feed_flag.clear()

            # take picture
            img_path = cam.capture_food()

            # run the model
            prediction = detector.predict(img_path)

            prediction = round(prediction[0][0] * 100, 2)

            logging.info(prediction)
            db.add_pellet_count_to_db(prediction)

            end = time()

            logging.info("time taken for each detection: " + str(end - start))

## THREADING ##
feed_thread = threading.Thread(name="feed-thread", target=feed_caller, daemon=True)
schedule_thread = threading.Thread(name="schedule-thread", target=schedule_caller, daemon=True)
detector_thread = threading.Thread(name="detector-thread", target=detector_caller, daemon=True)

feed_thread.start()
schedule_thread.start()
detector_thread.start()

# Main loop to run while threads are daemonised
while True:
    pass

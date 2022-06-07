# %%
# importing modules
import cv2
import os
from imutils.video import VideoStream
import imutils
import time
import pandas as pd 

import logging

# %%
# Setting up configs
logging.basicConfig(
    level=logging.INFO,
    format="[%(levelname)s] (%(threadName)-10s) %(message)s",
)

logging.info("Starting video stream...")
vs = VideoStream(src=0).start()
time.sleep(1.0)

# Folder to store dataset
folder = "dataset/"

# Create folder if doesn't exist
if not os.path.exists(folder):
    os.mkdir(folder)

# Path to store dataset labels
label_path = "data.csv"

# %%
### PARAMETERS TO CHANGE BEFORE EACH CALL
label = 0 ## int in grams of how much pellets are in these sets of photos
prev_count = 0 ## how many images of this label we already have

count = 50 - prev_count  ## number of images we want to create for this label

## Create a list of image names to store later
data = []

# clicking count number of  images per label
for i in range(count):
    # Taking user input for each capture
    logging.info("Press 's' to capture "+str(label)+"g, "+str(i+prev_count)+"/50")
    userinput = input()
    if userinput != 's':
        logging.warning("Wrong Input..........")
        exit()

    # read returns two values one is the exit code and other is the frame
    frame = vs.read()

    # check if we get the frame or not
    if not frame.any():
        logging.warning("Frame is not been captured..Exiting...")
        break

    #convert the image into gray format for fast calculation
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # display window with gray image
    cv2.imshow("Taken Image", gray)

    # resizing the image to store it, smaller image = easier training
    gray = imutils.resize(gray, height=256, width=256)

    # Store the image to specific label folder
    image_name = str(label)+"g_"+str(i+prev_count)+'.png'
    cv2.imwrite(folder+image_name, gray)

    # Write data to list
    data.append(image_name)

    key = cv2.waitKey(1) & 0xFF

    # if the `q` key was pressed, break from the loop
    if key == ord("q"):
        break

# save data to csv
df = pd.DataFrame(data)
df["label"] = label
df.to_csv(label_path, mode='a')

# When everything done, release the capture
cv2.destroyAllWindows()
vs.stop()

# %%




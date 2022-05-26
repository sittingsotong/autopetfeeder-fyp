import cv2
from imutils.video import VideoStream
import imutils
import logging
import time

logging.basicConfig(
    level=logging.INFO,
    format="[%(levelname)s] (%(threadName)-10s) %(message)s",
)

logging.info("starting video stream...")
vs = VideoStream(src=0).start()
time.sleep(1.0)

while True:
    frame = vs.read()
    frame = imutils.resize(frame, width=1000)

    # show the output frame
    cv2.imshow("Frame", frame)
    key = cv2.waitKey(1) & 0xFF
    # if the `q` key was pressed, break from the loop
    if key == ord("q"):
        break

# do a bit of cleanup
cv2.destroyAllWindows()
vs.stop()
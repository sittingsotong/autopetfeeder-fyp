import cv2
import imutils
import time

from datetime import datetime
from imutils.video import VideoStream
from servo import CameraServo

class RPiCamera():
    def __init__(self, path='images/'):
        self.vs = VideoStream(src=0).start()
        self.servo = CameraServo()
        self.path = path
        time.sleep(1)


    def capture_food(self):
        now = datetime.now()
        date_str = now.strftime("%d-%m-%Y-%H:%M:%S")
        img_path = date_str+'.png'
        self.servo.look_down()

        frame = self.vs.read()
        frame = imutils.resize(frame, width=1000)
        path = self.path + img_path
        cv2.imwrite(path, frame)

        return path


    def cleanup(self):
        self.vs.stop()


if __name__ == "__main__":
    cam = RPiCamera()
    cam.capture_food()
    cam.cleanup()

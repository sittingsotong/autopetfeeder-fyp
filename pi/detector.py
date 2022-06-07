import keras
import numpy as np

# from camera import RPiCamera
from datetime import datetime
from keras.preprocessing import image

### Class object for pellet detector model 
class PelletDetector():
    def __init__(self, model_path):
        self.model = keras.models.load_model(model_path)
        # self.cam = RPiCamera()
        self.img = None


    def capture_img(self):
        """
        Helper function using the RPiCamera class to adjust the servo and
        take a photo of the food bowl
        """
        now = datetime.now()
        date_str = now.strftime("%d-%m-%Y-%H:%M:%S")
        img_path = date_str+'.png'
        self.cam.capture_food(img_path)
        return img_path


    def preprocess(self, img_path):
        """
        Preprocessing on the image to fit the requirements of the model
        """
        img = image.load_img(img_path, target_size=(28,28,1), color_mode="grayscale")
        img = image.img_to_array(img)
        img = img/255
        img = np.array(img)
        # reshape so that input is a 4D tensor
        return img.reshape(1, 28, 28, 1)


    def predict(self, img_path):
        """
        High level function of the prediction pipeline
        """
        # img_path = self.capture_img()
        img = self.preprocess(img_path)
        return self.model.predict(img)


if __name__ == "__main__":
    detector = PelletDetector('model.h5')
    print(detector.predict())

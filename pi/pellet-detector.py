import keras
from keras.preprocessing import image
import numpy as np

### Class object for pellet detector model 
class PelletDetector():
    def __init__(self, model_path):
        self.model = keras.models.load_model(model_path)
        self.img = None


    def preprocess(self, img_path):
        img = image.load_img(img_path, target_size=(28,28,1), color_mode="grayscale")
        img = image.img_to_array(img)
        img = img/255
        img = np.array(img)
        # reshape so that input is a 4D tensor
        return img.reshape(1, 28, 28, 1)


    def predict(self, img_path):
        img = self.preprocess(img_path)
        return self.model.predict(img)


if __name__ == "__main__":
    detector = PelletDetector('model.h5')
    img_path = 'test.png'
    print(detector.predict(img_path))

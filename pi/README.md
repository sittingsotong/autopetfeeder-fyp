# Issue

- To setup the environemnt I used `python3 -m venv venv` to create a venv, so idk if you want to recreate the error
- Then `pip3 install -r requirements.txt` to install the packages, but I only have the firestore modules added for now, so the camera one might have some missing modules

## Running Firebase API on Raspbian
Running the `firestore.py` script would say that it failed to import the google cloud firestore library, reference [here](https://stackoverflow.com/questions/48264536/importerror-failed-to-import-the-cloud-firestore-library-for-python).

### Installing grpcio
- Installing the `grpcio` package (version 1.46.3) doesn't remove the error. 
- Upgraded setuptools following [this thread](https://github.com/grpc/grpc/issues/17829) and made sure the `grpcio` package was correctly installed (`pip3 list` shows that `grpcio` was installed and of the correct version) but also didn't work

- Did not try installing `grpcio` from [source](https://github.com/grpc/grpc/tree/master/src/python/grpcio) bc it says correctly installed according to `pip` so idk

- Also tried to uninstall and reinstall the `google-cloud-firestore` and `google-cloud-core` packages.

- Just found [this link](https://stackoverflow.com/questions/56357794/unable-to-install-grpcio-using-pip-install-grpcio) that says to try a different `grpcio` version. Can't rmb if i tried yet.


### Importing from google.cloud
- Adding this line following some guy's suggestion `from google.cloud import firestore` causes the error to change to:

    ```
    ImportError: /lib/arm-linux-gnueabihf/libc.so.6: version GLIBC_2.33' not found.
    ```

- Saw [this](https://stackoverflow.com/questions/56629793/importerror-lib-arm-linux-gnueabihf-libc-so-6-version-glibc-2-28-not-found) that says need to update `libc6` package, but in order to get the latest need to use Raspbian OS Buster?! So I did not try this.

- Found [some threads](https://groups.google.com/g/grpc-io/c/T91EyO81c8I) about this issue, and somehow the conclusion I got is that its just not compatible with Raspbian. 


## Enabling RPi Camera on Ubuntu 22.04 Desktop
- Running the VideoStream code from `camera.py` doesn't work I end up getting a None value as my frame, no error in particular tho
- Included `start_x=1` and `gpu_mem=128` inside my `/boot/firmware/config.txt`. Doing `ls /dev | grep video`, I can see the `video0` device, so that's supposed to be good I think? but the script doesnt work so idk? [reference here](https://raspberrypi.stackexchange.com/questions/111852/ubuntu-19-10-enabling-and-using-raspberry-pi-camera-module-v2-1)
- Using the `picamera` module doesn't work bc `picamera` is [not compatible with Ubuntu 22.04/arm64](https://askubuntu.com/questions/1211805/raspberry-picamera-on-ubuntu-not-found) ([apparently not compatible with 20.04 either](https://raspberrypi.stackexchange.com/questions/111852/ubuntu-19-10-enabling-and-using-raspberry-pi-camera-module-v2-1)??) 

- I haven't tried [this script](https://www.exceptionlife.com/raspberrypi/question/11368/picamera-and-ubuntu-20-04-arm64), maybe some different kind of `cv` script might work?

## Trying ubuntu 32bit 20.04 server version
- Running a server only thing is so cancerous i want to die
- Need to install a desktop or some GUI or some shit which is also cancerous
- I don't like doing command line only things
- But I'm halfway through this tutorial to [install 20.04 desktop](https://linuxhint.com/install-ubuntu-desktop-20-04-lts-on-raspberry-pi-4/#:~:text=To%20install%20Ubuntu%2020.04%20LTS,from%20your%20favorite%20web%20browser.)
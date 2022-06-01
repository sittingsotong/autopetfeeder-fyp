import RPi.GPIO as GPIO
import time

class CameraServo:
     def __init__(self):
        # setup the GPIO pin for the servo
        self.servo_pin = 13

        GPIO.setmode(GPIO.BCM)
        GPIO.setup(servo_pin,GPIO.OUT)

        # setup PWM process
        self.pwm = GPIO.PWM(servo_pin,30) # 50 Hz (20 ms PWM period)

        ## Calibrated pwm for different angles
        self.forward = 4.5
        self.down = 6.0

        self.pwm.start(self.forward) # start PWM by rotating to looking forward


    def cleanup(self):
        self.pwm.ChangeDutyCycle(0) # prevents jitter
        self.pwm.stop()
        GPIO.cleanup()

    def look_forward(self):
        self.pwm.ChangeDutyCycle(self.forward)
        time.sleep(0.5)

    def look_down(self);
        self.pwm.ChangeDutyCycle(self.down)
        time.sleep(0.5)
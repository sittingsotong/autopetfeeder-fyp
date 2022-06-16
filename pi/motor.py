import RPi.GPIO as GPIO
import time

class Motor:
    def __init__(self):
        self.in1 = 17
        self.in2 = 18
        self.in3 = 27
        self.in4 = 22

        # careful lowering this, at some point you run into the mechanical limitation of how quick your motor can move
        self.step_sleep = 0.001

        self.step_count = 4096 # 5.625*(1/64) per step, 4096 steps is 360°

        self.direction = False # True for clockwise, False for counter-clockwise

        # defining stepper motor sequence (found in documentation http://www.4tronix.co.uk/arduino/Stepper-Motors.php)
        self.step_sequence = [[1,0,0,1],
                        [1,0,0,0],
                        [1,1,0,0],
                        [0,1,0,0],
                        [0,1,1,0],
                        [0,0,1,0],
                        [0,0,1,1],
                        [0,0,0,1]]

        # setting up
        GPIO.setwarnings(False)
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.in1, GPIO.OUT)
        GPIO.setup(self.in2, GPIO.OUT)
        GPIO.setup(self.in3, GPIO.OUT)
        GPIO.setup(self.in4, GPIO.OUT)

        # initializing
        GPIO.output(self.in1, GPIO.LOW)
        GPIO.output(self.in2, GPIO.LOW)
        GPIO.output(self.in3, GPIO.LOW)
        GPIO.output(self.in4, GPIO.LOW)

        self.motor_pins = [self.in1,self.in2,self.in3,self.in4]
        self.motor_step_counter = 0


    def cleanup(self):
        GPIO.output(self.in1, GPIO.LOW)
        GPIO.output(self.in2, GPIO.LOW)
        GPIO.output(self.in3, GPIO.LOW)
        GPIO.output(self.in4, GPIO.LOW)
        GPIO.cleanup()


    def rotate(self, amt):
        scaling_factor = self.step_count / 12
        rotate_amt = int(amt * scaling_factor)

        try:
            for _ in range(rotate_amt):
                for pin in range(0, len(self.motor_pins)):
                    GPIO.output(self.motor_pins[pin], self.step_sequence[self.motor_step_counter][pin])
                if self.direction==True:
                    self.motor_step_counter = (self.motor_step_counter - 1) % 8
                elif self.direction==False:
                    self.motor_step_counter = (self.motor_step_counter + 1) % 8
                else: # defensive programming
                    print("uh oh... direction should *always* be either True or False")
                    self.cleanup()
                    exit(1)
                
                time.sleep(self.step_sleep)

            # self.cleanup()

        except KeyboardInterrupt:
            self.cleanup()
            exit(1)

if __name__ == '__main__':
    motor = Motor()

    ## TESTING
    amt = 25
    motor.rotate(amt)

    time.sleep(5)

    motor.rotate(amt)

    time.sleep(5)

    motor.rotate(amt)

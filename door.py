import RPi.GPIO as GPIO
import time
import sys
from pubnub import Pubnub
GPIO.setmode(GPIO.BOARD)
GPIO.setup(21,GPIO.OUT)
PIN_SERVO = 21
FREQ = 50
servo = GPIO.PWM(PIN_SERVO,FREQ)
servo.start(7.5)

pubnub = Pubnub(publish_key='pub-c-21d3cb4c-7809-43f5-938e-2c6139510cc9', subscribe_key='sub-c-108945de-0ffa-11e6-a5b5-0619f8945a4f')

channel = 'door'

def _callback(m, channel):
    print(m)
    if m['item'] == 'door':
        if m['open'] == True:
            time.sleep(0.9)
            servo.ChangeDutyCycle(4.5)
        elif m['open'] == False:
            time.sleep(1.65)
            servo.ChangeDutyCycle(7.5)

def _error(m):
    print(m)

pubnub.subscribe(channels = channel, callback = _callback, error = _error)
try:
    while 1:
        pass
except KeyboardInterrupt:
    servo.stop()
    GPIO.cleanup()
    sys.exit(1)
    
    
        

    

import os
import time
import sys
from pubnub import Pubnub
import Adafruit_DHT as dht

pubnub = Pubnub(publish_key='pub-c-21d3cb4c-7809-43f5-938e-2c6139510cc9', subscribe_key = 'sub-c-108945de-0ffa-11e6-a5b5-0619f8945a4f')
channel = 'smart-home'

def callback(message):
    print(message)

try:
    while True:
        h,t = dht.read_retry(dht.DHT11,4)
        print 'Temp={0:0.1f}*C Humidity={1:0.1f}%'.format(t,h)
        message = {'temperature': t, 'humidity': h}
        pubnub.publish(channel=channel, message=message,callback=callback, error=callback)
except KeyboardInterrupt:
    GPIO.cleanup()
    print 'Sensor off'
    

from threading import Lock
from flask import Flask, render_template, session
from flask_socketio import SocketIO, emit
import mysql.connector
import requests

async_mode = None
app = Flask(__name__)
socketio = SocketIO(app, async_mode=async_mode)
thread = None
thread_lock = Lock()

def background_thread():
    """Example of how to send server generated events to clients."""
    count = 0
    latestsrno = 1
    while True:
        socketio.sleep(0)
        count += 1

        mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Edge@86722768",
            database="vehicleregistration"
        )

        mycursor = mydb.cursor()
        sql = "SELECT * FROM realtimetest WHERE id = '%s'" % latestsrno
        mycursor.execute(sql)
        print('Here1')
        result = mycursor.fetchall()
        try:
            print(result[0][0])
            print(result[0][1])
        except:
            print("Waiting...")
            continue
        
        newprice = (result[0][0])
        newprice = str(newprice)
        fname = (result[0][1])

        #price = ((requests.get(url)).json())['data']['amount']
        
        if int(newprice) == latestsrno:
            socketio.emit('my_response', {'data': 'Test: ' + newprice + '            ' + fname, 'count': count})
            latestsrno += 1
        else:
            continue


@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)


@socketio.event
def my_event(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': message['data'], 'count': session['receive_count']})

@socketio.event
def connect():
    global thread
    with thread_lock:
        if thread is None:
            thread = socketio.start_background_task(background_thread)
    emit('my_response', {'data': 'Connected', 'count': 0})

if __name__ == '__main__':
    socketio.run(app)
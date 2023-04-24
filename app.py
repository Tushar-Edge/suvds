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
            database="suvds"
        )

        mycursor = mydb.cursor()
        sql = "SELECT * FROM main WHERE id = '%s'" % latestsrno
        mycursor.execute(sql)
        print('Here1')
        result = mycursor.fetchall()
        try:
            print(result[0][0])
            print(result[0][1])
        except:
            print("Waiting...")
            continue
        


        data = { 
            'newprice': str(result[0][0]),
            'lics_no': result[0][1],
            'c_make': result[0][2],
            'c_model': result[0][3],
            'c_color': result[0][4],
            'location': result[0][5],
            'longitude': result[0][6],
            'latitude': result[0][7],
            'date_s': result[0][8],
            'time_s': result[0][9],
            'flag': result[0][10]
        }


       


        #price = ((requests.get(url)).json())['data']['amount']
        
        if int(data['newprice']) == latestsrno:
            socketio.emit('my_response', {'data': 'Test: ' + data['newprice'] + '            ' + data['lics_no'], 'count': count})
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
from threading import Lock
from flask import Flask, render_template, session, jsonify
from flask_socketio import SocketIO, emit
import mysql.connector
import requests
import json

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
            'lics_no': str(result[0][1]),
            'c_make': str(result[0][2]),
            'c_model': str(result[0][3]),
            'c_color': str(result[0][4]),
            'location': str(result[0][5]),
            'longitude': str(result[0][6]),
            'latitude': str(result[0][7]),
            'date_s': str(result[0][8]),
            'time_s': str(result[0][9]),
            'flag': str(result[0][10]),
            'count':count
            
        }


       
        #price = ((requests.get(url)).json())['data']['amount']
        
        if int(data['newprice']) == latestsrno:
            #socketio.emit('my_response', {'newprice':data['newprice'],'lics_no':data['lics_no'], 'c_make':data['c_make'], 'c_model':data['c_model'],'c_color':data['c_color'],'location':data['location'],'longitude':data['longitude'],'latitude':data['latitude'], 'date_s':data['date_s'],'time_s':data['time_s'], 'flag':data['flag'], 'count':count })
            socketio.emit('my_response', data)


            latestsrno += 1
        else:
            continue


@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)


@socketio.event
def my_event(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    #emit('my_response', {'data': message['data'], 'count': session['receive_count']})

@socketio.event
def connect():
    global thread
    with thread_lock:
        if thread is None:
            thread = socketio.start_background_task(background_thread)
    #emit('my_response', {'data': 'Connected', 'count': 0})

if __name__ == '__main__':
    socketio.run(app)
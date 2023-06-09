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
    mydbcomplaint = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Edge@86722768",
            database="Complaints"
        )
    
    mycursor_complaint = mydbcomplaint.cursor()
    sql_complaint="SELECT * FROM complaints"
    mycursor_complaint.execute(sql_complaint)
    result_complaint=mycursor_complaint.fetchall()

    complaints_list = []
    for row in result_complaint:
        complaint_dict = {'license_no': row[0]}
        complaints_list.append(complaint_dict)

# Write the complaints_list to a JSON file
    with open('complaints_list.json', 'w') as f:
        json.dump(complaints_list, f)

     
   
   
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


        # flagged_count_sql = "SELECT COUNT(*) FROM main WHERE flag = 'true'"
        # mycursor.execute(flagged_count_sql)
        # flagged_count = mycursor.fetchall()[0]
        


        try:
            print(result[0][0])
            print(result[0][1])
        except:
            print("Waiting...")
            continue
        


        lat_str = str(result[0][7])
        lon_str = str(result[0][6])

        lat = float(lat_str[:-3]) if lat_str[-1] == 'N' else -1 * float(lat_str[:-3])
        lon = float(lon_str[:-3]) if lon_str[-1] == 'E' else -1 * float(lon_str[:-3])

            #print(lat, lon) # Output: 12.9716 77.5946



        data = { 
            'newprice': str(result[0][0]),
            'lics_no': str(result[0][1]),
            'c_make': str(result[0][2]),
            'c_model': str(result[0][3]),
            'c_color': str(result[0][4]),
            'location': str(result[0][5]),
            'longitude':  lon,
            'latitude': lat,
            'date_s': str(result[0][8]),
            'time_s': str(result[0][9]),
            'flag': str(result[0][10]),
            'count':count,
            #'flagged_cars':flagged_count
            
        }


       
        #price = ((requests.get(url)).json())['data']['amount']
        
        if int(data['newprice']) == latestsrno:
            #socketio.emit('my_response', {'newprice':data['newprice'],'lics_no':data['lics_no'], 'c_make':data['c_make'], 'c_model':data['c_model'],'c_color':data['c_color'],'location':data['location'],'longitude':data['longitude'],'latitude':data['latitude'], 'date_s':data['date_s'],'time_s':data['time_s'], 'flag':data['flag'], 'count':count })
            socketio.emit('my_response', data)


            latestsrno += 1
        else:
            continue


@app.route('/dashboard')
def dashboard():
    return render_template('index.html', async_mode=socketio.async_mode)


@app.route('/')
def Home():
    return render_template('Home.html', async_mode=socketio.async_mode)



@app.route('/index.html')
def Homet():
    return render_template('Home.html', async_mode=socketio.async_mode)


@app.route('/Home')
def Homet2():
    return render_template('Home.html', async_mode=socketio.async_mode)



# @app.route('/RTOupdate')
# def RtoUpdate():
#     return render_template('rtoUpdate.html', async_mode=socketio.async_mode)





@app.route('/about.html')
def about():
    return render_template('about.html', async_mode=socketio.async_mode)



@app.route('/contact.html')
def contact():
    return render_template('contact.html', async_mode=socketio.async_mode)





@app.route('/RTOupdate')
def RTOupdate():


    rtoData = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Edge@86722768",
            database="rto"
        )

    cur = rtoData.cursor()
    cur.execute("SELECT * FROM rto")
    data = cur.fetchall()
    cur.close()

    return render_template('rtoUpdate.html', vehicle=data)



















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
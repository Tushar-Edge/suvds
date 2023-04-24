import { showPopup,closePopup } from './popup.js';

    $(document).ready(function() {
        var socket = io();


        socket.on('connect', function() {
            socket.emit('my_event', {data: 'I\'m connected!'});
        });


        socket.on('my_response', function(data, cb) {

            var table = document.querySelector('table tbody');

            
            var newRow = table.insertRow();

            var cell1=newRow.insertCell(0);
            var cell2=newRow.insertCell(1);
            var cell3=newRow.insertCell(2);
            var cell4=newRow.insertCell(3);
            var cell5=newRow.insertCell(4);
            var cell6=newRow.insertCell(5);
            var cell7=newRow.insertCell(6);
            var cell8=newRow.insertCell(7);
            var cell9=newRow.insertCell(8);
            var cell10=newRow.insertCell(9);


            cell1.innerHTML=data.newprice;
            cell2.innerHTML=data.lics_no;
            cell3.innerHTML=data.c_make;
            cell4.innerHTML=data.c_model;
            cell5.innerHTML=data.c_color;
            cell6.innerHTML=data.location;
            cell7.innerHTML=data.date_s;
            cell8.innerHTML=data.time_s;
            cell9.innerHTML=data.flag_s;

            // let button = document.createElement("button");
            // button.innerHTML="Show map";

            // button.onclick=showPopup();
            // cell10.append(button)

                
           
                
                //row += '<td></td>';
               
            //console.log(msg.c_make);
           // $('#log').append('<br>' + $('<div/>').text('Received #' + msg.count + ': ' + msg.c_make + ' ').html());
            if (cb)
                cb();
        });
        
    });
//import { showPopup,closePopup } from './popup.js';// function to show the pop-up window with the images
function showPopup() {
	// show the background blur
	document.getElementById("background").style.display = "block";

	// show the pop-up container
	document.getElementById("popup-container").style.display = "block";
}

// function to close the pop-up window
 function closePopup() {
	// hide the background blur and the pop-up container
	document.getElementById("background").style.display = "none";
	document.getElementById("popup-container").style.display = "none";
}







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
            var cell11=newRow.insertCell(10)


            cell1.innerHTML=data.newprice;
            cell2.innerHTML=data.lics_no;
            cell3.innerHTML=data.c_make;
            cell4.innerHTML=data.c_model;
            cell5.innerHTML=data.c_color;
            cell6.innerHTML=data.location;
            cell7.innerHTML=data.date_s;
            cell8.innerHTML=data.time_s;
            cell9.innerHTML=data.flag;
            cell10.appendChild(Object.assign(document.createElement('i'), {
                className: 'fas fa-map-marker-alt',
                onclick: showPopup,
                style: 'cursor: pointer; color: blue'
              }));    

            

            if(data.flag==1)
            {
            newRow.style.backgroundColor = 'red'
            }



           document.getElementById("vehicle-license-number").value
         if(document.getElementById("vehicle-license-number").value==data.lics_no)   
         {
            
            var table = document.querySelector('.tablexx table tbody');
            var newRowN = table.insertRow();
            var cell1=newRowinsertCell(0);
            var cell2=newRowN.insertCell(1);
            var cell3=newRowN.insertCell(2);
            var cell4=newRowN.insertCell(3);

            //cell1.innerHTML=
            cell2.innerHTML=data.location;
            cell3.innerHTML=data.date_s;
            cell4.innerHTML=data.time_s;


         }

            if (cb)
                cb();
           
            
            
        });
        
    });
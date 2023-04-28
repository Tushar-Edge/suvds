//import { showmap } from './map.js';// function to show the pop-up window with the images



function showmap(longitude,latitude,location)
{

  var mymap = L.map('mapid').setView([latitude, longitude], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18
  }).addTo(mymap);
  
  L.marker([latitude, longitude]).addTo(mymap)
      .bindPopup(location);
            



}


function showPopup(longitude,latitude,location) {
	// show the background blur

  
	document.getElementById("background").style.display = "block";

	// show the pop-up container
	document.getElementById("popup-container").style.display = "block";
  showmap(longitude,latitude,location);

}

// function to close the pop-up window
 function closePopup() {
	// hide the background blur and the pop-up container
	document.getElementById("background").style.display = "none";
	document.getElementById("popup-container").style.display = "none";
}







    $(document).ready(function() {
        var socket = io();


        var f_count=0;
        var fir_count=0;
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
            
 
           // cell2.innerHTML = `<div id="lics" onclick="search()">${data.lics_no}</div>`;
           cell2.innerHTML = `<div id="lics" onclick="search('${data.lics_no}')">${data.lics_no}</div>`;

            cell3.innerHTML=data.c_make;
            cell4.innerHTML=data.c_model;
            cell5.innerHTML=data.c_color;
            cell6.innerHTML=data.location;
            cell7.innerHTML=data.date_s;
            cell8.innerHTML=data.time_s;
            cell9.innerHTML=data.flag;
            cell10.appendChild(Object.assign(document.createElement('i'), {
              className: 'fas fa-map-marker-alt',
              onclick: function() {
                showPopup.apply(null, [data.longitude,data.latitude,data.location]);
              },
              style: 'cursor: pointer; color: yellowgreen'
            }));
             
            
            console.log(data.longitude);
            console.log(data.latitude)
         
            if(data.flag==1)
            {
            newRow.style.backgroundColor = 'red'
            }

            //console.log(data.flagged_cars);


            if(data.lics_no=="TN06EF5566")
           {
            newRow.style.backgroundColor = 'grey'

           }

           const counterValue = document.querySelector('.counter-value');
            if(data.flag==1)
           {
            f_count+=1;
            counterValue.innerHTML = f_count;
                       
           counterValue.classList.add('updated');
           setTimeout(() => {
             counterValue.classList.remove('updated');
           }, 300);
         
           }

           const counterValue2 = document.querySelector('.counter-value2');
           if(data.flag==1)
          {
           fir_count+=1;
           counterValue2.innerHTML = fir_count;
                      
          counterValue2.classList.add('updated2');
          setTimeout(() => {
            counterValue2.classList.remove('updated2');
          }, 300);
        
          }


                    

            // // Fetch the complaints.json file
            // fetch('/complaints.json')
            // .then(response => response.json())
            // .then(data => {
            // // Extract the license_no values into an array
            // const licenseNos = data.map(complaint => complaint.license_no);
            // console.log(licenseNos);
            // // Do something with the licenseNos array
            // })
            // .catch(error => console.error(error));
// 
            // const jsonData = '[{"license_no": "GJ07IJ77886"}, {"license_no": "TN06EF5566"}, {"license_no": "UP03AB9101"}]';
            // const data = JSON.parse(jsonData);
            // console.log(data);
            


 


            if (cb)
                cb();
           
            
            
        });
        
      //showmap(data.longitude,data.latitude,data.location);
        
    });
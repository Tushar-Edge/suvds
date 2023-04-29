//import { showmap } from './map.js';// function to show the pop-up window with the images



// function showmap(longitude,latitude,location)
// {

//   var mymap = L.map('mapid').setView([latitude, longitude], 13);

//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
//       maxZoom: 18
//   }).addTo(mymap);
  
//   L.marker([latitude, longitude]).addTo(mymap)
//       .bindPopup(location);
            



// }


function showmap(longitude, latitude, location,mapid) {
 
  //console.log(mapid.id);
  var mapid=mapid.id;
  var mymap = L.map(mapid).setView([latitude, longitude], 13);



  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 185
  }).addTo(mymap);
  
  L.marker([latitude, longitude]).addTo(mymap)
    .bindPopup(location);
}







function showPopup(popupContainer) {
	// show the background blur
  var popupid=popupContainer.id;
  
	document.getElementById("background").style.display = "block";

	// show the pop-up container
	document.getElementById(popupid).style.display = "block";
 
}

// function to close the pop-up window
 function closePopup(popupContainer) {
	// hide the background blur and the pop-up container

  var popupid_=popupContainer.id;
	document.getElementById("background").style.display = "none";
	document.getElementById(popupid_).style.display = "none";
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


            // var img_cont= document.getElementById("images-container");
            // var newDiv = document.createElement("div");
            // newDiv.setAttribute("id", "mapid-" + data.newprice);

          
            // newDiv.style.width = "100%";
            // newDiv.style.height = "100px";



            // create a new popup container
              var popupContainer = document.createElement("div");
              popupContainer.setAttribute("id", "popup-container-"+data.newprice);
              document.body.appendChild(popupContainer);

              // create a new popup
              var popup = document.createElement("div");
              popup.setAttribute("id", "popup-"+ data.newprice);
              popupContainer.appendChild(popup);

              // create a close button for the popup
              // var closeButton = document.createElement("span");
              // closeButton.setAttribute("class", "close-"+ data.newprice);
              // closeButton.setAttribute("onclick", "closePopup(popupContainer)");
              // closeButton.innerHTML = "&times;";
              // popup.appendChild(closeButton);


                            // Add event listener for "keydown" event on document
              document.addEventListener("keydown", function(event) {
                // Check if "Esc" key was pressed
                if (event.key === "Escape") {
                  // Call closePopup() function to close popup container
                  closePopup(popupContainer);
                }
              });


                            // create a new images container for the popup
              var imagesContainer = document.createElement("div");
              imagesContainer.setAttribute("id", "images-container-"+ data.newprice);
              popup.appendChild(imagesContainer);


              var mapid = document.createElement("div");
              mapid.setAttribute("id", "mapid-" + data.newprice);
              imagesContainer.append(mapid);
              
          





              // add CSS styles to the popup container and popup
              popupContainer.style.position = "fixed";
              popupContainer.style.top = "50%";
              popupContainer.style.left = "50%";
              popupContainer.style.transform = "translate(-50%, -50%)";
              popupContainer.style.zIndex = "9999";
              popupContainer.style.display = "none";

              popup.style.backgroundColor = "rgba(255, 255, 255, 0.705)";
              popup.style.border = "3px solid #9fff06";
              popup.style.padding = "10px";
              popup.style.position = "relative";

              // add CSS styles to the images container
              imagesContainer.style.display = "flex";
              imagesContainer.style.flexWrap = "wrap";
              imagesContainer.style.justifyContent = "center";
              imagesContainer.style.alignItems = "center";
              imagesContainer.style.height = "540px";
              imagesContainer.style.width = "1000px";


                //add css to mapid
                mapid.style.width = "100%";
                mapid.style.height = "550px";

           

           

            cell10.appendChild(Object.assign(document.createElement('i'), {
              className: 'fas fa-map-marker-alt',
              onclick: function() {
                showPopup(popupContainer);
                showmap(data.longitude, data.latitude, data.location,mapid);
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




// socket.on('my_response', function(data, cb) {
//   var table = document.querySelector('table tbody');

//   var newRow = table.insertRow();
//   var cell1 = newRow.insertCell(0);
//   var cell2 = newRow.insertCell(1);
//   var cell3 = newRow.insertCell(2);
//   var cell4 = newRow.insertCell(3);
//   var cell5 = newRow.insertCell(4);
//   var cell6 = newRow.insertCell(5);
//   var cell7 = newRow.insertCell(6);
//   var cell8 = newRow.insertCell(7);
//   var cell9 = newRow.insertCell(8);
//   var cell10 = newRow.insertCell(9);
//   var cell11 = newRow.insertCell(10);

//   cell1.innerHTML = data.newprice;
//   cell2.innerHTML = `<div id="lics" onclick="search('${data.lics_no}')">${data.lics_no}</div>`;
//   cell3.innerHTML = data.c_make;
//   cell4.innerHTML = data.c_model;
//   cell5.innerHTML = data.c_color;
//   cell6.innerHTML = data.location;
//   cell7.innerHTML = data.date_s;
//   cell8.innerHTML = data.time_s;
//   cell9.innerHTML = data.flag;

//   // create a new map with a marker for each row
//   var mapid = 'mapid-' + data.lics_no.replace(/\s/g, ''); // create a unique ID for the map
//   var mapdiv = document.createElement('div');
//   mapdiv.id = mapid;
//   cell10.appendChild(mapdiv); // append the new map div to the table cell

//   var mymap = L.map(mapid).setView([data.latitude, data.longitude], 13);

//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
//     maxZoom: 18
//   }).addTo(mymap);

//   L.marker([data.latitude, data.longitude]).addTo(mymap)
//     .bindPopup(data.location);

//   cell10.appendChild(Object.assign(document.createElement('i'), {
//     className: 'fas fa-map-marker-alt',
//     onclick: function() {
//       showPopup();
//       showmap(data.longitude, data.latitude, data.location); // pass arguments here
//     },
//     style: 'cursor: pointer; color: yellowgreen'
//   }));

//   if (data.flag == 1) {
//     newRow.style.backgroundColor = 'red';
//     f_count += 1;
//     counterValue.innerHTML = f_count;
//     counterValue.classList.add('updated');
//     setTimeout(() => {
//       counterValue.classList.remove('updated');
//     }, 300);

//     fir_count += 1;
//     counterValue2.innerHTML = fir_count;
//     counterValue2.classList.add('updated2');
//     setTimeout(() => {
//       counterValue2.classList.remove('updated2');
//     }, 300);
//   }

//   if (data.lics_no == "TN06EF5566") {
//     newRow.style.backgroundColor = 'grey';
//   }

//   if (cb) {
//     cb();
//   }
// });



//filter functinality

function filter() {
  // Get input values
  const dateValue = document.getElementById("date-filter").value;
  //const yearValue = document.getElementById("year-filter").value;
  const locationValue = document.getElementById("location-filter").value.toLowerCase();
  
  

  // Get table rows
  const tableRows = document.getElementsByTagName("tr");
  for (let i = 0; i < tableRows.length; i++) {
    const row = tableRows[i];
   

    // Skip header row
    if (row.getElementsByTagName("th").length > 0) {
      continue;
    }

    // Get cell values
    const dateCell = row.getElementsByTagName("td")[6];
    
    const locationCell = row.getElementsByTagName("td")[5];

    const flagCell = row.getElementsByTagName("td")[8];

    // Filter by date
    if (dateValue !== "") {
      const rowDate = new Date(dateCell.textContent);
      const filterDate = new Date(dateValue);
      if (rowDate.getTime() !== filterDate.getTime()) {
        row.style.display = "none";
        continue;
      }
      else{
        row.style.display = "";
      }
    }
    else
    {
      row.style.display = "";
    }

    // Filter by location
    if (locationValue !== "") {
      if (locationCell.textContent.toLowerCase().indexOf(locationValue) === -1) {
        row.style.display = "none";
        continue;
      }
    }
    else{
      row.style.display = "";
    }


      //   // check if the flag is 1
      // if (flagCell.innerText === '1') {
      //   // set the row background color to red
      //   row.style.backgroundColor = 'red';
      //   continue;
      // }
      // else
      // {
      //   row.style.display = "";
      // }

    // Show row if it passes all filters
    row.style.display = "";
  }
}


//id="location-filter"



// const table = document.querySelector('table tbody');
// const rows = table.querySelectorAll('tr');

// const inputElement = document.getElementById("location-filter");
// const locationValue = document.getElementById("location-filter").value.toLowerCase();


// inputElement.onchange = function() {
//   rows.forEach((row) => {
//     const locationCell = row.getElementsByTagName("td")[6];
//     if (locationValue !== "") {
//       if (locationCell.textContent.toLowerCase().indexOf(locationValue) === -1) {
//         row.style.display = "none";
//         //continue;
//       }
//     }
//     else{
//       row.style.display = "";
//     }
//   });
// };





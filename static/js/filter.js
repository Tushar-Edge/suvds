

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
    const dateCell = row.getElementsByTagName("td")[5];
    ///const yearCell = dateCell.spli;
    const locationCell = row.getElementsByTagName("td")[4];

    const flagCell = row.getElementsByTagName("td")[6];

    // Filter by date
    if (dateValue !== "") {
      const rowDate = new Date(dateCell.textContent);
      const filterDate = new Date(dateValue);
      if (rowDate.getTime() !== filterDate.getTime()) {
        row.style.display = "none";
        continue;
      }
    }

    // Filter by location
    if (locationValue !== "") {
      if (locationCell.textContent.toLowerCase().indexOf(locationValue) === -1) {
        row.style.display = "none";
        continue;
      }
    }


        // check if the flag is 1
      if (flagCell.innerText === "yes") {
        // set the row background color to red
        row.style.backgroundColor = 'red';
        continue;
      }

    // Show row if it passes all filters
    row.style.display = "";
  }
}










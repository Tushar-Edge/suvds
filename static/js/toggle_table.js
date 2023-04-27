function toggleTableRows(checkbox) {
    const rows = document.querySelectorAll('table tbody tr');
    const locationValue_ = document.getElementById("location-filter").value.toLowerCase();
    const dateValue_ = document.getElementById("date-filter").value;
    for (let i = 0; i < rows.length; i++) {
      const flagCell = rows[i].querySelector('td:nth-child(9)');
      if (checkbox.checked && flagCell && flagCell.textContent.trim() !== '1') {
        rows[i].style.display = 'none';
      } else if(locationValue_!='') {
        if(rows[i].querySelector('td:nth-child(6)').textContent.toLowerCase() == locationValue_)
        {
          rows[i].style.display='';
        }
        else
        {
          rows[i].style.display = 'none';

        }
      }
      else if(dateValue_!='')
      {
        if(rows[i].querySelector('td:nth-child(7)').textContent == dateValue_)
        {

          rows[i].style.display='';
        }
        else
        {
          rows[i].style.display = 'none';
        }

      }
      else
      {
        rows[i].style.display = '';
      }
    }
  }








// function toggleTableRows(checkbox) {
//     const rows = document.querySelectorAll('table tbody tr');
//     const locationValue = document.getElementById("location-filter").value.toLowerCase(); 
//     const dateValue = document.getElementById("date-filter").value;
//     for (let i = 0; i < rows.length; i++) {
//       const flagCell = rows[i].querySelector('td:nth-child(9)'); 
//      /
//       5

//       if (checkbox.checked && flagCell && flagCell.textContent.trim() !== '1') {
//         rows[i].style.display = 'none';
//       } else if(rows[i].getElementsByTagName("td")[5]== locationValue) {
//         rows[i].style.display = '';
//       }
//     }
//   }
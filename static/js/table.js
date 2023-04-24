
var tableContainer = document.querySelector('.table-container');

// add an event listener to detect when the table is scrolled horizontally
tableContainer.addEventListener('scroll', function() {
  // get the table header
  var tableHeader = tableContainer.querySelector('thead');
  // set the table header's left margin to the negative value of the table container's scrollLeft property
  tableHeader.style.marginLeft = -tableContainer.scrollLeft + 'px';
});


function toggleTableRows(checkbox) {
    const rows = document.querySelectorAll('table tbody tr');
    for (let i = 0; i < rows.length; i++) {
      const flagCell = rows[i].querySelector('td:nth-child(7)');
      if (checkbox.checked && flagCell && flagCell.textContent.trim() !== 'yes') {
        rows[i].style.display = 'none';
      } else {
        rows[i].style.display = '';
      }
    }
  }
  
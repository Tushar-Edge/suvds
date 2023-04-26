
var tableContainer = document.querySelector('.table-container');

// add an event listener to detect when the table is scrolled horizontally
tableContainer.addEventListener('scroll', function() {
  // get the table header
  var tableHeader = tableContainer.querySelector('thead');
  // set the table header's left margin to the negative value of the table container's scrollLeft property
  tableHeader.style.marginLeft = -tableContainer.scrollLeft + 'px';
});



  
var tableContainernav = document.querySelector('.tablenav-container');

// add an event listener to detect when the table is scrolled horizontally
tableContainernav.addEventListener('scroll', function() {
  // get the table header
  var tableHeader = tableContainernav.querySelector('thead');
  // set the table header's left margin to the negative value of the table container's scrollLeft property
  tableHeader.style.marginLeft = -tableContainernav.scrollLeft + 'px';
});


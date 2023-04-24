function toggleTableRows(checkbox) {
    const rows = document.querySelectorAll('table tbody tr');
    for (let i = 0; i < rows.length; i++) {
      const flagCell = rows[i].querySelector('td:nth-child(9)');
      if (checkbox.checked && flagCell && flagCell.textContent.trim() !== '1') {
        rows[i].style.display = 'none';
      } else {
        rows[i].style.display = '';
      }
    }
  }
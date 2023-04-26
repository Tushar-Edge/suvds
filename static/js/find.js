function search()
{
    const rows = document.querySelectorAll('table tbody tr');
    const lics_value=document.getElementById('vehicle-license-number').value.trim();
    var table_ = document.querySelector('.tablexx table tbody');
    table_.innerHTML='';
    checkif=0;
        
    rows.forEach(row => {
        const lics_no = row.getElementsByTagName("td")[1].innerHTML;

<<<<<<< HEAD
        const lics_no=div.textContent;
     
        const location_ = row.getElementsByTagName("td")[5].innerHTML;
        const date_ = row.getElementsByTagName("td")[6].innerHTML;
        const time_ = row.getElementsByTagName("td")[7].innerHTML;
        const flag_ = row.getElementsByTagName("td")[8].innerHTML;
=======
        const location_ = row.getElementsByTagName("td")[5].innerHTML;
        const date_ = row.getElementsByTagName("td")[6].innerHTML;
        const time_ = row.getElementsByTagName("td")[7].innerHTML;
        const flag_ = row.getElementsByTagName("td")[8].innerHTML;
>>>>>>> parent of ab1174d (eight)
       

       //const name = prompt(location_);

      // console.log(lics_no);
       //console.log(lics_value);
       
      if(lics_no == lics_value)
       {
        
            //const name = prompt(lics_no+ ""+ lics_value,);
           
            checkif=1;
            var newRow = table_.insertRow();

            var cell1=newRow.insertCell(0);
            var cell2=newRow.insertCell(1);
            var cell3=newRow.insertCell(2);
            var cell4=newRow.insertCell(3);

            cell1.innerHTML='1';
            cell2.innerHTML=location_;
            cell3.innerHTML=date_;
            cell4.innerHTML=time_;

            if(flag_=="1")
            {
            newRow.style.backgroundColor = 'red'
          

            }
            if(flag_=="1")
            {
                alert("This vehicle is flagged");
          

            }


      }
      

        
    });
    if(checkif==0)
      {
        alert("This vehicle is not yet spotted");

      }
  
    

   

}



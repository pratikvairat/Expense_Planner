function setRecords() {
    const emailId = localStorage.getItem("emailId");
   
    var API = `http://127.0.0.1:3000/fetch_all_records?email=${emailId}`;
    
    fetch(API)
      .then(response => response.json())
      .then(data => {
        var tbody = document.getElementById("tb-data");
        document.getElementById("balance-sheet").style.visibility = "visible";
        
        // Clear existing table rows
        tbody.innerHTML = "";
        
        for (var i = 0; i < data.result.length; i++) {
          var row = document.createElement("tr");
          
          var transNoCell = document.createElement("td");
          transNoCell.textContent = i + 1;
          
          var amountCell = document.createElement("td");
          amountCell.textContent = "Rs. "+data.result[i].amount;
          
          var TtypeCell = document.createElement("td");
          TtypeCell.textContent = data.result[i].Ttype;
          
          var detailCell = document.createElement("td");
          detailCell.textContent = data.result[i].detail;
          
          var dateCell = document.createElement("td");
          dateCell.textContent = data.result[i].Tdate;
          
          row.appendChild(transNoCell);
          row.appendChild(amountCell);
          row.appendChild(TtypeCell);
          row.appendChild(detailCell);
          row.appendChild(dateCell);
          
          tbody.appendChild(row);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  
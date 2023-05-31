function defaultLoad() {
    document.getElementById("balance-sheet").style.visibility = "hidden";
    var CRbal = document.getElementById("CRbal");
    var DRbal = document.getElementById("DRbal");
    var emailId = localStorage.getItem("emailId");
    var API_CR = `http://127.0.0.1:3000/balance_fetch?email=${emailId}&Ttype=CR`;
    var API_DR = `http://127.0.0.1:3000/balance_fetch?email=${emailId}&Ttype=DR`;
    fetch(API_CR)
        .then(response => {
            return response.json();
        }).then(data => CRbal.innerHTML = "RS. " + data.amount[0]['sum(amount)'])
        .catch(err => {
            console.log(err);
        })
    fetch(API_DR)
        .then(response => {
            return response.json();
        }).then(data => DRbal.innerHTML = "Rs. " + data.amount[0]['sum(amount)'])
        .catch(err => {
            console.log(err);
        })

}

document.getElementById("add-record").addEventListener("click", () => {
    var xhr = new XMLHttpRequest();
    var API = "http://127.0.0.1:3000/add_record";
    var emailId = localStorage.getItem("emailId");
    var Ttype = document.getElementById("Ttype").value;
    var amount = document.getElementById("amount").value;
    var details = document.getElementById("details").value;
    var params = `emailId=${emailId}&Ttype=${Ttype}&amount=${amount}&details=${details}`;
    xhr.open('POST', API, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            alert(xhr.responseText);
        } 
    };
    xhr.send(params);
    document.getElementById("Ttype").value='Select Credit or Debit';
    document.getElementById("amount").value='';
    document.getElementById("details").value='';
    
})
function clearTable() {
    var tbody = document.getElementById("tb-data");
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}
function setData(data) {
    clearTable();
    var tbody = document.getElementById("tb-data");
    document.getElementById("balance-sheet").style.visibility = "visible";
    for (var i = 0; i < data.result.length; i++) {
        var row = document.createElement("tr");
        var transNoCell = document.createElement("td");
        transNoCell.textContent = i + 1;
        var amountCell = document.createElement("td");
        amountCell.textContent = "Rs. "+data.result[i].amount;
        var detailCell = document.createElement("td");
        detailCell.textContent = data.result[i].detail;
        var datecell = document.createElement("td");
        datecell.textContent = data.result[i].Tdate;
        row.appendChild(transNoCell);
        row.appendChild(amountCell);
        row.appendChild(detailCell);
        row.appendChild(datecell);
        tbody.appendChild(row);
    }
}
document.getElementById("CRshow").addEventListener("click", () => {
    const emailId = localStorage.getItem("emailId");
    document.getElementById("tran_type").innerHTML = "Details";
    var API = `http://127.0.0.1:3000/fetch_record?email=${emailId}&Ttype=CR`;
    fetch(API)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setData(data);
        }
        )
        .catch(err => {
            console.log(err);
        })
})
document.getElementById("DRshow").addEventListener("click", () => {
    const emailId = localStorage.getItem("emailId");
    document.getElementById("tran_type").innerHTML = "Details";
    var API = `http://127.0.0.1:3000/fetch_record?email=${emailId}&Ttype=DR`;
    fetch(API)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setData(data);
        }
        )
        .catch(err => {
            console.log(err);
        })
})

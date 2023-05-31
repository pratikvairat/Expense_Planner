

function fetchData() {
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var emailId = localStorage.getItem("emailId");
    var contact= document.getElementById("contact");
    console.log(emailId);
    var API = "http://127.0.0.1:3000/account-details?email=" + emailId;
    fetch(API)
        .then((response) => { 
            
            return response.json(); })
        .then(data => {
            name.innerHTML = data.firstName + " " + data.lastName;
            email.innerHTML = data.email;
            contact.innerHTML= data.contact;
        })
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
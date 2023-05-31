const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Pratik@123',
  database: 'expense',
});

app.post('/register', (req, res) => {
  const { email, fname, lname, passd, contact } = req.body;

  // Check if the user with the same email already exists
  const checkQuery = 'SELECT * FROM Accounts WHERE Email = ?';
  const checkValues = [email];

  pool.query(checkQuery, checkValues, (error, results) => {
    if (error) {
      console.error('Error checking user:', error);
      res.status(500).send('Error checking user');
    } else {
      // If a user with the same email already exists, send an error response
      if (results.length > 0) {
        res.status(400).send('User with the same email already exists');
      } else {
        // If the user does not exist, proceed with registration
        const insertQuery = 'INSERT INTO Accounts (Email, Fname, Lname, passd, contact) VALUES (?, ?, ?, ?, ?)';
        const insertValues = [email, fname, lname, passd, contact];

        pool.query(insertQuery, insertValues, (error, results) => {
          if (error) {
            console.error('Error registering user:', error);
            res.status(500).send('Error registering user');
          } else {
            console.log('User registered successfully');
            res.send('User registered successfully');
          }
        });
      }
    }
  });
});

app.post('/login', (req, res) => {
  const { email, passd } = req.body;

  // Check if the user exists with the given email and password
  const query = 'SELECT * FROM Accounts WHERE Email = ? AND passd = ?';
  const values = [email, passd];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error authenticating user:', error);
      res.status(500).send('Error authenticating user');
    } else {
      // If a user is found with the given email and password, send a success response
      if (results.length > 0) {
        res.send('Login successful');
      } else {
        // If the user does not exist or the credentials are incorrect, send an error response
        res.status(401).send('Invalid email or password');
      }
    }
  });
});

app.get('/account-details', (req, res) => {
  const email = req.query.email;
  const SQLQuery = 'SELECT Email, Fname, Lname, contact FROM Accounts WHERE Email = ?';
  const values = [email];

  pool.query(SQLQuery, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving account details');
    } else {
      console.log(result);
      res.json({
        email: result[0].Email,
        firstName: result[0].Fname,
        lastName: result[0].Lname,
        contact: result[0].contact
      });
    }
  });
});
app.get("/balance_fetch",(req,res)=>{
  const {email,Ttype}=req.query;
  const SQLQuery="SELECT sum(amount) FROM transact WHERE Email=? AND Ttype=?";
  const values=[email,Ttype];

  pool.query(SQLQuery,values,(err,result)=>{
    if(err){
      console.log(err);
    }else{
      console.log(result);
      res.json({
        amount: result
      })
    }
  })
})
app.post('/add_record',(req,res)=>{
  const {emailId,amount,Ttype,details}=req.body;
  const SQLQuery='INSERT INTO transact(email,ttype,amount,detail,Tdate) values (?,?,?,?,CURRENT_DATE());'
  const values=[emailId,Ttype,amount,details];
  pool.query(SQLQuery,values,(err,result)=>{
    if(err){
      console.log(err);
      res.send("Error in adding records");
    }else{
      res.send("Record added succussfully");
    }
  })
})
app.get('/fetch_record',(req,res)=>{
  const {email,Ttype}=req.query;
  const SQLQuery="SELECT amount,detail,Tdate FROM transact WHERE Email= ? and Ttype = ?";
  const values=[email,Ttype];
  pool.query(SQLQuery,values,(err,result)=>{
    if(err){
      console.log(err);
    }else{
      res.json({
       result
      })
    }
  })
})
app.get('/fetch_all_records',(req,res)=>{
  const {email,Ttype}=req.query;
  const SQLQuery="SELECT amount,Ttype,detail,Tdate FROM transact WHERE Email= ?";
  const values=[email,Ttype];
  pool.query(SQLQuery,values,(err,result)=>{
    if(err){
      console.log(err);
    }else{
      res.json({
       result
      })
    }
  })
})
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

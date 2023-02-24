const express = require("express");
const app = express();
const cors = require('cors');
const con = require('./DB/config');
app.use(cors());
app.use(express.json());



// routing

// get book list
app.get('/', (req, res)=>{
    con.query('select * from books',(err, result)=>{
        if(err){
            res.send(err)
        }else{
           res.send(result)
        }
    })
})

// book search

app.get('/search/:key',(req, res)=>{
    // let booktitle = req.key.book_title
    let sql= `SELECT * from books WHERE book_title LIKE '%${req.params.key}%'`;
con.query(sql, (err, result, field)=>{
    if(err){
        res.send(err)
    }else{
        res.send(result)
    } 
})
})
// login
app.post('/login',(req, res)=>{

    let email = req.body.cust_email;
    console.log(req.body)
    con.query('select * from customers WHERE cust_email=? AND cust_pass=?',[req.body.cust_email, req.body.cust_pass], (err, result,field)=>{
        if(err){
            res.send(err)
        }else{
           if(result.length>0){
            res.send(result)
            console.log(result)
           }else{
            res.send({message:'User Not Found'})
           }
           
        } 
    })
})

// place order
app.post('/myorder', (req, res)=>{
    con.query('INSERT INTO cust_orders SET ?',req.body, (err, result, field)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
})

// orderlist

app.get('/orderlist/:cust_id',(req,res)=>{
    con.query(`select * from cust_orders WHERE cust_id=${req.params.cust_id}`, (err, result, field)=>{
        if(err){
            res.send(err)
        }else{
            if(result.length>0){
                res.send(result)
            }else{
                res.send({message:'Data not found'})
            }
          
        }
    })
})
// search book in myorder list

app.get('/myordersearch/:key',(req, res)=>{
   
    let sql= `SELECT * from cust_orders WHERE book_title LIKE '%${req.params.key}%'`;
con.query(sql, (err, row, field)=>{
    if(err){
        res.send(err)
    }else{
        res.send(row)
    } 
})
})

// my order price fillter

app.get('/pricefilter/:price', (req, res)=>{
    let price = req.params.price;
   let fprice = price.split('-');
    // console.log(fprice[0], fprice[1])
    con.query(`SELECT * FROM cust_orders WHERE total_price BETWEEN ${fprice[0]} AND ${fprice[1]}`,
     (err, result, field)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
})

// date wise order fillter

app.get('/datewiseorderfillter/:filterdatewise',(req, res)=>{
  let  filterdate = req.params.filterdatewise;
  let splitfilterdate =filterdate.split('.');

  console.log(splitfilterdate[0]);
    con.query(`SELECT * FROM cust_orders WHERE purchase_date BETWEEN '${splitfilterdate[0]} 00:00:00' AND '${splitfilterdate[1]} 23:59:59' `
    ,(err, result, field)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
})

// pyrchase date sorting

app.get('/purchasedatesorting', (req, res)=>{

    con.query('SELECT * FROM cust_orders ORDER BY purchase_date', (err, result, field)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
})
app.get('/pricesorting', (req, res)=>{

    con.query('SELECT * FROM cust_orders ORDER BY total_price', (err, result, field)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
})
app.listen(5000)
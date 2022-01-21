const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 6677
app.use(express.urlencoded({ extended: false}));
const koneksiDB = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "",
    database: "week2"
})
koneksiDB.connect((err) => {
    if(err) {
        console.log("koneksi database gagal");
    }else{
        console.log("koneksi sukses");
    }
})
app.get("/express/Drink", (req,res) => {
    let sql = "SELECT * FROM Drink";
    koneksiDB.query(sql, ( err, result) =>{
        if(err) {
            res.send({
                msg: "gagal mengambil data",
                status: 500,
                err,
            })
        }else{
            res.send({
                msg: "sukses mengambil data",
                status: 200,
                data: result
            })
        }
    })
})
app.post("/express/Drink", (req,res) =>{
    let {body} = req;
    let sql = "INSERT INTO Drink SET ?";
    koneksiDB.query(sql,body,(err,result) =>{
        if(err) {
            res.send({
                msg: "gagal menginput data",
                status: 500,
                err,
            });
        }else{
            let newBody = {
                id: result.insertId,
                ...body,
            };
            res.send({
                msg: "input data sukses",
                status: 200,
                data: newBody,
            });
        }
    });
});
app.get("/express/Drink/:id", (req,res) => {
    let {id} = req.params;
    let sql = `SELECT * FROM Drink WHERE id=${id}`;
    koneksiDB.query(sql, (err,result) =>{
        if(err){
            res.send({
                msg: "mengambil data gagal",
                status: 500,
                err,
            });
        }else{
            res.send({
                msg: "sukses mengambil data by id",
                status: 200,
                data: result
            });
        }
    })
})
app.delete("/express/Drink/:id", (req,res) =>{
    let {id} = req.params;
    let sql = `DELETE FROM Drink WHERE id=${id}`;
    koneksiDB.query(sql,(err,result) =>{
        if(err) {
            res.send({
                msg: "delet data error",
                status: 500,
                err,
            })
        }else{
            res.send({
                msg: "delete data sukses",
                status: 200,
                data: result,
            })
        }
    })
})
app.put("/express/Drink/:id", (req,res) => {
    let sql = "UPDATE Drink SET nama_makanan='"+req.body.nama_minuman+"', harga='"+req.body.harga+"' WHERE id="+req.params.id;
    koneksiDB.query(sql, (err,result) =>{
        if(err) {
            res.send({
                msg: "edit data error",
                status: 500,
                err,
            })
        }else{
            res.send({
                msg: "edit data sukses",
                status: 200,
                data: result,
            })
        }
    })
})
app.listen(port , () =>{
    console.log("server berjalan di port "+port);
})
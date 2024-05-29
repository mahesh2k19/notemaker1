import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();


app.use(express.json());
app.use(cors())



const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "20170806011",
    database: "test",
});




app.get("/", (req, res) => {
    res.json("hello this is backend");
});

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books",(req, res) => {
    const q = "INSERT INTO books (`tiitle`,`desci`,`cover`) VALUES (?)";
    
    const values = [
        req.body.tiitle,
        req.body.desci,
        req.body.cover,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been created successfully");
    });
});

app.delete("/books/:id", (req, res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q,[bookId],(err, data)=>{
        if (err) return res.json(err);
        return res.json("Book has been Deleted successfully");

    });
});

app.put("/books/:id", (req, res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET `tiitle`=?, `desci`=?, `cover`=? WHERE id = ?";

    const values=[
        req.body.tiitle,
        req.body.desci,
        req.body.cover,
    ]

    db.query(q,[...values,bookId],(err, data)=>{
        if (err) return res.json(err);
        return res.json("Book has been Updated successfully");

    });
});


app.listen(5500, () => {
    console.log("connected to backend!1")
});
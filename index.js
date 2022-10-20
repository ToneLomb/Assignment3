const express = require('express');
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'lucas',
      password: 'admin',
      database: 'webassignment'
    }
  });
const app = express();
const path = require('path');
const port = 3000;
const sql = require('./js/sql');




app.use(express.static('public'));

app.get('/', function (req, res) {
    //res.send("Hello world");
    res.sendFile(__dirname + '/index.html');
})

app.get('/readclub/:Firstname', function (req, res) {
    const clubs = sql.getClubByFirstname(req.params.Firstname);
    clubs.then(clubs => {
        if(clubs.status === "success"){
            res.json(clubs.data[0].name)
        }else{
            res.send(clubs.data)
        }
        });
    })

app.get('/createclub/:name/:sport', function (req,res) {
        const club = sql.createClub(req.params.name,req.params.sport);
        club.then( clubs => {
            if(clubs.status === "success"){
                const select = sql.selectClubID(req.params.name);
                select.then(rows =>{
                rows.forEach(row => {
                    let clubJSON = {ClubID: row.ClubID, Name: row.Name, Sport: row.Sport, SchoolID: row.SchoolID}
                    res.json(clubJSON)
                })
            })
            }else{
                res.json(clubs)
            }
        })
    });

app.get('/updatestudent/:id/:firstname/:lastname/:age/:schoolID', function (req,res) {
    const queryUpdate = sql.updateStudent(req.params.id,req.params.firstname,req.params.lastname,req.params.age,req.params.schoolID);
    queryUpdate.then(query => {
        if(query.success === "true"){
            res.json({success: "true"})
        }else{
            res.json({success: query.success,reason: query.reason})
        }
    })
})

app.get('/deleteclub/:id', function(req,res){
    const delQuery = sql.deleteClub(req.params.id);
    delQuery.then(query =>{
        if(query.success === "true"){
            res.json({success: "true"})
        }else{
            res.json({success: query.success,reason: query.reason})
        }
    })
})


app.get('/*', (req,res) =>{
    res.send("Error 404 not found");
})

app.listen(port, () => {
  console.log("Example app listening on port 3000");
})



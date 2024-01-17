/********************************************************************************
* WEB422 – Assignment 1
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Kwai Fong Cheung Student ID: 11951224 Date: Jan 17 2023
*
* Published URL: ___________________________________________________________
*
********************************************************************************/

const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());

const ListingsDB = require("./modules/listingsDB.js");
const db = new ListingsDB();

app.get("/",(req,res)=>{
    res.send({message: "API Listening"})
});

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
    });
    }).catch((err)=>{
    console.log(err);
    })

// CREATE

  app.post("/api/listings", async (req, res) => {
    try {
      await db.addNewListing(req.body);
      res.status(201).send({ message: "Listing added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Failed to add listing" });
    }
  });
  
  
  
  // READ (ONE)
  
  app.get("/api/listings/:id", async (req,res)=>{
    try{
      let listing = await db.getListingById(req.params.id);
      if(listing){
        res.send(listing);
      }else{
        res.status(204).send({message: "No content"});
      }
    }catch(err){
      res.status(404).send({message: err});
    }
  });
  
  // READ (ALL)
  
  app.get("/api/listings", async (req,res)=>{
    try{
        const page = req.query.page || 1;
        const perPage = req.query.perPage || 10;
        const name = req.query.name || null;
        const listing = await db.getAllListings(page, perPage, name);
        res.send(listing);
    }catch (error) {
        res.status(500).send({ message: "Failed to get all listing" });
      }
  });
  
  // UPDATE(ONE)
  
  app.put("/api/listings/:id", async (req,res)=>{
    try{
      await db.updateListingById(req.body, req.params.id);
      res.status(200).send({message: "listing updated successfully"});
    }catch(err){
      res.status(404).send({message: err});
    }
  });
  
  // DELETE (ONE)
  
  app.delete("/api/listings/:id", async (req,res)=>{
    try{
     await db.deleteListingById(req.params.id);
     res.send({message: "listing deleted successfully"});
    }catch(err){
      res.status(404).send({message: err});
    }
  });
  


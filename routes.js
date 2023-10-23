/* Routes for CRUD */


const express = require("express");

const Person = require("./models/person");


const router = new express.Router();

/** Homepage: show CRUD options. */

router.get("/", async function(req, res, next) {
  
    try {
      
      return res.render("base.html");
    } catch (err) {
      return next(err);
    }
  });


router.get("/list", async function(req, res, next) {
   
  try {
    const personas = await Person.all();
    return res.render("person_list.html",{personas});
  } catch (err) {
    return next(err);
  }
});

 /** Form to add a new persona. */

router.get("/add", async function(req, res, next) {
  try {
    return res.render("person_new_form.html");
  } catch (err) {
    return next(err);
  }
});

/** Handle adding a new persona. */

router.post("/add", async function(req, res, next) {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const notes = req.body.notes;

    const person = new Person({ firstName, lastName, phone, notes });
    await person.save();

    return res.redirect(`/${person.id}/`);
  } catch (err) {
    return next(err);
  }
});

/** Show a person, given their ID. */

router.get("/:id/", async function(req, res, next) {
  try {
    const person = await Person.get(req.params.id);
    
    return res.render("person_detail.html", { person});
  } catch (err) {
    return next(err);
  }
});

 /** Show form to edit a person. */

router.get("/:id/edit/", async function(req, res, next) {
  try {
    const person = await Person.get(req.params.id);
 
    res.render("person_edit_form.html", {person});
    console.log(person);
  } catch (err) {
    return next(err);
  }
});

/** Handle editing a person. */

router.post("/:id/edit/", async function(req, res, next) {
    
    try {console.log("post edit");
    const person = await Person.get(req.params.id);
    person.firstName = req.body.firstName;
    person.lastName = req.body.lastName;
    person.phone = req.body.phone;
    person.notes = req.body.notes;
    await person.save();

    return res.redirect(`/${person.id}/`);
  } catch (err) {
    return next(err);
  }
})

router.get("/:id/delete/",async function(req,res,next){
    try{
        
        const state = await Person.delete(req.params.id);
        res.redirect("/");   
    }catch(err){
        return next(err);
    }
});

module.exports = router;

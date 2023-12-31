// Set ENV VAR to test before we load anything, so our app's config will use
// testing settings

process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest");
const db = require("../db");
const { SECRET_KEY } = require("../config");


test("Should open the base html", async function() {
    const response = await request(app)
      .get("/")
    expect(response.statusCode).toBe(200);
  });

  test("should list all personas", async function() {
    const response = await request(app)
      .get("/list")
    expect(response.statusCode).toBe(200); 
  });

  test("Form to add a new person", async function() {
        const response = await request(app)
        .get("/add")
        expect(response.statusCode).toBe(200);


// test("Form to add a new person", async function() {
//     const response = await request(app)
//       .get("/add")
   
//     expect(response.statusCode).toBe(200);
//     expect(response.body.users.length).toBe(3);
// });


// test("Should add a new person to the DB", async function() {
//     const response = await request(app)
//       .post("/add")
      
//     expect(response.statusCode).toBe(200);
//     expect(response.body.users.length).toBe(3);
//   });

// test("should show an especific person information", async function() {
//     const response = await request(app)
//       .get("/:id/")
      
//     expect(response.statusCode).toBe(200);
//     expect(response.body.users.length).toBe(3);
//   });

//   test("should edit an especific person information", async function() {
//     const response = await request(app)
//       .get("/:id/edit/")
    
//     expect(response.statusCode).toBe(200);
//     expect(response.body.users.length).toBe(3);
//   });

//   test("Should delete an especific person information in the DB", async function() {
//     const response = await request(app)
//       .get("/:id/delete/")
    
//     expect(response.statusCode).toBe(200);
//     expect(response.body.users.length).toBe(3);
//   });



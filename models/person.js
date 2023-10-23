/* Person */

const db = require("../db");

/* Person class*/

class Person{
    constructor({id, firstName, lastName, email, phone, notes}){
        this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = firstName+" "+lastName; 
    this.phone = phone;
    this.notes = notes;
    }


/** find all customers. */

static async all() {
  
    const results = await db.query(
      `SELECT id, 
         first_name AS "firstName",  
         last_name AS "lastName",
         phone, 
         notes
       FROM personas
       ORDER BY last_name, first_name`
    );
    console.log("consulta db");
    return results.rows.map(c => new Person(c));
  }



/** save this person in the DB. */

async save() {
  if (this.id === undefined) {
    const result = await db.query(
      `INSERT INTO personas (first_name, last_name, phone, notes)
           VALUES ($1, $2, $3, $4)
           RETURNING id`,
      [this.firstName, this.lastName, this.phone, this.notes]
    );
    this.id = result.rows[0].id;
  } else {
    await db.query(
      `UPDATE personas SET first_name=$1, last_name=$2, phone=$3, notes=$4
           WHERE id=$5`,
      [this.firstName, this.lastName, this.phone, this.notes, this.id]
    );
  }
}

/** get a person by ID. */

static async get(id) {
  const results = await db.query(
    `SELECT id, 
       first_name AS "firstName",  
       last_name AS "lastName", 
       phone, 
       notes 
      FROM personas WHERE id = $1`,
    [id]
  );

  const person = results.rows[0];

  if (person === undefined) {
    const err = new Error(`No such person: ${id}`);
    err.status = 404;
    throw err;
  }

  return new Person(person);
}

static async delete(id){
   await db.query(`DELETE FROM personas WHERE id =$1`,[id]);
  }
};
module.exports = Person;
DROP DATABASE IF EXISTS persona_db;

CREATE DATABASE persona_db;

\c persona_db

DROP TABLE IF EXISTS personas;

CREATE TABLE personas (
    id integer PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text,
    notes text DEFAULT '' NOT NULL
);

INSERT personas (id, first_name, last_name, phone, notes)
VALUES ('1'	,'Anthony',	'Gonzales',	'590-813-4874x723',	'Money voice rate chair war subject kid.'),
('2',	'Joseph',	'Wells',	'\N',	'Else quite deal culture deep candidate exactly'),
('3','Jessica',	'Friedman',	'\N',	'Medical measure despite.');

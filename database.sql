CREATE DATABASE pov;

CREATE TABLE authors(
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(255),
    imageUrl VARCHAR(255)
);

CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(255)
);

CREATE TABLE articles(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    markdownUrl VARCHAR(255),
    categories VARCHAR(255),
    authorId INTEGER,
    timePublished VARCHAR(255),
    imageUrl VARCHAR(255)
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    content VARCHAR(255),
    title VARCHAR(255),
    timeSent VARCHAR(255),
    sentBy VARCHAR(255)
);

INSERT INTO categories (name) VALUES ('Israel');
INSERT INTO categories (name) VALUES ('World');
INSERT INTO categories (name) VALUES ('COVID-19');
INSERT INTO categories (name) VALUES ('Middle East');
INSERT INTO categories (name) VALUES ('Tech');
INSERT INTO categories (name) VALUES ('Economy');
INSERT INTO categories (name) VALUES ('Enviroment');
INSERT INTO categories (name) VALUES ('Travel');

INSERT INTO authors (name, imageUrl) VALUES ('Itay Schechner', '/itay.png');
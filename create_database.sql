CREATE USER dbuser with password 'hello';
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO dbuser;

CREATE TABLE users (
    _id integer PRIMARY KEY,
    username varchar(20) UNIQUE NOT NULL,
    display_name varchar(20) UNIQUE NOT NULL,
    password varchar(120) NOT NULL,
    email varchar(120) UNIQUE NOT NULL,
    email_confirmed boolean DEFAULT false
);

CREATE TABLE blog (
    _id integer PRIMARY KEY, 
    author integer NOT NULL,
    body varchar NOT NULL,
    created bigint NOT NULL,
    edited bigint NOT NULL,
    title varchar(120) NOT NULL,
    FOREIGN KEY(author) REFERENCES users(_id)
);

CREATE TABLE user_tokens (
    _id integer PRIMARY KEY, 
    token uuid NOT NULL,
    user_id integer NOT NULL,
    expires bigint NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(_id)
);

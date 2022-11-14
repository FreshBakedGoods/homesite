


CREATE USER IF NOT EXISTS 'dbuser'@'api';

CREATE SEQUENCE public.blog__id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE	
    CACHE 1;

ALTER TABLE public.blog__id OWNER TO dbadmin;

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE public.blog (
    _id integer DEFAULT nextval('public.blog__id'::regclass) NOT NULL,
    author integer NOT NULL,
    body character varying NOT NULL,
    created bigint NOT NULL,
    edited bigint NOT NULL,
    title character varying(120) NOT NULL
);

ALTER TABLE public.blog OWNER TO dbadmin;

CREATE SEQUENCE public.user_tokens__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.user_tokens__id_seq OWNER TO dbadmin;

CREATE TABLE public.user_tokens (
    _id integer DEFAULT nextval('public.user_tokens__id_seq'::regclass) NOT NULL,
    token uuid NOT NULL,
    user_id integer NOT NULL,
    expires bigint NOT NULL
);

ALTER TABLE public.user_tokens OWNER TO dbadmin;

CREATE SEQUENCE public.users__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.users__id_seq OWNER TO dbadmin;

CREATE TABLE public.users (
    username character varying(20) NOT NULL,
    display_name character varying(20) NOT NULL,
    password character varying(120) NOT NULL,
    email character varying(120) NOT NULL,
    email_confirmed boolean DEFAULT false NOT NULL,
    _id integer DEFAULT nextval('public.users__id_seq'::regclass) NOT NULL
);

ALTER TABLE public.users OWNER TO dbadmin;

ALTER TABLE ONLY public.users
    ADD CONSTRAINT display_name_unique UNIQUE (display_name);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT email_unique UNIQUE (email);

ALTER TABLE ONLY public.blog
    ADD CONSTRAINT pkey_blog PRIMARY KEY (_id);

ALTER TABLE ONLY public.user_tokens
    ADD CONSTRAINT user_tokens_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT username_unique UNIQUE (username);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY public.blog
    ADD CONSTRAINT fkey_author FOREIGN KEY (author) REFERENCES public.users(_id);

ALTER TABLE ONLY public.user_tokens
    ADD CONSTRAINT user_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(_id) ON DELETE CASCADE;

GRANT ALL ON SEQUENCE public.blog__id TO dbadmin;
GRANT ALL ON SEQUENCE public.blog__id TO "dbuser";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.blog TO dbuser;
GRANT ALL ON SEQUENCE public.user_tokens__id_seq TO "dbuser";
GRANT ALL ON SEQUENCE public.user_tokens__id_seq TO dbadmin;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.user_tokens TO "dbuser";
GRANT ALL ON SEQUENCE public.users__id_seq TO "dbuser";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.users TO "dbuser";

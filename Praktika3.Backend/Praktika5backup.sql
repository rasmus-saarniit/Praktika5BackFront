--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-05-11 19:28:57

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 859 (class 1247 OID 16555)
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_users_role AS ENUM (
    'Admin',
    'User'
);


ALTER TYPE public.enum_users_role OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16571)
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16574)
-- Name: activity_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activity_logs (
    id integer NOT NULL,
    user_id integer NOT NULL,
    action character varying(255) NOT NULL,
    details text,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.activity_logs OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16581)
-- Name: activity_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activity_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.activity_logs_id_seq OWNER TO postgres;

--
-- TOC entry 4975 (class 0 OID 0)
-- Dependencies: 219
-- Name: activity_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activity_logs_id_seq OWNED BY public.activity_logs.id;


--
-- TOC entry 220 (class 1259 OID 16582)
-- Name: authors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authors (
    author_id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.authors OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16585)
-- Name: authors_author_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.authors_author_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.authors_author_id_seq OWNER TO postgres;

--
-- TOC entry 4976 (class 0 OID 0)
-- Dependencies: 221
-- Name: authors_author_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.authors_author_id_seq OWNED BY public.authors.author_id;


--
-- TOC entry 222 (class 1259 OID 16586)
-- Name: book_author; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.book_author (
    book_id integer,
    author_id integer
);


ALTER TABLE public.book_author OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16589)
-- Name: books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books (
    book_id integer NOT NULL,
    title character varying(255) NOT NULL,
    publication_year integer,
    category_id integer
);


ALTER TABLE public.books OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16592)
-- Name: books_book_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.books_book_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.books_book_id_seq OWNER TO postgres;

--
-- TOC entry 4977 (class 0 OID 0)
-- Dependencies: 224
-- Name: books_book_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.books_book_id_seq OWNED BY public.books.book_id;


--
-- TOC entry 225 (class 1259 OID 16593)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    category_id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16596)
-- Name: categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_category_id_seq OWNER TO postgres;

--
-- TOC entry 4978 (class 0 OID 0)
-- Dependencies: 226
-- Name: categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;


--
-- TOC entry 227 (class 1259 OID 16597)
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    book_id integer NOT NULL,
    user_id integer NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16604)
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comments_id_seq OWNER TO postgres;

--
-- TOC entry 4979 (class 0 OID 0)
-- Dependencies: 228
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- TOC entry 229 (class 1259 OID 16605)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role public.enum_users_role DEFAULT 'User'::public.enum_users_role NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16611)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 4980 (class 0 OID 0)
-- Dependencies: 230
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 4778 (class 2604 OID 16615)
-- Name: activity_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_logs ALTER COLUMN id SET DEFAULT nextval('public.activity_logs_id_seq'::regclass);


--
-- TOC entry 4781 (class 2604 OID 16616)
-- Name: authors author_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors ALTER COLUMN author_id SET DEFAULT nextval('public.authors_author_id_seq'::regclass);


--
-- TOC entry 4782 (class 2604 OID 16617)
-- Name: books book_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books ALTER COLUMN book_id SET DEFAULT nextval('public.books_book_id_seq'::regclass);


--
-- TOC entry 4783 (class 2604 OID 16618)
-- Name: categories category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);


--
-- TOC entry 4784 (class 2604 OID 16619)
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- TOC entry 4787 (class 2604 OID 16620)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 4956 (class 0 OID 16571)
-- Dependencies: 217
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20250329111956-create_books_categories_authors.js
20250407175314-create-users.js
20250408171955-create-activity-log.js
20250408173623-create-comments.js
20250323093931-create-category.js
20250329111258-create-book.js
20250329114141-create-author.js
\.


--
-- TOC entry 4957 (class 0 OID 16574)
-- Dependencies: 218
-- Data for Name: activity_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.activity_logs (id, user_id, action, details, "createdAt", "updatedAt") FROM stdin;
1	1	Add Comment	Added a comment to book ID 3	2025-04-08 21:32:52.51+03	2025-04-08 21:32:52.51+03
2	1	Update Book	Updated book ID 1: title="tegevuslogi", publicationYear=2025	2025-04-08 21:33:51.038+03	2025-04-08 21:33:51.038+03
3	1	Update Category	Updated category for book ID 1 to "Computers"	2025-04-08 21:33:51.05+03	2025-04-08 21:33:51.05+03
4	1	Update Authors	Updated authors for book ID 1 to "Rasmuss, Tobujuss, Paluntööta, "	2025-04-08 21:33:51.073+03	2025-04-08 21:33:51.073+03
5	2	View Books	User viewed all books.	2025-04-08 22:06:14.743+03	2025-04-08 22:06:14.743+03
6	2	View Books	User viewed all books.	2025-04-08 22:06:33.639+03	2025-04-08 22:06:33.639+03
7	2	Add Comment	User added a comment to book ID 4.	2025-04-08 22:06:43.87+03	2025-04-08 22:06:43.87+03
8	2	View Books	User viewed all books.	2025-04-08 22:06:46.99+03	2025-04-08 22:06:46.99+03
9	2	View Books	User viewed all books.	2025-04-08 22:09:44.061+03	2025-04-08 22:09:44.061+03
10	1	View Books	User viewed all books.	2025-04-08 22:10:00.154+03	2025-04-08 22:10:00.154+03
11	2	View Books	User viewed all books.	2025-04-08 22:14:19.796+03	2025-04-08 22:14:19.796+03
12	2	Add Comment	User added a comment to book ID 3.	2025-04-08 22:14:30.396+03	2025-04-08 22:14:30.396+03
13	2	View Books	User viewed all books.	2025-04-08 22:14:31.888+03	2025-04-08 22:14:31.888+03
14	1	View Books	User viewed all books.	2025-04-08 22:14:47.916+03	2025-04-08 22:14:47.916+03
15	1	View Books	User viewed all books.	2025-04-08 22:17:36.582+03	2025-04-08 22:17:36.582+03
16	1	View Books	User viewed all books.	2025-04-08 22:17:48.736+03	2025-04-08 22:17:48.736+03
17	1	View Books	User viewed all books.	2025-04-08 22:18:03.211+03	2025-04-08 22:18:03.211+03
18	1	View Books	User viewed all books.	2025-04-08 22:19:41.866+03	2025-04-08 22:19:41.866+03
19	1	View Books	User viewed all books.	2025-04-08 22:19:48.046+03	2025-04-08 22:19:48.046+03
20	1	View Books	User viewed all books.	2025-04-08 22:21:16.864+03	2025-04-08 22:21:16.864+03
21	1	Update Book	Updated book ID 3: title="tegevuslogid", publicationYear=2025, category="Teadus", authors="Jüri, Rasmus"	2025-04-08 22:21:33.144+03	2025-04-08 22:21:33.144+03
22	1	View Books	User viewed all books.	2025-04-08 22:21:34.379+03	2025-04-08 22:21:34.379+03
23	1	View Books	User viewed all books.	2025-04-08 22:22:46.635+03	2025-04-08 22:22:46.635+03
24	1	Add Comment	User added a comment to book ID 27.	2025-04-08 22:22:52.075+03	2025-04-08 22:22:52.075+03
25	1	View Books	User viewed all books.	2025-04-08 22:22:53.292+03	2025-04-08 22:22:53.292+03
26	2	View Books	User viewed all books.	2025-04-08 22:23:03.555+03	2025-04-08 22:23:03.555+03
27	2	Add Comment	User added a comment to book ID 27.	2025-04-08 22:23:14.362+03	2025-04-08 22:23:14.362+03
28	2	View Books	User viewed all books.	2025-04-08 22:23:15.469+03	2025-04-08 22:23:15.469+03
29	2	View Books	User viewed all books.	2025-04-08 22:27:29.456+03	2025-04-08 22:27:29.456+03
30	2	View Books	User viewed all books.	2025-04-08 22:27:34.075+03	2025-04-08 22:27:34.075+03
31	2	View Books	User viewed all books.	2025-04-08 22:28:20.358+03	2025-04-08 22:28:20.358+03
32	2	View Books	User viewed all books.	2025-04-08 22:28:21.292+03	2025-04-08 22:28:21.292+03
33	2	View Books	User viewed all books.	2025-04-08 22:28:24.028+03	2025-04-08 22:28:24.028+03
34	1	View Books	User viewed all books.	2025-04-08 22:29:04.393+03	2025-04-08 22:29:04.393+03
35	1	View Books	User viewed all books.	2025-04-08 22:29:32.938+03	2025-04-08 22:29:32.938+03
36	1	View Books	User viewed all books.	2025-04-09 18:06:14.927+03	2025-04-09 18:06:14.927+03
37	1	View Books	User viewed all books.	2025-04-09 18:18:50.86+03	2025-04-09 18:18:50.86+03
38	1	Update Book	Updated book ID 3: title="Test raamat", publicationYear=2024, category="Lapsed", authors="Ants, Kaera"	2025-04-09 18:19:14.698+03	2025-04-09 18:19:14.698+03
39	1	View Books	User viewed all books.	2025-04-09 18:19:15.753+03	2025-04-09 18:19:15.753+03
40	1	Add Comment	User added a comment to book ID 3.	2025-04-09 18:19:22.516+03	2025-04-09 18:19:22.516+03
41	1	View Books	User viewed all books.	2025-04-09 18:19:23.457+03	2025-04-09 18:19:23.457+03
42	2	View Books	User viewed all books.	2025-04-09 18:19:52.415+03	2025-04-09 18:19:52.415+03
43	2	Add Comment	User added a comment to book ID 3.	2025-04-09 18:20:01.035+03	2025-04-09 18:20:01.035+03
44	2	View Books	User viewed all books.	2025-04-09 18:20:02.361+03	2025-04-09 18:20:02.361+03
45	1	View Books	User viewed all books.	2025-04-09 18:31:59.839+03	2025-04-09 18:31:59.839+03
46	1	View Books	User viewed all books.	2025-04-09 18:33:58.504+03	2025-04-09 18:33:58.504+03
47	1	Update Book	Updated book ID 3: title="uus test", publicationYear=2023, category="kids", authors="maru, taud"	2025-04-09 18:34:09.426+03	2025-04-09 18:34:09.426+03
48	1	View Books	User viewed all books.	2025-04-09 18:34:10.329+03	2025-04-09 18:34:10.329+03
49	1	View Books	User viewed all books.	2025-04-09 18:34:19.199+03	2025-04-09 18:34:19.199+03
50	1	View Books	User viewed all books.	2025-04-09 19:21:38.823+03	2025-04-09 19:21:38.823+03
51	2	View Books	User viewed all books.	2025-04-09 19:21:52.847+03	2025-04-09 19:21:52.847+03
52	2	Add Comment	User added a comment to book ID 33.	2025-04-09 19:22:06.626+03	2025-04-09 19:22:06.626+03
53	2	View Books	User viewed all books.	2025-04-09 19:22:07.72+03	2025-04-09 19:22:07.72+03
54	1	View Books	User viewed all books.	2025-04-09 19:22:30.268+03	2025-04-09 19:22:30.268+03
55	1	View Books	User viewed all books.	2025-04-09 19:22:38.694+03	2025-04-09 19:22:38.694+03
56	1	View Books	User viewed all books.	2025-04-09 19:33:16.294+03	2025-04-09 19:33:16.294+03
57	2	View Books	User viewed all books.	2025-05-11 15:29:01.046+03	2025-05-11 15:29:01.046+03
58	2	View Books	User viewed all books.	2025-05-11 15:29:01.075+03	2025-05-11 15:29:01.075+03
59	1	View Books	User viewed all books.	2025-05-11 15:30:40.285+03	2025-05-11 15:30:40.285+03
60	1	View Books	User viewed all books.	2025-05-11 15:30:40.542+03	2025-05-11 15:30:40.542+03
61	1	View Books	User viewed all books.	2025-05-11 15:44:40.455+03	2025-05-11 15:44:40.455+03
62	1	View Books	User viewed all books.	2025-05-11 15:44:40.474+03	2025-05-11 15:44:40.474+03
63	1	View Books	User viewed all books.	2025-05-11 15:46:08.197+03	2025-05-11 15:46:08.197+03
64	1	View Books	User viewed all books.	2025-05-11 15:46:08.442+03	2025-05-11 15:46:08.442+03
65	1	View Books	User viewed all books.	2025-05-11 15:46:12.946+03	2025-05-11 15:46:12.946+03
66	1	View Books	User viewed all books.	2025-05-11 15:46:13.272+03	2025-05-11 15:46:13.272+03
67	1	View Books	User viewed all books.	2025-05-11 15:46:55.953+03	2025-05-11 15:46:55.953+03
68	1	View Books	User viewed all books.	2025-05-11 15:46:56.285+03	2025-05-11 15:46:56.285+03
69	1	View Books	User viewed all books.	2025-05-11 15:49:08.199+03	2025-05-11 15:49:08.199+03
70	1	View Books	User viewed all books.	2025-05-11 16:55:43.107+03	2025-05-11 16:55:43.107+03
71	1	View Books	User viewed all books.	2025-05-11 16:55:43.424+03	2025-05-11 16:55:43.424+03
72	1	View Books	User viewed all books.	2025-05-11 16:55:48.284+03	2025-05-11 16:55:48.284+03
73	1	View Books	User viewed all books.	2025-05-11 16:55:48.603+03	2025-05-11 16:55:48.603+03
74	1	View Books	User viewed all books.	2025-05-11 16:55:51.287+03	2025-05-11 16:55:51.287+03
75	1	View Books	User viewed all books.	2025-05-11 16:55:51.614+03	2025-05-11 16:55:51.614+03
76	1	View Books	User viewed all books.	2025-05-11 16:57:30.55+03	2025-05-11 16:57:30.55+03
77	1	View Books	User viewed all books.	2025-05-11 16:57:30.878+03	2025-05-11 16:57:30.878+03
78	1	View Books	User viewed all books.	2025-05-11 16:57:52.623+03	2025-05-11 16:57:52.623+03
79	1	View Books	User viewed all books.	2025-05-11 16:57:52.952+03	2025-05-11 16:57:52.952+03
80	1	View Books	User viewed all books.	2025-05-11 16:58:05.396+03	2025-05-11 16:58:05.396+03
81	1	View Books	User viewed all books.	2025-05-11 16:58:05.72+03	2025-05-11 16:58:05.72+03
82	1	View Books	User viewed all books.	2025-05-11 17:00:03.463+03	2025-05-11 17:00:03.463+03
83	1	View Books	User viewed all books.	2025-05-11 17:00:03.718+03	2025-05-11 17:00:03.718+03
84	1	View Books	User viewed all books.	2025-05-11 17:01:34.524+03	2025-05-11 17:01:34.524+03
85	1	View Books	User viewed all books.	2025-05-11 17:01:34.843+03	2025-05-11 17:01:34.843+03
86	1	View Books	User viewed all books.	2025-05-11 17:14:18.477+03	2025-05-11 17:14:18.477+03
87	1	View Books	User viewed all books.	2025-05-11 17:14:18.805+03	2025-05-11 17:14:18.805+03
88	1	View Books	User viewed all books.	2025-05-11 17:16:47.768+03	2025-05-11 17:16:47.768+03
89	1	View Books	User viewed all books.	2025-05-11 17:16:48.102+03	2025-05-11 17:16:48.102+03
90	1	Update Book	Updated book ID 81: title="acer creta saepe", publicationYear=2002, category="Sport", authors=""	2025-05-11 17:16:51.361+03	2025-05-11 17:16:51.361+03
91	1	Add Comment	User added a comment to book ID 81.	2025-05-11 17:17:00.711+03	2025-05-11 17:17:00.711+03
92	1	View Books	User viewed all books.	2025-05-11 17:17:02.509+03	2025-05-11 17:17:02.509+03
93	1	View Books	User viewed all books.	2025-05-11 17:17:02.834+03	2025-05-11 17:17:02.834+03
94	1	View Books	User viewed all books.	2025-05-11 17:17:05.479+03	2025-05-11 17:17:05.479+03
95	1	View Books	User viewed all books.	2025-05-11 17:17:05.806+03	2025-05-11 17:17:05.806+03
96	1	Update Book	Updated book ID 32: title="adflicto basium vetus", publicationYear=2003, category="Autod", authors=""	2025-05-11 17:17:16.53+03	2025-05-11 17:17:16.53+03
97	1	View Books	User viewed all books.	2025-05-11 17:17:18.392+03	2025-05-11 17:17:18.392+03
98	1	View Books	User viewed all books.	2025-05-11 17:17:18.717+03	2025-05-11 17:17:18.717+03
99	1	View Books	User viewed all books.	2025-05-11 17:21:34.705+03	2025-05-11 17:21:34.705+03
100	1	View Books	User viewed all books.	2025-05-11 17:21:35.043+03	2025-05-11 17:21:35.043+03
101	1	View Books	User viewed all books.	2025-05-11 17:22:43.647+03	2025-05-11 17:22:43.647+03
102	1	View Books	User viewed all books.	2025-05-11 17:22:43.66+03	2025-05-11 17:22:43.66+03
103	1	View Books	User viewed all books.	2025-05-11 17:25:48.692+03	2025-05-11 17:25:48.692+03
104	1	View Books	User viewed all books.	2025-05-11 17:25:48.706+03	2025-05-11 17:25:48.706+03
105	1	View Books	User viewed all books.	2025-05-11 17:27:03.072+03	2025-05-11 17:27:03.072+03
106	1	View Books	User viewed all books.	2025-05-11 17:27:03.39+03	2025-05-11 17:27:03.39+03
107	1	View Books	User viewed all books.	2025-05-11 17:31:26.412+03	2025-05-11 17:31:26.412+03
108	1	View Books	User viewed all books.	2025-05-11 17:31:26.437+03	2025-05-11 17:31:26.437+03
109	1	Add Book	Added book "NewbookPage test" with ID 82	2025-05-11 17:31:48.812+03	2025-05-11 17:31:48.812+03
110	1	View Books	User viewed all books.	2025-05-11 17:31:49.016+03	2025-05-11 17:31:49.016+03
111	1	View Books	User viewed all books.	2025-05-11 17:31:49.138+03	2025-05-11 17:31:49.138+03
112	1	Add Comment	Admin (admin@example.com) added a comment to book ID 32.	2025-05-11 17:39:39.57+03	2025-05-11 17:39:39.57+03
113	2	Add Comment	User (user@example.com) added a comment to book ID 31.	2025-05-11 18:26:57.241+03	2025-05-11 18:26:57.241+03
114	2	Add Comment	User (user@example.com) added a comment to book ID 3.	2025-05-11 18:35:52.432+03	2025-05-11 18:35:52.432+03
115	2	Add Comment	User (user@example.com) added a comment to book ID 81.	2025-05-11 18:36:05.521+03	2025-05-11 18:36:05.521+03
116	1	Update Book	Admin (admin@example.com) updated book ID 81: title="acer creta saepe", publicationYear=2002, category="Sport", authors="Francisco Abernathy, Philip Barrows, Mrs. Marsha McDermott"	2025-05-11 18:39:27.881+03	2025-05-11 18:39:27.881+03
\.


--
-- TOC entry 4959 (class 0 OID 16582)
-- Dependencies: 220
-- Data for Name: authors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.authors (author_id, name) FROM stdin;
1	Gabriel Gusikowski
2	Dr. Lucy Streich
3	Gladys Mayert
4	Boyd Boehm
5	Vernon Nitzsche
6	Cristina Hettinger
7	Alexis Emmerich
8	Bridget Fadel
9	Mattie Swaniawski
10	Roxanne Maggio II
11	Doris Adams
12	Alma Herman
13	Loretta Ratke
14	Bernadette Lockman
15	Mr. Shaun Leuschke
16	Miss Amelia Welch-Kessler
17	Cheryl Keeling
18	Amber McCullough
19	Tracy Deckow
20	Charlie Williamson-Ernser
21	Lynda Russel
22	Rickey Leffler
23	Kendra Hirthe
24	Craig Boyle
25	Luz Gleason MD
26	Miss Monique Hamill I
27	Catherine Schultz
28	Dr. Saul Jerde
29	Hugo Bode MD
30	Larry Bauch
31	Erika Zboncak
32	Ignacio Schuppe DVM
33	Natasha Zulauf
34	Clayton Williamson
35	Beulah Brown
36	Daniel Hoppe
37	Eva Collins
38	Dr. Cody VonRueden
39	Mrs. Mildred Weber V
40	Carrie Hessel
41	Francisco Abernathy
42	Dr. Ann Howe
43	Lynne Gulgowski
44	Rodney Hamill
45	Philip Barrows
46	Angel Hane
47	Emanuel Hills
48	Mrs. Marsha McDermott
49	Heather Kuphal
50	Mr. Woodrow Larkin
51	Lev Tolstoi
52	Rasmus Saarniit
53	Rasmus
54	Jüri
55	
56	Rasmuss
57	Tobujuss
58	Paluntööta
59	Ants
60	Kaera
61	maru
62	taud
63	Ras
64	Mus
65	1234
\.


--
-- TOC entry 4961 (class 0 OID 16586)
-- Dependencies: 222
-- Data for Name: book_author; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.book_author (book_id, author_id) FROM stdin;
4	16
4	15
4	13
5	13
6	20
6	17
7	12
8	11
9	13
9	15
10	11
10	13
11	15
12	11
12	12
12	14
13	16
13	19
13	14
14	12
14	19
16	18
16	11
16	15
17	16
17	11
17	18
18	11
19	18
19	20
20	15
20	20
20	17
21	16
21	20
22	21
23	26
23	23
24	21
24	29
25	24
25	27
25	29
26	27
27	29
28	24
28	29
29	24
29	28
30	25
30	27
31	22
32	22
32	30
32	28
33	24
33	22
34	23
35	24
35	29
35	22
36	23
37	29
38	30
38	29
38	28
39	26
40	26
40	21
41	28
41	29
42	32
43	38
44	34
44	33
44	37
45	34
46	33
46	37
47	37
47	35
47	38
48	40
48	34
48	39
49	32
50	40
50	31
51	40
51	34
52	32
52	34
52	39
53	38
54	38
55	33
56	33
57	36
58	33
58	36
59	40
59	37
60	35
60	39
60	31
61	33
61	32
61	38
62	45
62	41
62	44
63	46
63	42
63	48
64	44
64	42
65	46
65	41
65	43
66	49
67	48
67	41
67	42
68	42
68	48
68	43
69	42
70	44
70	46
71	47
71	49
72	50
72	45
73	48
73	41
73	49
74	50
74	43
75	43
75	48
76	49
76	50
77	44
77	43
78	44
78	47
79	43
79	42
79	44
80	42
81	45
81	41
81	48
1	56
1	57
1	58
1	55
3	61
3	62
82	63
82	64
82	65
\.


--
-- TOC entry 4962 (class 0 OID 16589)
-- Dependencies: 223
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.books (book_id, title, publication_year, category_id) FROM stdin;
4	varietas cunabula advenio	2025	8
5	carpo cribro volo	2024	9
6	torrens cervus ustulo	2024	6
7	ustulo adaugeo trucido	2024	6
8	artificiose tamquam denego	2024	7
9	sodalitas cohaero tendo	2025	7
10	patruus vesper argentum	2024	9
11	possimus corona aspicio	2025	6
12	vigor vulgo minima	2024	7
13	desolo avarus cotidie	2025	10
14	desparatus casus adficio	2024	8
16	deduco clarus recusandae	2024	7
17	suggero aeternus vulnus	2024	6
18	animus templum pauci	2024	6
19	ago aggredior aperio	2024	10
20	amaritudo ambulo nesciunt	2024	9
21	amissio peccatus aliquid	2024	8
22	terror curiositas dolore	2024	11
23	vere theca angelus	2024	11
24	coma cunabula suppellex	2025	11
26	trucido magni nisi	2024	13
27	arma consequatur amplexus	2024	11
28	vinco thalassinus abutor	2024	15
29	paulatim color commodo	2025	12
30	defleo dens tracto	2025	15
31	adicio vero copiose	2025	11
33	stips bestia tergum	2024	14
34	condico desparatus talus	2024	12
35	cura uterque voluptate	2024	12
36	deorsum tribuo rem	2024	14
37	solum tergo asperiores	2024	12
38	comes vir non	2024	13
39	decens conor agnosco	2025	11
40	socius nobis toties	2024	13
41	deleniti attonbitus commemoro	2024	13
42	temptatio itaque certe	2024	17
43	usitas et cui	2025	18
44	debilito admoveo absorbeo	2025	19
45	caterva absens suffragium	2024	19
46	assumenda celer tempora	2024	19
47	vox cilicium sollers	2024	17
48	teneo quia vergo	2024	19
49	considero tergo surgo	2025	18
50	tenax amissio alius	2024	16
51	aetas eum hic	2024	17
52	cunabula spoliatio tremo	2025	17
53	stella ullus tamquam	2024	17
54	dapifer barba infit	2024	18
55	excepturi tego ventito	2024	16
56	corporis possimus addo	2024	18
57	utor cras sortitus	2024	19
58	tersus alienus autem	2024	19
59	ventosus validus attonbitus	2025	18
60	ago spargo tolero	2024	19
61	saepe considero virgo	2024	17
62	curatio suscipio arbustum	2025	25
63	corpus solus vallum	2024	21
64	artificiose campana culpa	2024	21
65	communis repudiandae fugiat	2024	24
66	bellum creo stipes	2025	22
67	admoneo blandior tabella	2024	21
68	cetera animadverto artificiose	2024	23
69	expedita conscendo talis	2024	21
70	amplitudo depromo adfectus	2024	25
71	doloremque decerno aetas	2025	24
72	nemo velit voluptas	2024	25
73	peccatus sequi combibo	2024	21
74	dapifer validus uberrime	2025	22
75	viridis officiis acquiro	2024	22
76	arcus dolore vis	2024	24
77	calamitas confido socius	2024	21
78	victoria templum atqui	2024	22
79	harum ducimus utilis	2024	24
80	demergo laudantium ipsum	2024	23
25	kommejant	2022	14
1	tegevuslogi	2025	27
3	uus test	2023	29
81	acer creta saepe	2002	30
32	adflicto basium vetus	2003	31
82	NewbookPage test	2026	32
\.


--
-- TOC entry 4964 (class 0 OID 16593)
-- Dependencies: 225
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (category_id, name) FROM stdin;
1	Outdoors
2	Games
3	Sports
4	Outdoors
5	Tools
6	Movies
7	Books
8	Health
9	Baby
10	Baby
11	Automotive
12	Baby
13	Books
14	Outdoors
15	Beauty
16	Jewelry
17	Garden
18	Games
19	Automotive
20	Sports
21	Books
22	Health
23	Tools
24	Games
25	Grocery
26	Teadus
27	Computers
28	Lapsed
29	kids
30	Sport
31	Autod
32	Ulme
\.


--
-- TOC entry 4966 (class 0 OID 16597)
-- Dependencies: 227
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, book_id, user_id, content, "createdAt", "updatedAt") FROM stdin;
1	3	1	Admini poolne kommentaar	2025-04-08 20:37:23.963+03	2025-04-08 20:37:23.963+03
2	20	1	komm tehtud	2025-04-08 20:53:43.89+03	2025-04-08 20:53:43.89+03
3	25	1	kommejant	2025-04-08 21:13:24.111+03	2025-04-08 21:13:24.111+03
4	3	1	uus kommike	2025-04-08 21:32:52.501+03	2025-04-08 21:32:52.501+03
5	4	2	oioioi	2025-04-08 22:06:43.865+03	2025-04-08 22:06:43.865+03
6	3	2	ooookdi	2025-04-08 22:14:30.391+03	2025-04-08 22:14:30.391+03
7	27	1	vigur	2025-04-08 22:22:52.064+03	2025-04-08 22:22:52.064+03
8	27	2	on jah vigur	2025-04-08 22:23:14.348+03	2025-04-08 22:23:14.348+03
9	3	1	test komm	2025-04-09 18:19:22.512+03	2025-04-09 18:19:22.512+03
10	3	2	test komm 2	2025-04-09 18:20:01.024+03	2025-04-09 18:20:01.024+03
11	33	2	Viimane test  ma loodan.	2025-04-09 19:22:06.62+03	2025-04-09 19:22:06.62+03
12	81	1	Kommentaar	2025-05-11 17:17:00.699+03	2025-05-11 17:17:00.699+03
13	32	1	Rolli test	2025-05-11 17:39:39.559+03	2025-05-11 17:39:39.559+03
14	31	2	beep boop	2025-05-11 18:26:57.236+03	2025-05-11 18:26:57.236+03
15	3	2	Datetime kommentaar	2025-05-11 18:35:52.424+03	2025-05-11 18:35:52.424+03
16	81	2	lisa kommmentaar näita veel	2025-05-11 18:36:05.518+03	2025-05-11 18:36:05.518+03
\.


--
-- TOC entry 4968 (class 0 OID 16605)
-- Dependencies: 229
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, email, password, role, "createdAt", "updatedAt") FROM stdin;
1	admin@example.com	$2b$10$gFZDT7f3xSu5r2Sk0hw/7.XdYUnQhdO8GsCB2zJ.aUh/jOun1xk8q	Admin	2025-04-07 20:53:58.683+03	2025-04-07 20:53:58.683+03
2	user@example.com	$2b$10$srPG9kuNMcKZ0Nh.7818nueAAN5wjd7FUI3GfNak5E.LNhCCgrXRG	User	2025-04-07 20:53:58.745+03	2025-04-07 20:53:58.745+03
\.


--
-- TOC entry 4981 (class 0 OID 0)
-- Dependencies: 219
-- Name: activity_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activity_logs_id_seq', 116, true);


--
-- TOC entry 4982 (class 0 OID 0)
-- Dependencies: 221
-- Name: authors_author_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.authors_author_id_seq', 65, true);


--
-- TOC entry 4983 (class 0 OID 0)
-- Dependencies: 224
-- Name: books_book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.books_book_id_seq', 82, true);


--
-- TOC entry 4984 (class 0 OID 0)
-- Dependencies: 226
-- Name: categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_category_id_seq', 32, true);


--
-- TOC entry 4985 (class 0 OID 0)
-- Dependencies: 228
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 16, true);


--
-- TOC entry 4986 (class 0 OID 0)
-- Dependencies: 230
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 2, true);


--
-- TOC entry 4790 (class 2606 OID 16628)
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- TOC entry 4792 (class 2606 OID 16630)
-- Name: activity_logs activity_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT activity_logs_pkey PRIMARY KEY (id);


--
-- TOC entry 4794 (class 2606 OID 16632)
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (author_id);


--
-- TOC entry 4796 (class 2606 OID 16634)
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (book_id);


--
-- TOC entry 4798 (class 2606 OID 16636)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- TOC entry 4800 (class 2606 OID 16638)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 4802 (class 2606 OID 16640)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4804 (class 2606 OID 16642)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4805 (class 2606 OID 16643)
-- Name: activity_logs activity_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT activity_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 4806 (class 2606 OID 16648)
-- Name: book_author book_author_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_author
    ADD CONSTRAINT book_author_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(author_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4807 (class 2606 OID 16653)
-- Name: book_author book_author_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_author
    ADD CONSTRAINT book_author_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(book_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4808 (class 2606 OID 16658)
-- Name: books books_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(category_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4809 (class 2606 OID 16663)
-- Name: comments comments_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(book_id) ON DELETE CASCADE;


--
-- TOC entry 4810 (class 2606 OID 16668)
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


-- Completed on 2025-05-11 19:28:57

--
-- PostgreSQL database dump complete
--


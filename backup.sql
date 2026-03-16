--
-- PostgreSQL database dump
--

\restrict 8ArnfruvMFzjrpuxLxWyOCsUhcsIzEuFvnBGWO8sSMmfweugEm0EL6KkwfVtgoV

-- Dumped from database version 15.17 (Debian 15.17-1.pgdg13+1)
-- Dumped by pg_dump version 15.17 (Debian 15.17-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: expenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expenses (
    id integer NOT NULL,
    description text NOT NULL,
    amount integer NOT NULL,
    month character varying(7) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.expenses OWNER TO postgres;

--
-- Name: expenses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expenses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.expenses_id_seq OWNER TO postgres;

--
-- Name: expenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expenses_id_seq OWNED BY public.expenses.id;


--
-- Name: monthly_stats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.monthly_stats (
    id integer NOT NULL,
    month character varying(7) NOT NULL,
    active_students integer,
    total_income integer,
    total_expenses integer,
    net_profit integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.monthly_stats OWNER TO postgres;

--
-- Name: monthly_stats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.monthly_stats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.monthly_stats_id_seq OWNER TO postgres;

--
-- Name: monthly_stats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.monthly_stats_id_seq OWNED BY public.monthly_stats.id;


--
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    id integer NOT NULL,
    name text NOT NULL,
    belt text NOT NULL,
    age integer,
    monthly_fee integer,
    payment_date date,
    status text
);


ALTER TABLE public.students OWNER TO postgres;

--
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.students_id_seq OWNER TO postgres;

--
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;


--
-- Name: expenses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenses ALTER COLUMN id SET DEFAULT nextval('public.expenses_id_seq'::regclass);


--
-- Name: monthly_stats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monthly_stats ALTER COLUMN id SET DEFAULT nextval('public.monthly_stats_id_seq'::regclass);


--
-- Name: students id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);


--
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expenses (id, description, amount, month, created_at) FROM stdin;
\.


--
-- Data for Name: monthly_stats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.monthly_stats (id, month, active_students, total_income, total_expenses, net_profit, created_at) FROM stdin;
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.students (id, name, belt, age, monthly_fee, payment_date, status) FROM stdin;
4	Andres Q	White	\N	40000	2026-01-15	pendiente
6	Andres Solano	White	\N	30000	2026-01-30	al_dia
7	Armando	White	\N	40000	2026-01-15	pendiente
8	Braga	Blue	\N	40000	2026-01-15	pendiente
9	Brando	White	\N	40000	2026-01-30	al_dia
10	Cris	White	\N	40000	2026-01-30	al_dia
11	Diego Villalta	Blue	\N	40000	2026-01-30	al_dia
12	Ed	White	\N	40000	2026-01-15	pendiente
13	Enoc	Blue	\N	40000	2026-01-30	al_dia
14	Gabriel P	Blue	\N	40000	2026-01-15	pendiente
15	Jossue	Blue	\N	40000	2026-01-15	pendiente
16	Jose Gomez	Blue	\N	40000	2026-01-15	pendiente
17	Jorge	White	\N	40000	2026-01-30	al_dia
18	Juan	White	\N	40000	2026-01-15	pendiente
19	Justin	White	\N	35000	2026-01-15	pendiente
20	Julian	Blue	\N	35000	2026-01-30	al_dia
21	Karina	White	\N	40000	2026-01-30	al_dia
22	Kevin	Blue	\N	40000	2026-01-30	al_dia
23	Lyoner	White	\N	40000	2026-01-15	al_dia
27	Mena	White	\N	40000	2026-01-30	al_dia
29	Nacho	White	\N	40000	2026-01-15	pendiente
30	Papaleta	White	\N	40000	2026-01-30	atrasado
32	Robert	White	\N	40000	2026-01-30	al_dia
34	Junior	White	\N	35000	2026-01-30	al_dia
35	Andrey Mata	White	\N	40000	2026-01-30	al_dia
1	Ali	White	4	30000	2026-03-02	al_dia
2	Ale r	Blue	4	40000	2026-03-02	al_dia
3	Andres Apu	White	4	40000	\N	al_dia
28	Mike	Blue	4	40000	\N	al_dia
31	Primo de Jose	White	4	40000	\N	al_dia
33	Yam	White	4	40000	\N	al_dia
36	Esteban	White	4	40000	\N	al_dia
24	Manri	Blue	4	40000	\N	al_dia
25	Marcelo	White	4	30000	\N	al_dia
26	Mario	White	4	40000	\N	al_dia
\.


--
-- Name: expenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expenses_id_seq', 1, false);


--
-- Name: monthly_stats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.monthly_stats_id_seq', 1, false);


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.students_id_seq', 38, true);


--
-- Name: expenses expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_pkey PRIMARY KEY (id);


--
-- Name: monthly_stats monthly_stats_month_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monthly_stats
    ADD CONSTRAINT monthly_stats_month_key UNIQUE (month);


--
-- Name: monthly_stats monthly_stats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monthly_stats
    ADD CONSTRAINT monthly_stats_pkey PRIMARY KEY (id);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict 8ArnfruvMFzjrpuxLxWyOCsUhcsIzEuFvnBGWO8sSMmfweugEm0EL6KkwfVtgoV


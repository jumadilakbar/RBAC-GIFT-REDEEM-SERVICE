--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6
-- Dumped by pg_dump version 17.2 (Ubuntu 17.2-1.pgdg22.04+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: gifts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gifts (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    stock integer NOT NULL,
    point integer NOT NULL,
    "desc" text,
    label character varying(100),
    status boolean DEFAULT true NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    "filePath" text
);


ALTER TABLE public.gifts OWNER TO postgres;

--
-- Name: gifts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gifts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gifts_id_seq OWNER TO postgres;

--
-- Name: gifts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gifts_id_seq OWNED BY public.gifts.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ratings (
    id integer NOT NULL,
    comment text,
    "giftId" integer,
    "userId" integer,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    score numeric NOT NULL
);


ALTER TABLE public.ratings OWNER TO postgres;

--
-- Name: ratings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ratings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ratings_id_seq OWNER TO postgres;

--
-- Name: ratings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ratings_id_seq OWNED BY public.ratings.id;


--
-- Name: redeemed_gifts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.redeemed_gifts (
    id integer NOT NULL,
    "redeemedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer,
    "giftId" integer
);


ALTER TABLE public.redeemed_gifts OWNER TO postgres;

--
-- Name: redeemed_gifts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.redeemed_gifts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.redeemed_gifts_id_seq OWNER TO postgres;

--
-- Name: redeemed_gifts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.redeemed_gifts_id_seq OWNED BY public.redeemed_gifts.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    role character varying NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    points integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: gifts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gifts ALTER COLUMN id SET DEFAULT nextval('public.gifts_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: ratings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings ALTER COLUMN id SET DEFAULT nextval('public.ratings_id_seq'::regclass);


--
-- Name: redeemed_gifts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.redeemed_gifts ALTER COLUMN id SET DEFAULT nextval('public.redeemed_gifts_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: gifts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gifts (id, name, stock, point, "desc", label, status, "createdAt", "updatedAt", "deletedAt", "filePath") FROM stdin;
3	Realme 15 Pro	97	1000	Kamera jernih, bisa main game sebulan tanpa di charger	Best Seller	t	2025-01-17 02:19:14.707618+00	2025-01-17 02:28:54.196478+00	\N	\N
9	Samsung A57 2026	10	1000	testaasda asdfaaf	best	t	2025-01-17 06:35:22.980803+00	2025-01-17 06:35:22.980803+00	\N	uploads/gifts/filePath-1737095722972-646937435.jpg
10	Samsung A57 2026	10	1000	testaasda asdfaaf	best	t	2025-01-17 11:07:09.553707+00	2025-01-17 11:07:09.553707+00	\N	uploads/gifts/filePath-1737112029536-25089619.jpg
2	Samsung 15 Pro	92	1000	Barak Oke no minus	Best Seller	t	2025-01-16 05:38:24.166348+00	2025-01-17 11:16:47.184155+00	\N	\N
8	Samsung A57 2026	9	1000	testaasda asdfaaf	best	t	2025-01-17 03:23:44.688743+00	2025-01-17 11:18:13.663303+00	\N	uploads/gifts/filePath-1737084224673-884342573.jpg
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1736911180106	Migration1736911180106
2	1736912077014	Migration1736912077014
3	1736993871162	Migration1736993871162
4	1737005890141	Migration1737005890141
5	1737006451195	Migration1737006451195
6	1737019553330	Migration1737019553330
7	1737082669049	Migration1737082669049
8	1737119802982	Migration1737119802982
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ratings (id, comment, "giftId", "userId", "createdAt", "updatedAt", "deletedAt", score) FROM stdin;
5	mantap	2	2	2025-01-17 11:17:07.755557+00	2025-01-17 11:17:07.755557+00	\N	5
6	mantap	8	2	2025-01-17 11:35:26.704302+00	2025-01-17 11:35:26.704302+00	\N	2.1
4	mantap	3	2	2025-01-17 07:26:47.618302+00	2025-01-17 07:26:47.618302+00	\N	3.6
\.


--
-- Data for Name: redeemed_gifts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.redeemed_gifts (id, "redeemedAt", "userId", "giftId") FROM stdin;
3	2025-01-17 02:12:42.494471	1	2
4	2025-01-17 02:28:54.200469	1	3
5	2025-01-17 07:25:29.284217	2	2
6	2025-01-17 09:08:03.722304	2	2
7	2025-01-17 11:16:47.188136	2	2
8	2025-01-17 11:18:13.666431	2	8
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, email, username, password, role, "createdAt", "updatedAt", "deletedAt", points) FROM stdin;
3	another_user@mail.com	another_user	$2a$10$6cL4nq5tWNsAeCPFe0W8b.gs.mLszxOr3Rmxvn/3Th.pMKUozXEBG	user	2025-01-15 04:26:40.217657+00	2025-01-15 04:26:40.217657+00	\N	0
4	another_user1@mail.com	another_user1	$2a$10$f44iqvbM.531NoYYkMB18O0b53RDnEpmB8pBUfEY4pi0bj/dmGtcS	user	2025-01-15 04:38:47.912106+00	2025-01-15 04:38:47.912106+00	\N	0
1	admin@example.com	admin	$2a$10$WphdF9OfRTs4Gcs4g3fE1OZPR7yUkWDy9rH5oiqvaxC4wcIC1ABau	admin	2025-01-15 03:58:13.058331+00	2025-01-17 02:28:54.183826+00	\N	4000
2	user@example.com	user	$2a$10$g4UG9rljUgt4UmxdZwyyV.9AG8mOEGwtf/zg0kJ./iZ21f4sPfpBm	user	2025-01-15 03:58:13.058331+00	2025-01-17 11:18:13.659526+00	\N	2000
\.


--
-- Name: gifts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gifts_id_seq', 10, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 8, true);


--
-- Name: ratings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ratings_id_seq', 6, true);


--
-- Name: redeemed_gifts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.redeemed_gifts_id_seq', 8, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 5, true);


--
-- Name: ratings PK_0f31425b073219379545ad68ed9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT "PK_0f31425b073219379545ad68ed9" PRIMARY KEY (id);


--
-- Name: redeemed_gifts PK_11e783ba9414f8f044a3a5cce4a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.redeemed_gifts
    ADD CONSTRAINT "PK_11e783ba9414f8f044a3a5cce4a" PRIMARY KEY (id);


--
-- Name: gifts PK_54242922934e1f322861d116af7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gifts
    ADD CONSTRAINT "PK_54242922934e1f322861d116af7" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: user UQ_78a916df40e02a9deb1c4b75edb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: IDX_3e7a85fd149842b101176154bc; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_3e7a85fd149842b101176154bc" ON public.ratings USING btree ("giftId");


--
-- Name: IDX_af45dce52f2e9d52dddcd4ab6c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_af45dce52f2e9d52dddcd4ab6c" ON public.ratings USING btree (score);


--
-- Name: redeemed_gifts FK_38b3e258bcc34b3d3ed5ebd6781; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.redeemed_gifts
    ADD CONSTRAINT "FK_38b3e258bcc34b3d3ed5ebd6781" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: ratings FK_3e7a85fd149842b101176154bc0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT "FK_3e7a85fd149842b101176154bc0" FOREIGN KEY ("giftId") REFERENCES public.gifts(id) ON DELETE CASCADE;


--
-- Name: ratings FK_4d0b0e3a4c4af854d225154ba40; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT "FK_4d0b0e3a4c4af854d225154ba40" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: redeemed_gifts FK_9302308683dd397aeea480b67e2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.redeemed_gifts
    ADD CONSTRAINT "FK_9302308683dd397aeea480b67e2" FOREIGN KEY ("giftId") REFERENCES public.gifts(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


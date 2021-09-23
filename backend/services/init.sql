DROP TABLE IF EXISTS owner CASCADE;
DROP TABLE IF EXISTS cat CASCADE;
DROP TABLE IF EXISTS shelter CASCADE;
DROP TABLE IF EXISTS stay CASCADE;
DROP TABLE IF EXISTS stay_owner CASCADE;
DROP TABLE IF EXISTS stay_shelter CASCADE;
DROP TABLE IF EXISTS catfriends CASCADE;
DROP TABLE IF EXISTS shop CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS ownership CASCADE;

DROP SEQUENCE IF EXISTS shelter_id_seq;
DROP SEQUENCE IF EXISTS stay_id_seq;
DROP SEQUENCE IF EXISTS ownership_id_seq;

CREATE TABLE owner (
    id CHAR(36) NOT NULL UNIQUE,
    level smallint DEFAULT 1,
    img VARCHAR(30) DEFAULT 'rihanna_rqthkr',
    room VARCHAR(30) DEFAULT 'room4_k79fw5',
    occupation VARCHAR(30) default 'programmer',
    nickname character varying(255) NOT NULL UNIQUE,
    max_amount_of_cats int NOT NULL,
    points bigint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_owner_user
      FOREIGN KEY(id) 
	  REFERENCES emailpassword_users(user_id)
      ON DELETE CASCADE
);

CREATE TABLE cat (
    id CHAR(36) NOT NULL UNIQUE,
    level smallint DEFAULT 1,
    img VARCHAR(50) DEFAULT 'egyptianmau300_y56gdt',
    nickname character varying(255) NOT NULL UNIQUE,
    gender character varying(30) NOT NULL,
    check(gender in ('male', 'female')),
    race character varying(30) NOT NULL,
    check(race in ('Birman', 'British shorthair', 'Egyptian Mau', 'Maine Coon', 'Norwegian Forest Cat')),
    mother_id CHAR(36) NULL,
    father_id CHAR(36) NULL,
    points bigint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_cat_user
      FOREIGN KEY(id) 
	  REFERENCES emailpassword_users(user_id)
      ON DELETE CASCADE,
    CONSTRAINT fk_cat_mother
      FOREIGN KEY(mother_id) 
	  REFERENCES cat(id)
      ON DELETE CASCADE,
    CONSTRAINT fk_cat_father
      FOREIGN KEY(father_id) 
	  REFERENCES cat(id)
      ON DELETE CASCADE
);

INSERT INTO cat(id, level, img, nickname, gender, race, points) VALUES ('000000000000000000000000000000000000', 1, 'egyptianmau300_y56gdt', 'Colin', 'male', 'Egyptian Mau', 5000);
INSERT INTO cat(id, level, img, nickname, gender, race, points) VALUES ('000000000000000000000000000000000001', 1, 'birman_nrzxv9', 'Rebeca', 'female', 'Birman', 5000);
INSERT INTO cat(id, level, img, nickname, gender, race, points) VALUES ('000000000000000000000000000000000002', 1, 'mainecoon_vwbev6', 'Johnson', 'male', 'Maine Coon', 5000);
INSERT INTO cat(id, level, img, nickname, gender, race, points) VALUES ('000000000000000000000000000000000003', 1, 'norwegian300_lxtzz5', 'Sylvie', 'female', 'Norwegian Forest Cat', 5000);
INSERT INTO cat(id, level, img, nickname, gender, race, points) VALUES ('000000000000000000000000000000000004', 1, 'britishshorthair_sn4cfe', 'John', 'male', 'British shorthair', 5000);
INSERT INTO cat(id, level, img, nickname, gender, race, points) VALUES ('000000000000000000000000000000000005', 1, 'mainecoon_vwbev6', 'Manchester', 'male', 'Maine Coon', 5000);
INSERT INTO cat(id, level, img, nickname, gender, race, points) VALUES ('000000000000000000000000000000000006', 1, 'egyptianmau300_y56gdt', 'Isabelle', 'female', 'Egyptian Mau', 5000);

CREATE SEQUENCE shelter_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE shelter (
    id bigint DEFAULT nextval('shelter_id_seq'::regclass) NOT NULL PRIMARY KEY,
    name character varying(255) NOT NULL UNIQUE,
    img VARCHAR(50) DEFAULT 'shelter1_caab19',
    password character varying(30) NOT NULL,
    email character varying(255) NOT NULL UNIQUE,
    max_amount_of_cats int NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO shelter (name, password, img, email, max_amount_of_cats) VALUES 
('General state shelter', 'hesloheslo', 'shelter1_caab19', 'somerandommail', 20),
('London luxury shelter for cats', 'hesloheslo', 'shelter2_ahn1os', 'somerandommail2', 10);

CREATE SEQUENCE stay_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE stay (
    id bigint DEFAULT nextval('stay_id_seq'::regclass) NOT NULL PRIMARY KEY,
    id_cat CHAR(36) NOT NULL,
    type CHAR(1) NOT NULL check(type in ('o', 's')),
    start_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    end_date timestamp with time zone DEFAULT NULL,
    
    CONSTRAINT fk_cat_stay
      FOREIGN KEY(id_cat) 
	  REFERENCES cat(id)
      ON DELETE CASCADE
);

CREATE TABLE stay_owner (
    id_stay bigint NOT NULL,
    id_owner CHAR(36) NOT NULL,
    
    CONSTRAINT fk_owner_stay
      FOREIGN KEY(id_owner) 
	  REFERENCES owner(id)
      ON DELETE CASCADE,

    CONSTRAINT fk_stay1
      FOREIGN KEY(id_stay) 
	  REFERENCES stay(id)
      ON DELETE CASCADE
);

CREATE TABLE stay_shelter (
    id_stay bigint NOT NULL,
    id_shelter bigint NULL,

    CONSTRAINT fk_shelter_stay
      FOREIGN KEY(id_shelter) 
	  REFERENCES shelter(id)
      ON DELETE CASCADE,

    CONSTRAINT fk_stay2
      FOREIGN KEY(id_stay) 
	  REFERENCES stay(id)
      ON DELETE CASCADE
);

CREATE TABLE catfriends (
    id_cat1 CHAR(36) NOT NULL,
    id_cat2 CHAR(36) NOT NULL,
    state CHAR(1) check(state in ('p', 'a')), -- pending / approved

    CONSTRAINT catfriend1
      FOREIGN KEY(id_cat1) 
	  REFERENCES cat(id)
      ON DELETE CASCADE,

    CONSTRAINT catfriend2
      FOREIGN KEY(id_cat2) 
	  REFERENCES cat(id)
      ON DELETE CASCADE
);

CREATE TABLE shop (
    name character varying(255) NOT NULL UNIQUE,
    description character varying(255) NOT NULL,
    img VARCHAR(50) DEFAULT 'catpillow_s59edk',
    pieces int,
    price numeric CHECK (price > 0),
    type VARCHAR(5),
    check(type in ('cat', 'owner'))
);

INSERT INTO shop (name, description, pieces, price, type, img) VALUES 
('Cat toilette', 'toilette for cats', 100, 200, 'owner', 'toilette_z9fkxn'), 
('Cat pillow', 'pillow for cats', 100, 400, 'owner', 'pillow_agm1i0'),
('Fakecat pillow', 'Fakecat pillow enables you to travel while your owner thinks you are asleep', 5, 1000, 'cat', 'catpillow_s59edk'),
('Caasdasdasdllow', 'piasdasdasdts', 100, 400, 'cat', 'catpillow_s59edk');

CREATE TABLE role (
  user_id CHAR(36) NOT NULL UNIQUE,
  role character varying(20) NULL,
    CONSTRAINT fk_role_user
      FOREIGN KEY(user_id) 
	  REFERENCES emailpassword_users(user_id)
      ON DELETE CASCADE
);

CREATE SEQUENCE ownership_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE ownership (
id bigint  DEFAULT nextval('ownership_id_seq'::regclass) NOT NULL PRIMARY KEY,
user_id CHAR(36) NOT NULL,
name character varying(255) NOT NULL,
type CHAR(1),
check(type in ('c', 'o'))
);
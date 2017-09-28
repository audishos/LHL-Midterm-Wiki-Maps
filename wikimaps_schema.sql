CREATE TABLE users(
  id INTEGER PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  password TEXT,
  created_at DATE
  );

CREATE TABLE maps(
  id INTEGER PRIMARY KEY,
  userid INTEGER,
  FOREIGN KEY(userid) REFERENCES users(id),
  name TEXT,
  description TEXT,
  created_at DATE
  );

CREATE TABLE points(
  id INTEGER PRIMARY KEY,
  title TEXT,
  description TEXT,
  image TEXT,
  created_at DATE,
  userid INTEGER,
  FOREIGN KEY(userid) REFERENCES users(id),
  mapid INTEGER,
  FOREIGN KEY(mapid) REFERENCES maps(id)
  );

CREATE TABLE favourites(
  PRIMARY KEY (userid, mapid),
  userid INTEGER,
  FOREIGN KEY(userid) REFERENCES users(id),
  mapid INTEGER,
  FOREIGN KEY(mapid) REFERENCES maps(id)
);

CREATE TABLE permissions(
  PRIMARY KEY (userid, mapid),
  userid INTEGER,
  FOREIGN KEY(userid) REFERENCES users(id),
  mapid INTEGER,
  FOREIGN KEY(mapid) REFERENCES maps(id),
  permission INTEGER
);
CREATE TABLE nodes (
  id INTEGER PRIMARY KEY,
  name TEXT,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
CREATE TABLE relations (
    source INTEGER NOT NULL,
    destination INTEGER NOT NULL,
    FOREIGN KEY(source) REFERENCES nodes(id),
    FOREIGN KEY(destination) REFERENCES nodes(id)
);
CREATE INDEX sourceindex ON relations(source);
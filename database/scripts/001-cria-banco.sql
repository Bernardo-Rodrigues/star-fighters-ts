CREATE TABLE fighters (
	id SERIAL PRIMARY KEY,
	username TEXT NOT NULL,
	wins INTEGER NOT NULL DEFAULT 0,
	losses INTEGER NOT NULL DEFAULT 0,
	draws INTEGER NOT NULL DEFAULT 0
);
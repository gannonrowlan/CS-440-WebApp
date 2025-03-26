CREATE DATABASE IF NOT EXISTS LibrarySystem;
USE LibrarySystem;

-- Users Table (Without Username)
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Books Table (Optional, for the library system)
CREATE TABLE IF NOT EXISTS Books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    published_year INT,
    genre VARCHAR(50),
    available INT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS borrowed_books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    user_id INT NOT NULL,
    due_date DATE NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    published_year INT,
    genre VARCHAR(100)
);

INSERT INTO books (title, author, published_year, genre)
VALUES
('The Silent Garden', 'Lily Whitman', 2015, 'Literary Fiction'),
('Echoes of the Storm', 'Max Hawkins', 2020, 'Thriller'),
('Dancing with Shadows', 'Clara Belmont', 2012, 'Romance'),
('Crimson Skies', 'Elias Redford', 2018, 'Science Fiction'),
('Whispers in the Pines', 'Jasper North', 2017, 'Mystery'),
('Frostfall', 'Norah Winters', 2021, 'Fantasy'),
('The Last Sun', 'Henry Kline', 2019, 'Dystopian'),
('A Song of the Sea', 'Elena Devereux', 2016, 'Historical Fiction'),
('Under the Violet Sky', 'Ruby Sinclair', 2013, 'Drama'),
('City of Ashes', 'Nora Clayton', 2018, 'Urban Fantasy'),
('Beneath the Surface', 'David Cross', 2022, 'Thriller'),
('The Glass Heart', 'Amelia Turner', 2020, 'Romance'),
('Ashes of the Fallen', 'Orion Blake', 2014, 'Epic Fantasy'),
('The Last Witness', 'Sarah Greene', 2017, 'Crime Fiction'),
('Murder in the Mist', 'Callum Bright', 2015, 'Mystery'),
('The Clockmaker’s Secret', 'Tobias Flint', 2023, 'Historical Mystery'),
('Firefly Dreams', 'Sophia Williams', 2018, 'Young Adult Fiction'),
('The Forgotten Kingdom', 'Leo Roth', 2016, 'Fantasy'),
('A Walk Through the Rain', 'Evelyn Hayes', 2014, 'Romance'),
('Beyond the Horizon', 'Lillian Carter', 2019, 'Adventure'),
('The Scarlet Labyrinth', 'Marcus Kane', 2021, 'Fantasy Thriller'),
('Crimson Waves', 'Isabella Morano', 2020, 'Adventure'),
('Tides of Fate', 'Finn Mitchell', 2016, 'Historical Adventure'),
('Starlit Kingdom', 'Anna Foster', 2022, 'Fantasy'),
('The Invisible Enemy', 'Aaron Smith', 2017, 'Science Fiction'),
('Whispers of the Wild', 'Emma Rivers', 2020, 'Nature Writing'),
('The Midnight Betrayal', 'Grace Dawson', 2021, 'Thriller'),
('Silent Moon', 'Nathaniel Frost', 2020, 'Horror'),
('Echo of the Past', 'Olivia Morris', 2019, 'Historical Fiction'),
('Shattered Dreams', 'Caden Drake', 2021, 'Fantasy'),
('Last Light of the Stars', 'Jade Montgomery', 2022, 'Science Fiction');

SHOW TABLES;
# delete from users where id = 2;
# Select * from users;
# drop table borrowed_books;
# drop table users;
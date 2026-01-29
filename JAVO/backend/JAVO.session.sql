CREATE TABLE admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100),
    password VARCHAR(255)
);

CREATE TABLE leads (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_name VARCHAR(100),
    status VARCHAR(50),
    budget INT,
    notes TEXT
);

CREATE TABLE pages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    content TEXT
);

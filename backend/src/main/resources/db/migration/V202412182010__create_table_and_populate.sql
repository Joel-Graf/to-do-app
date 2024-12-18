CREATE TABLE IF NOT EXISTS tasks (
    id BIGSERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    checked BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

INSERT INTO tasks (description, checked, created_at, updated_at)
VALUES
    ('Complete homework', false, '2024-12-18 10:00:00', NULL),
    ('Buy groceries', false, '2024-12-18 11:00:00', NULL),
    ('Schedule a meeting with team', true, '2024-12-18 12:00:00', '2024-12-18 12:30:00'),
    ('Prepare a presentation', false, '2024-12-18 13:00:00', NULL),
    ('Submit project report', false, '2024-12-18 14:00:00', NULL),
    ('Clean the house', false, '2024-12-18 15:00:00', NULL),
    ('Fix the bug in code', false, '2024-12-18 16:00:00', NULL),
    ('Call the client', true, '2024-12-18 17:00:00', '2024-12-18 17:30:00'),
    ('Prepare for the presentation', false, '2024-12-18 18:00:00', NULL),
    ('Write the blog post', false, '2024-12-18 19:00:00', NULL);
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

function updateDatabaseSchema() {
    const dbPath = path.join(__dirname, 'projects.db');
    const db = new sqlite3.Database(dbPath);

    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                project_name TEXT NOT NULL,
                current_version_id INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS project_versions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                project_id INTEGER NOT NULL,
                version_number INTEGER NOT NULL,
                version_name TEXT,
                content TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (project_id) REFERENCES projects(id)
            )
        `);

        db.all("PRAGMA table_info(project_versions)", (err, rows) => {
            if (err) {
                console.error('Error checking table info:', err);
            } else {
                const columns = rows.map(row => row.name);
                if (!columns.includes('version_name')) {
                    db.run("ALTER TABLE project_versions ADD COLUMN version_name TEXT", (err) => {
                        if (err) {
                            console.error('Error adding version_name column:', err);
                        } else {
                            console.log('version_name column added successfully.');
                        }
                    });
                } else {
                    console.log('version_name column already exists.');
                }
            }
        });
    });

    db.close();
}

updateDatabaseSchema();
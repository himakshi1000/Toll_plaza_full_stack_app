import sqlite3

DB_PATH = './toll.db'

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row #allows by name 
    return conn

def init_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS toll_records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            vehicle_number TEXT NOT NULL,
            vehicle_type TEXT NOT NULL,
            is_government INTEGER DEFAULT 0,
            toll_amount REAL,
            status TEXT DEFAULT 'Paid',
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

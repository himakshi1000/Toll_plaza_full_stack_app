from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.database import get_db_connection, init_db
from backend import schemas


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def calculate_toll(vehicle_type: str, is_government: bool) -> float:
    if is_government:
        return 0.0
    toll_rates = {
        "car": 5.0,
        "bus": 10.0,
        "bike": 2.0
    }
    return toll_rates.get(vehicle_type.lower(), 0.0)

@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/record", response_model=list[schemas.VehicleEntryResponse])
def get_logs():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM toll_records ORDER BY timestamp DESC").fetchall()
    conn.close()
    return [schemas.VehicleEntryResponse(**dict(row)) for row in rows]

@app.post("/record", response_model=schemas.VehicleEntryResponse)
def create_log(entry: schemas.VehicleEntryCreate):
    fee = calculate_toll(entry.vehicle_type, entry.is_government)
    conn = get_db_connection()
    cursor = conn.execute(
        """
        INSERT INTO toll_records (vehicle_number, vehicle_type, is_government, toll_amount, status)
        VALUES (?, ?, ?, ?, ?)
        """,
        (entry.vehicle_number, entry.vehicle_type, int(entry.is_government), fee, entry.status)
    )
    conn.commit()
    
    new_id = cursor.lastrowid
    new_row = conn.execute("SELECT * FROM toll_records WHERE id = ?", (new_id,)).fetchone()
    conn.close()
    
    return schemas.VehicleEntryResponse(**dict(new_row))



# Toll Plaza Dashboard - Full Stack Application

A complete full-stack application for monitoring vehicles passing through a toll plaza. Built with React (frontend) and FastAPI (backend).

## 📋 Project Overview

The Toll Plaza Dashboard is designed to help toll operators:
- ✅ Monitor vehicles passing through the plaza in real-time
- ✅ Automatically calculate toll fees based on vehicle type
- ✅ Track payment status (Paid, Pending, Violation)
- ✅ Search and filter vehicles by license plate and type
- ✅ Manage government/official vehicles with special rates

## 🏗️ Architecture

```
┌─────────────────────┐
│   React Frontend    │ (Port 5173)
│  - Dashboard View   │
│  - Forms & Filters  │
└──────────┬──────────┘
           │ HTTP/REST
           │
┌──────────▼──────────┐
│   FastAPI Backend   │ (Port 8000)
│  - API Endpoints    │
│  - Fee Calculation  │
│  - SQLite Database  │
└─────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ ([Download](https://nodejs.org/))
- Python 3.9+ ([Download](https://www.python.org/))
- Git (optional)

### 1. Backend Setup

```powershell
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv ../test_venv
..\test_venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload
```

**Backend will run on**: `http://localhost:8000`

### 2. Frontend Setup (in a new terminal)

```powershell
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend will run on**: `http://localhost:5173`

### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 📊 Features

### Frontend
- **Dashboard View**: Real-time table of all vehicle entries
- **Add Vehicles**: Manual entry form for simulating vehicle passages
- **Filtering**: Search by license plate, filter by vehicle type
- **Status Tracking**: Visual indicators for payment status
- **Responsive Design**: Works on desktop and mobile devices

### Backend
- **RESTful API**: Clean endpoints for data management
- **Automatic Calculation**: Toll fees calculated based on rules
- **Data Persistence**: SQLite database for storing records
- **CORS Support**: Enables frontend communication
- **Auto-Initialization**: Database created automatically on startup

## 💰 Toll Fee Structure

| Vehicle Type | Standard Fee | Government Vehicle |
|---------------|------|-------------------|
| 🚗 Car | $5.00 | $0.00 |
| 🏍️ Bike | $2.00 | $0.00 |
| 🚌 Bus | $10.00 | $0.00 |

## 📝 Status Types

| Status | Color | Meaning |
|--------|-------|---------|
| **Paid** | 🟢 Green | Payment completed |
| **Pending** | 🟡 Yellow | Awaiting payment |
| **Violation** | 🔴 Red | Payment issue/violation |

## 🔌 API Endpoints

### GET /record
Retrieve all toll records.

**Response:**
```json
[
  {
    "id": 1,
    "vehicle_number": "ABC-1234",
    "vehicle_type": "car",
    "is_government": false,
    "toll_amount": 5.0,
    "status": "Paid",
    "timestamp": "2026-06-07T10:30:45"
  }
]
```

### POST /record
Add a new vehicle entry (toll automatically calculated).

**Request:**
```json
{
  "vehicle_number": "XYZ-5678",
  "vehicle_type": "truck",
  "is_government": false,
  "status": "Pending"
}
```

## 📁 Project Structure

```
toll plaza app/
├── backend/
│   ├── main.py              # FastAPI app & endpoints
│   ├── database.py          # Database setup
│   ├── schemas.py           # Pydantic models
│   ├── requirements.txt     # Python dependencies
│   ├── README.md            # Backend documentation
│   └── toll_records.db      # SQLite database
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── VehicleForm.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   └── VehicleTable.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   ├── README.md            # Frontend documentation
│   └── vite.config.js
│
├── test_venv/               # Python virtual environment
└── README.md                # This file
```

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - UI framework
- **Vite 8.0** - Build tool
- **CSS3** - Styling with Flexbox/Grid
- **Fetch API** - HTTP communication

### Backend
- **FastAPI 0.136+** - Web framework
- **Uvicorn 0.49+** - ASGI server
- **SQLite3** - Database
- **Pydantic 2.13+** - Data validation

## 🐛 Troubleshooting

### Backend won't start
```powershell
# Ensure virtual environment is activated
..\test_venv\Scripts\Activate.ps1

# Check if port 8000 is in use
Get-Process -Id (Get-NetTCPConnection -LocalPort 8000).OwningProcess | Stop-Process -Force
```

### Frontend won't connect to backend
1. Verify backend is running on `http://localhost:8000`
2. Check browser console for CORS errors
3. Ensure no firewall is blocking localhost connections

### Database errors
```powershell
# Reset database
Remove-Item backend/toll_records.db

# Restart backend to recreate
```

## 📖 Documentation

For detailed documentation, see:
- [Backend README](backend/README.md) - API details and setup
- [Frontend README](frontend/README.md) - UI components and features

## 🚀 Deployment

### Preparing for Production

**Backend:**
```powershell
# Build for production
# Update main.py to use production database

# Run with production ASGI server
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker backend.main:app
```

**Frontend:**
```powershell
npm run build
# Output in dist/ folder - deploy to static hosting
```

## 📞 Support & Contributing

For issues, feature requests, or contributions:
1. Check existing documentation
2. Review troubleshooting section
3. Create detailed issue reports

## 📄 License

This project is part of the Toll Plaza Monitoring System.

## ✨ Future Enhancements

- [ ] Real-time WebSocket updates
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] Payment gateway integration
- [ ] User authentication
- [ ] Vehicle owner database integration
- [ ] SMS/Email notifications
- [ ] Data export (CSV, PDF)

---

**Happy Toll Monitoring! 🚗**

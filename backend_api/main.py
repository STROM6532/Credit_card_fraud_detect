from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
import pickle
import json

# ---------- Load model, scaler, and column info ----------

with open("fraud_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

with open("columns.json", "r") as f:
    FEATURE_COLUMNS = json.load(f)

with open("numerical_cols.json", "r") as f:
    NUMERIC_COLS = json.load(f)

# These are the categorical columns used in training
CATEGORICAL_COLS = ["category", "gender", "state"]

# ---------- FastAPI app ----------

app = FastAPI(title="Fraud Detection API")

# Allow Next.js (frontend) to call this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Request body model ----------

class TransactionInput(BaseModel):
    amt: float
    city_pop: float
    trans_hour: int
    trans_day_of_week: int
    time_diff: float
    distance_km: float
    category: str
    gender: str
    state: str

# ---------- Helper function to prepare features ----------

def build_features(data: TransactionInput) -> pd.DataFrame:
    # Convert input to DataFrame
    d = data.dict()
    df = pd.DataFrame([d])

    # One-hot encode categorical variables (same as training)
    df = pd.get_dummies(df, columns=CATEGORICAL_COLS, drop_first=True)

    # Add any missing columns from training as 0
    for col in FEATURE_COLUMNS:
        if col not in df.columns:
            df[col] = 0

    # Keep only the columns the model knows
    df = df[FEATURE_COLUMNS]

    # Scale numerical columns
    df[NUMERIC_COLS] = scaler.transform(df[NUMERIC_COLS])

    return df

# ---------- Routes ----------

@app.get("/")
def root():
    return {"message": "Fraud Detection API is running 🚀"}

@app.post("/predict")
def predict_fraud(tx: TransactionInput):
    features = build_features(tx)
    proba = model.predict_proba(features)[0, 1]
    pred = int(model.predict(features)[0])

    return {
        "fraud": bool(pred == 1),
        "prediction": pred,
        "score": float(proba * 100.0)  # send 0–100 risk score
    }

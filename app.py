import streamlit as st
import pandas as pd
import numpy as np
import pickle
import json

# ---------- Load model, scaler, and column info ----------

@st.cache_resource
def load_artifacts():
    with open("fraud_model.pkl", "rb") as f:
        model = pickle.load(f)

    with open("scaler.pkl", "rb") as f:
        scaler = pickle.load(f)

    with open("columns.json", "r") as f:
        feature_columns = json.load(f)

    with open("numerical_cols.json", "r") as f:
        numeric_cols = json.load(f)

    return model, scaler, feature_columns, numeric_cols


model, scaler, FEATURE_COLUMNS, NUMERIC_COLS = load_artifacts()

CATEGORICAL_COLS = ["category", "gender", "state"]

# ---------- Helper function ----------

def build_features(df: pd.DataFrame) -> pd.DataFrame:
    df = pd.get_dummies(df, columns=CATEGORICAL_COLS, drop_first=True)

    for col in FEATURE_COLUMNS:
        if col not in df.columns:
            df[col] = 0

    df = df[FEATURE_COLUMNS]
    df[NUMERIC_COLS] = scaler.transform(df[NUMERIC_COLS])

    return df

# ---------- Streamlit UI ----------

st.set_page_config(page_title="Credit Card Fraud Detection", layout="centered")
st.title("💳 Credit Card Fraud Detection")
st.write("Enter transaction details to predict fraud risk.")

# ---------- Inputs ----------

amt = st.number_input("Transaction Amount", min_value=0.0, value=100.0)
city_pop = st.number_input("City Population", min_value=0.0, value=50000.0)
trans_hour = st.slider("Transaction Hour", 0, 23, 12)
trans_day_of_week = st.slider("Transaction Day (0=Mon)", 0, 6, 2)
time_diff = st.number_input("Time Difference (seconds)", min_value=0.0, value=1000.0)
distance_km = st.number_input("Distance (km)", min_value=0.0, value=10.0)

category = st.selectbox(
    "Merchant Category",
    ["food", "shopping", "gas", "entertainment", "health", "travel"]
)

gender = st.selectbox("Gender", ["M", "F"])
state = st.text_input("State (e.g. CA, TX, NY)", "CA")

# ---------- Prediction ----------

if st.button("🔍 Predict Fraud"):
    input_df = pd.DataFrame([{
        "amt": amt,
        "city_pop": city_pop,
        "trans_hour": trans_hour,
        "trans_day_of_week": trans_day_of_week,
        "time_diff": time_diff,
        "distance_km": distance_km,
        "category": category,
        "gender": gender,
        "state": state
    }])

    features = build_features(input_df)

    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0][1] * 100

    if prediction == 1:
        st.error(f"🚨 Fraud Detected! Risk Score: {probability:.2f}%")
    else:
        st.success(f"✅ Transaction is Safe. Risk Score: {probability:.2f}%")

from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# loading the AI brain we saved 
model = joblib.load("cost_model.pkl")
model_columns = joblib.load("model_columns.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # getting the JSON data sent from node.js
        data = request.json
        df = pd.DataFrame([data])
        
        # handle the columns like in training 
        if 'RoleDescription' in df.columns:
            df = pd.get_dummies(df, columns=['RoleDescription'])
        df = df.reindex(columns=model_columns, fill_value=0)
        
        # predictinggg
        prediction = model.predict(df)[0]
        
        # back to node.js
        return jsonify({"predicted_cost": round(float(prediction), 2)})
    
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    print("AI API is running on http://localhost:8000")
    app.run(port=8000)
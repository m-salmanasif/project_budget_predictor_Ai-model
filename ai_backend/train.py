import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib

df = pd.read_csv("dbproj_cleaned.csv")

df = pd.get_dummies(df, columns=['RoleDescription'], drop_first=True)

# we are predicting total budget
y = df['TotalBudget']
X = df.drop(columns=['TotalBudget'])

# splitting data, 70% training, 30% testing 
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# training the model 
print("Training the AI model...")
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# saving the brain/math in a pkl file 
joblib.dump(model, "cost_model.pkl")
joblib.dump(list(X.columns), "model_columns.pkl")

print(f"Model saved successfully! Accuracy Score: {model.score(X_test, y_test):.2f}")
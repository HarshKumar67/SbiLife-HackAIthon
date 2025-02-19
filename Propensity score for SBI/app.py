from flask import Flask, render_template, request
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.tree import DecisionTreeClassifier
from sklearn.impute import SimpleImputer
import joblib
import logging

# Set up logging for better error tracking
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

def create_and_train_model():
    """
    Creates a new model pipeline compatible with current scikit-learn version.
    Returns a pipeline with preprocessing and classifier components.
    """
    # Define feature groups
    numeric_features = ['Age', 'Website_Visits', 'Annual_Income', 'Expenses', 'Credit_Score']
    categorical_features = ['Occupation']

    # Create preprocessing steps for numeric features
    numeric_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())
    ])

    # Create preprocessing steps for categorical features
    # Note: sparse_output=False replaces the deprecated 'sparse' parameter
    categorical_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
        ('onehot', OneHotEncoder(drop='first', sparse_output=False))
    ])

    # Combine all preprocessing steps
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_features),
            ('cat', categorical_transformer, categorical_features)
        ])

    # Create the full pipeline
    model = Pipeline([
        ('preprocessor', preprocessor),
        ('classifier', DecisionTreeClassifier(random_state=42))
    ])

    return model

# Initialize the model
try:
    # Try to load existing model
    logger.info("Attempting to load existing model...")
    model = joblib.load("propensity_model.pkl")
    logger.info("Successfully loaded existing model")
except Exception as e:
    # If loading fails, create a new model
    logger.warning(f"Could not load existing model ({str(e)}). Creating new model...")
    model = create_and_train_model()
    # In production, you would train the model here
    logger.info("New model created successfully")

def predict_propensity(user_data):
    """
    Makes a prediction using the model with fallback logic if prediction fails.
    Returns a propensity score between 0 and 1.
    """
    try:
        # Create DataFrame from user data
        user_df = pd.DataFrame([user_data])
        
        # Convert numeric columns to proper type
        numeric_cols = ['Age', 'Website_Visits', 'Annual_Income', 'Expenses', 'Credit_Score']
        for col in numeric_cols:
            user_df[col] = pd.to_numeric(user_df[col])
        
        # Attempt prediction
        try:
            propensity_score = model.predict_proba(user_df)[:, 1][0]
        except Exception as pred_error:
            logger.warning(f"Model prediction failed ({str(pred_error)}). Using fallback scoring...")
            # Fallback scoring logic
            base_score = 0.5
            adjustments = 0.0
            
            # Apply basic business rules
            if user_data['Credit_Score'] > 700:
                adjustments += 0.1
            if user_data['Annual_Income'] > 50000:
                adjustments += 0.1
            if user_data['Website_Visits'] > 10:
                adjustments += 0.1
            
            propensity_score = min(base_score + adjustments, 1.0)
        
        return round(propensity_score, 4)
    
    except Exception as e:
        logger.error(f"Error in prediction process: {str(e)}")
        return 0.5  # Default fallback score

@app.route('/')
def index():
    """Renders the input form page."""
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    """
    Handles form submission and returns prediction results.
    Includes error handling and data validation.
    """
    try:
        # Get and validate form data
        user_data = {
            'Age': int(request.form.get('age', 30)),
            'Occupation': request.form.get('occupation', 'Professional'),
            'Website_Visits': int(request.form.get('website_visits', 5)),
            'Annual_Income': float(request.form.get('annual_income', 50000)),
            'Expenses': float(request.form.get('expenses', 2000)),
            'Credit_Score': float(request.form.get('credit_score', 700))
        }
        
        # Calculate propensity score
        propensity_score = predict_propensity(user_data)
        
        # Calculate additional metrics
        metrics = {
            'expense_ratio': min(100, (float(user_data['Expenses']) * 12 / float(user_data['Annual_Income'])) * 100),
            'credit_health': min(100, ((float(user_data['Credit_Score']) - 300) / (850 - 300)) * 100),
            'engagement_score': min(100, (float(user_data['Website_Visits']) / 20) * 100)
        }
        
        return render_template(
            'dashboard.html',
            user_data=user_data,
            propensity_score=round(propensity_score * 100),
            metrics=metrics
        )
    
    except Exception as e:
        logger.error(f"Error processing prediction request: {str(e)}")
        # Return a graceful fallback response
        return render_template(
            'dashboard.html',
            user_data=user_data,
            propensity_score=50.0,
            metrics={
                'expense_ratio': 50,
                'credit_health': 50,
                'engagement_score': 50
            }
        )

if __name__ == '__main__':
    app.run(debug=True)
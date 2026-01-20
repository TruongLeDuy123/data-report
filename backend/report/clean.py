import pandas as pd

def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    # Make a copy to avoid modifying the original DataFrame
    df = df.copy()
    
    # Convert date to datetime type
    df["date"] = pd.to_datetime(df["date"], errors="coerce")

    # Convert numeric cols to number, handling commas and invalid values
    numeric_cols = ["spend", "impressions", "clicks", "conversions"]
    for col in numeric_cols:
        df[col] = pd.to_numeric(
            df[col].astype(str).str.replace(",", ""), 
            errors='coerce'
        )

    # Replace -1 with NaN for impressions and conversions
    df["impressions"] = df["impressions"].replace(-1, pd.NA)
    df["conversions"] = df["conversions"].replace(-1, pd.NA)
    
    # Extract category from []
    df["category"] = df["campaign_name"].str.findall(r"\[(.*?)\]")
    df = df.explode("category")
    
    return df

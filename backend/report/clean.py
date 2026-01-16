import pandas as pd

def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    # Convert date to datetime type
    df["date"] = pd.to_datetime(df["date"], errors="coerce")

    # Convert numeric cols to number to ensure that they are valid numbers
    numeric_cols = ["spend", "impressions", "clicks", "conversions"]
    for col in numeric_cols:
        df[col] = (
            df[col]
            .astype(str)
            .str.replace(",", "")
            .astype(float)
        )

    df["impressions"] = df["impressions"].replace(-1, None)
    df["conversions"] = df["conversions"].replace(-1, None)
    
    # Extract category from []
    df["category"] = df["campaign_name"].str.findall(r"\[(.*?)\]")
    df = df.explode("category")
    
    return df

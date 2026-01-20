import pandas as pd

def infer_schema(df: pd.DataFrame):
    schema = []

    for col in df.columns:
        dtype = df[col].dtype

        if pd.api.types.is_datetime64_any_dtype(dtype):
            col_type = "date"
        elif pd.api.types.is_numeric_dtype(dtype):
            col_type = "number"
        else:
            col_type = "string"

        schema.append({
            "name": col,
            "type": col_type
        })

    return schema

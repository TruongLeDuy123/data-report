# import pandas as pd
# import numpy as np

# from config.config_loader import load_config
# from report.build_report import build_report


# df = pd.read_csv('data/data.csv')
# config = load_config("example.json")
# report = build_report(df, config)
# print(report)


# import pandas as pd
# from report.rolling_engine import apply_rolling

# df = pd.DataFrame({
#     "date": ["2025-01-01","2025-01-01","2025-01-02","2025-01-03"],
#     "country": ["US","US","US","UK"],
#     "sales": [10, 5, 7, 3]
# })

# rolling_cfg = {"window": 7, "metrics": ["sales"], "unit": "D"}
# out = apply_rolling(df, rolling_cfg, group_keys=["country"])
# print(out)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.report import router as report_router

app = FastAPI(title="Report Builder API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(report_router)


# print(df.head())

# print(df.columns)
# print(df.dtypes)
# print(df.shape)

# print(df.loc["0":"2", ["platform", "spend"]])

# print(df.iloc[0:3])
# print(df.iloc[0:3, 0:3])
# print(df.at[1, "spend"]) # access a specified value by label (row = 1 and col = "spend")
# print(df.iat[0,3]) # access a specified value by numberic position (row = 0 and col = 3)

# df_filled = df.replace(-1, np.nan)
# df["date"] = pd.to_datetime(df["date"], errors="coerce")


# df = df.groupby(["date"]).agg({"spend": "sum"})
# print(df)

# df = clean_data(df)
# df = add_metrics(df)
# df = apply_time_bucket(df, config.get("time_bucket"))
# print(df)





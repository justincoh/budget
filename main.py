import csv
import json
import pandas as pd


def csv_to_dict_keyed_by_year(filename):
  return pd.read_csv(
    filename,
    index_col=0,
    squeeze=True
  ).to_dict()

def csv_to_dict_keyed_by_dept(filename):
  return pd.read_csv(
    filename,
    index_col=0,
    squeeze=True
  ).transpose().to_dict()

def write_dict_to_json(data, filename):
  with open(filename, 'w') as outfile:
    json.dump(data, filename)

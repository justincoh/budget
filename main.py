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

# e.g. { "Department of Agriculture": {"1960": "34721.0"} -> {"1960": 34721} }
# or { "1960": {"Department of Agriculture": "34721.0"} -> {"Department of Agriculture": 34721} }
def convert_to_integers(data):
  for key in data:
    for subkey, value in data[key].items():
      try:
        newval = int(float(value))
      except ValueError:
        newval = 0
      data[key][subkey] = newval

  return data

def write_dict_to_json(data, filename):
  with open(filename, 'w') as outfile:
    json.dump(data, outfile)

def main():
  data = csv_to_dict_keyed_by_dept('data/budget_outlays_by_agency.csv')
  new_data = convert_to_integers(data)
  write_dict_to_json(new_data, 'data/outlays_by_agency_dept_keyed.json')

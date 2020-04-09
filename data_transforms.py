import csv
import xlrd
import json
import pandas as pd

def xlsx_to_csv(infile_name, outfile_name):
  wb = xlrd.open_workbook(infile_name)
  sh = wb.sheet_by_index(0)
  with open(outfile_name, 'w') as outfile:
    wr = csv.writer(outfile)
    for rownum in range(sh.nrows):
      wr.writerow(sh.row_values(rownum))

  print('Created file: {}'.format(outfile_name))    

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
  # copy data so we can remove bad values without RuntimeError during loop
  new_data = {}
  for key in data:
    new_data[key] = {}
    for subkey, value in data[key].items():
      # Strip the random "TQ" k:v pairs
      # for year_keyed, just delete the key manually in the shell
      if subkey == "TQ":
        continue
      try:
        newval = int(float(value))
      except ValueError:
        newval = 0

      new_data[key][subkey] = newval

  return new_data

def write_dict_to_json(data, filename):
  with open(filename, 'w') as outfile:
    json.dump(data, outfile)

def main():
  data = csv_to_dict_keyed_by_dept('data/budget_outlays_by_agency.csv')
  new_data = convert_to_integers(data)
  write_dict_to_json(new_data, 'data/outlays_by_agency_dept_keyed.json')

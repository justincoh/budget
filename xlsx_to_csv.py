import xlrd
import csv

def xlsx_to_csv(infile_name, outfile_name):
  wb = xlrd.open_workbook(infile_name)
  sh = wb.sheet_by_index(0)
  with open(outfile_name, 'w') as outfile:
    wr = csv.writer(outfile)
    for rownum in range(sh.nrows):
      wr.writerow(sh.row_values(rownum))

  print('Created file: {}'.format(outfile_name))    
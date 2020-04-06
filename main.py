import csv


def read_csv(filename):
  for_return = []
  with open(filename, 'r') as infile:
    reader = csv.DictReader(infile)
      for row in reader:
        for_return.append(row)

  return for_return

# TODO turn this into JSON and save as a blob for use in frontend
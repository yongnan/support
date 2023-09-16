import requests
import csv

planets_request = requests.get("http://localhost:8080/planets.csv")
csv_data = planets_request.text.split("\n")
reader = csv.reader(csv_data, delimiter=',', quotechar='"')
# for row in reader:
#     print(row)

#  CSV writer left a trailing blank like would add an empty list item if not handled
lines = [line for line in reader][:-1]
for row in lines:
    print(row)

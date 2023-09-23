import requests
from bs4 import BeautifulSoup

html = requests.get("http://localhost:8080/planets.html").text
soup = BeautifulSoup(html, "lxml")
str(soup)[:1000]
str(soup.html.body.div.table)[:200]

soup.html.body.div.table.children

str(soup.html.body.div.table.tr.parent)[:200]

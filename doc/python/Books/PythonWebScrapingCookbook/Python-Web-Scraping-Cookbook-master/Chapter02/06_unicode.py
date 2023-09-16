from urllib.request import urlopen

# loading the page,
page = urlopen("http://localhost:8080/unicode.html")
content = page.read()

# examining some of the content
l1 = content[840:1280]
print('l1: ', l1, sep="\n")

# To rectify this, we can convert the content to UTF-8 format using the Python str statement:
l2 = str(content, "utf-8")[837:1270]
# Note that the output now has the characters encoded properly.
print('l2: ', l2, sep="\n")

# We can exclude this extra step by using requests.
import requests
response = requests.get("http://localhost:8080/unicode.html").text
l3 = response[837:1270]
print('l3: ', l3, sep="\n")

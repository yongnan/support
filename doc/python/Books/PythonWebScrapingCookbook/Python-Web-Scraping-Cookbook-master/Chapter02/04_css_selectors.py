from lxml import html
import requests

page_html = requests.get("http://localhost:8080/planets.html").text
tree = html.fromstring(page_html)

# selects all <tr> elements with a class equal to "planet":
l1 = [(v, v.xpath("@name")) for v in tree.cssselect('tr.planet')]
print('l1: ', l1)

# Data for the Earth can be found in several ways. The following gets the row based on id:
tr = tree.cssselect("tr#planet3")
t = tr[0], tr[0].xpath("./td[2]/text()")[0].strip()
print('t: ', t)

# uses an attribute with a specific value:
tr2 = tree.cssselect("tr[name='Pluto']")
t2 = tr2[0], tr2[0].xpath("td[2]/text()")[0].strip()
print('t2: ', t2)

# Note that unlike XPath, the @ symbol need not be used to specify an attribute.
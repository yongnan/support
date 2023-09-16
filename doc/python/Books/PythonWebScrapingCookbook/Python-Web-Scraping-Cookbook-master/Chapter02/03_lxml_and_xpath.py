from lxml import html
import requests

page_html = requests.get("http://localhost:8080/planets.html").text
tree = html.fromstring(page_html)

# find all the the <tr> elements below the <table> element.
l = [tr for tr in tree.xpath("/html/body/div/table/tr")]
print('l1: ', list(l))

#  gets the HTML associated with the elements but using etree.tostring()
from lxml import etree
l2 = [etree.tostring(tr)[:50] for tr in tree.xpath("/html/body/div/table/tr")]
print('l2: ', list(l2))

# select only the <tr> elements that are planets.
l3 = [etree.tostring(tr)[:50] for tr in tree.xpath("/html/body/div/table/tr[@class='planet']")]
print('l3: ', list(l3))

# specify a specific element at each section of the XPath like they are arrays.
l4 = [etree.tostring(tr)[:50] for tr in tree.xpath("/html/body/div[1]/table/tr")]
print('l4: ', list(l4))

#  A change to [2] selects the second <div> and hence only the second <table>.
l5 = [etree.tostring(tr)[:50] for tr in tree.xpath("/html/body/div[2]/table/tr")]
print('l5: ', list(l5))

# select <div> with id
l6 =[etree.tostring(tr)[:50] for tr in tree.xpath("/html/body/div[@id='planets']/table/tr")]
print('l6: ', list(l6))

# Earlier we selected the planet rows based upon the value of the class attribute.  We can also exclude rows:
l7 =[etree.tostring(tr)[:50] for tr in tree.xpath("/html/body/div[@id='planets']/table/tr[@id!='planetHeader']")]
print('l7: ', list(l7))

# skipping the first row
l8 =  [etree.tostring(tr)[:50] for tr in tree.xpath("/html/body/div[@id='planets']/table/tr[position() > 1]")]
print('l8: ', list(l8))

# It is possible to navigate to the parent of a node using parent::*:
l9 = [etree.tostring(tr)[:50] for tr in tree.xpath("/html/body/div/table/tr/parent::*")]
print('l9: ', list(l9))

# only return the <table> elements.
l10 = [etree.tostring(tr)[:50] for tr in tree.xpath("/html/body/div/table/tr/parent::table")]
print('l10: ', list(l10))

# specify a specific parent by position or attribute.
l11 = [etree.tostring(tr)[:50] for tr in tree.xpath("/html/body/div/table/tr/parent::table[@id='footerTable']")]
print('l11: ', list(l11))

# A shortcut for parent is .. (and . also represents the current node):
l12 = [etree.tostring(tr)[:50] for tr in tree.xpath("/html/body/div/table/tr/..")]
print('l12: ', list(l12))

# finds the mass of Earth:
l13 = mass = tree.xpath("/html/body/div[1]/table/tr[@name='Earth']/td[3]/text()[1]")[0].strip()
print('l13: ', list(l13))

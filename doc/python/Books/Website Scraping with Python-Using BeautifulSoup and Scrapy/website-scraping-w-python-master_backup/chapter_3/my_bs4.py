from bs4 import BeautifulSoup
import requests, re

# Parsing HTML Text
example_html = """
<html>
<head>
<title>Your Title Here</title>
</head>
<body bgcolor="#ffffff">
<center>
<img align="bottom" src="clouds.jpg"/>
</center>
<hr/>
<a href="http://somegreatsite.com">Link Name</a> is a link to another nifty site
<h1>This is a Header</h1>
<h2>This is a Medium Header</h2>
Send me mail at <a href="mailto:support@yourcompany.com">support@yourcompany.com</a>.
<p>This is a paragraph!</p>
<p>
<b>This is a new paragraph!</b><br/>
<b><i>This is a new sentence without a paragraph break, in bold italics.</i></b>
<a>This is an empty anchor</a>
</p>
<hr/>
</body>
</html>
"""
soup = BeautifulSoup(example_html, 'html.parser')

# Parsing Remote HTML
soup = BeautifulSoup(requests.get('http://hajba.hu').text, 'html.parser')

# Parsing a File
with open('example.html') as infile:
    soup = BeautifulSoup(infile, 'html.parser')

# To find all anchor tags that have an href attribute
links = soup.find_all('a', href=True)
for link in links:
    print(link['href'])

# Extracting All Images
images = soup.find_all('img', src=True)

# Finding Tags Through Their Attributes
soup.find('p', id="first")
soup.find_all('p', class_="paragraph")
soup.find('img', src='clouds.jpg')
soup.find('img', src=re.compile('\.gif$'))
soup.find_all('p', text="paragraph")
soup.find_all('p', text=re.compile('paragraph'))

# Finding Multiple Tags Based on Property
for tag in soup.find_all(re.compile('h')):
    print(tag.name)

soup.find_all(True, text=re.compile('paragraph'))

# Changing Tags and Attributes
for p in soup.find_all('p', text=True):
    p.string.wrap(soup.new_tag('b'))

soup = BeautifulSoup('<p> This is a <b>new</b> paragraph!</p>')
p = soup.p.b.unwrap()
print(soup.p)

for t in soup.findAll(True, id=True):
    t['class'] = 'withid'
    print(t)

# Deleting Tags and Attributes
print(soup.title.extract())
print(soup.head)

print(soup.title.decompose())
print(soup.head)

# Deletion doesn’t only work for tags; you can remove attributes of tags too.
for tag in soup.find_all(True, display=True):
    del tag['display']

print(len(soup.find_all(True, display=True)))

# Finding Comments
from bs4 import Comment
for comment in soup.find_all(text=lambda text:isinstance(text, Comment)):
    print(comment)

# Converting a Soup to HTML Text
print(soup)
print(soup.find('p').prettify())
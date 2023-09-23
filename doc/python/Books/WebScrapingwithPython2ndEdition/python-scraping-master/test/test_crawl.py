from urllib.request import urlopen
from urllib.parse import urlparse
from urllib.error import HTTPError
from bs4 import BeautifulSoup
import re
import datetime
import random

pages = set()
random.seed(datetime.datetime.now())


# Retrieves a list of all Internal links found on a page
def getInternalLinks(bs, includeUrl):
    includeUrl = '{}://{}'.format(urlparse(includeUrl).scheme, urlparse(includeUrl).netloc)
    internalLinks = []
    # Finds all links that begin with a "/"
    for link in bs.find_all('a', href=re.compile('^(/|.*' + includeUrl + ')')):
        if link.attrs['href'] is not None:
            if link.attrs['href'] not in internalLinks:
                if (link.attrs['href'].startswith('/')):
                    internalLinks.append(includeUrl + link.attrs['href'])
                else:
                    internalLinks.append(link.attrs['href'])
    return internalLinks


# Retrieves a list of all external links found on a page
def getExternalLinks(bs, excludeUrl):
    externalLinks = []
    # Finds all links that start with "http" that do
    # not contain the current URL
    for link in bs.find_all('a', href=re.compile('^(http|www)((?!' + excludeUrl + ').)*$')):
        if link.attrs['href'] is not None:
            if link.attrs['href'] not in externalLinks:
                externalLinks.append(link.attrs['href'])
    return externalLinks


def getRandomExternalLink(startingPage):
    html = urlopen(startingPage)
    bs = BeautifulSoup(html, 'html.parser')
    externalLinks = getExternalLinks(bs, urlparse(startingPage).netloc)
    if len(externalLinks) == 0:
        print('No external links, looking around the site for one')
        domain = '{}://{}'.format(urlparse(startingPage).scheme, urlparse(startingPage).netloc)
        internalLinks = getInternalLinks(bs, domain)
        if len(internalLinks) > 0:
            return getRandomExternalLink(internalLinks[random.randint(0,
                                                                      len(internalLinks) - 1)])
        else:
            print('dead ends!')
    else:
        return externalLinks[random.randint(0, len(externalLinks) - 1)]


def followExternalOnly(startingSite):
    externalLink = getRandomExternalLink(startingSite)
    print('Random external link is: {}'.format(externalLink))
    if externalLink:
        followExternalOnly(externalLink)


# followExternalOnly('https://checkcoverage.apple.com/us/en/')

# Collects a list of all external URLs found on the site
allExtLinks = set()
allIntLinks = set()

def getAllExternalLinks(siteUrl):
    try:
        html = urlopen(siteUrl)
    except HTTPError as err:
        print(siteUrl)
        return None
    domain = '{}://{}'.format(urlparse(siteUrl).scheme,
                              urlparse(siteUrl).netloc)
    bs = BeautifulSoup(html, 'html.parser')
    internalLinks = getInternalLinks(bs, domain)
    externalLinks = getExternalLinks(bs, domain)

    for link in externalLinks:
        if link not in allExtLinks:
            allExtLinks.add(link)
            print(link)
    for link in internalLinks:
        if link not in allIntLinks:
            allIntLinks.add(link)
            getAllExternalLinks(link)

# site_ = 'http://oreilly.com'
# site_ = "http://www.pythonscraping.com"
# site_ = 'https://sale.591.com.tw'
site_ = 'http://www.twhg.com.tw/object_list-A.php'
allIntLinks.add(site_)
getAllExternalLinks(site_)
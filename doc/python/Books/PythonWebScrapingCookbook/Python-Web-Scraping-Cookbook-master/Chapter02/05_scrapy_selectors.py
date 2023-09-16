from scrapy.selector import Selector
import requests
import pprint

response = requests.get("http://stackoverflow.com/questions")
selector = Selector(response)
print(selector)

summaries = selector.xpath('//div[@class="summary"]/h3')
l1 = summaries[0:5]
print('l1: ', *l1, sep="\n")

l2 = [x.extract() for x in summaries.xpath('a[@class="question-hyperlink"]/text()')][:10]
print('l2: ', *l2, sep="\n")

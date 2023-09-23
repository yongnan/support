# don't run this code, it's demo
import requests

url = 'https://api.github.com/some/endpoint'
headers = {'user-agent': 'MyCompany-MyCrawler (mybot@mycompany.com)'}
r = requests.get(url, headers=headers)

# When using Scrapy, it is as simple as configuring a setting:

process = CrawlerProcess({
    'USER_AGENT': 'MyCompany-MyCrawler (mybot@mycompany.com)'
})
process.crawl(Spider)
process.start()

process = CrawlerProcess({
    'CONCURRENT_REQUESTS_PER_DOMAIN': 1
})
process.crawl(Spider)
process.start()

# Setting the number of concurrent requests per domain
process = CrawlerProcess({
    'CONCURRENT_REQUESTS_PER_DOMAIN': 1
})
process.crawl(Spider)
process.start()

# Using auto throttling
process = CrawlerProcess({
    'AUTOTHROTTLE_TARGET_CONCURRENCY': 3
})
process.crawl(Spider)
process.start()

# Using an HTTP cache for development
process = CrawlerProcess({
    'AUTOTHROTTLE_TARGET_CONCURRENCY': 3
})
process.crawl(Spider)
process.start()

from scrapy.crawler import CrawlerProcess
from scrapy.spiders import CrawlSpider, Rule, Spider
from scrapy.linkextractors import LinkExtractor


class TrainSpider(Spider):
    name = "trip"
    start_urls = ['https://sale.591.com.tw']
    rules = (
        Rule(LinkExtractor(restrict_xpaths="//a[@class='pageNext']"), follow=True),
        Rule(LinkExtractor(allow=r"/trains/\d+$"), callback='parse_trains')
        # Rule(LinkExtractor(callback = 'parse_trains')
    )

    def parse_trains(self, response):
        ''' do something with this parser '''
        item = response.meta['item']
        return item

if __name__ == "__main__":
    process = CrawlerProcess({
        'LOG_LEVEL': 'DEBUG',
        'CLOSESPIDER_PAGECOUNT': 10
    })
    process.crawl(TrainSpider)
    process.start()

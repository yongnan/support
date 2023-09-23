# -*- coding: utf-8 -*-

BOT_NAME = 'sainsburys'

SPIDER_MODULES = ['sainsburys.spiders']
NEWSPIDER_MODULE = 'sainsburys.spiders'

USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' \
             ' (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36'

ROBOTSTXT_OBEY = True


# adds UTF-8 support for feed exports
FEED_EXPORT_ENCODING = 'utf-8'

FEED_EXPORTERS = {
    'mycsv': 'sainsburys.exporters.CsvItemExporter'
}


ITEM_PIPELINES = {
    'sainsburys.pipelines.DuplicateItemFilter': 1,
    'scrapy.pipelines.images.ImagesPipeline': 5,
    'sainsburys.pipelines.CsvItemPipeline': 800,
}

IMAGES_STORE = '/Users/yongnan/Python/sainsburys/images'

LOG_FORMATTER = 'sainsburys.formatter.SilentlyDroppedFormatter'

# Optional: if you find statistic messages annoying, enable the code below to disable those nasty messages
# EXTENSIONS = {
#     'scrapy.extensions.logstats.LogStats': None
# }

LOG_LEVEL = 'DEBUG'
# CRITICAL
# ERROR
# WARNING
# INFO
# DEBUG

CONCURRENT_REQUESTS = 5
DOWNLOAD_DELAY = 0.125 # 125 milliseconds
AUTOTHROTTLE_ENABLED = True
AUTOTHROTTLE_START_DELAY = 15
AUTOTHROTTLE_MAX_DELAY = 25
AUTOTHROTTLE_DEBUG = True
COOKIES_ENABLED = True

HTTPCACHE_ENABLED = True
HTTPCACHE_EXPIRATION_SECS = 3600  # 60s * 60m = 1hour
HTTPCACHE_DIR = '/Users/yongnan/Python/sainsburys/httpcache'
#HTTPCACHE_IGNORE_HTTP_CODES = []   # default
HTTPCACHE_IGNORE_HTTP_CODES = [503, 418]

# File System Storage cache
# HTTPCACHE_STORAGE = 'scrapy.extensions.httpcache.FilesystemCacheStorage'
# DBM Storage cache
# HTTPCACHE_STORAGE = 'scrapy.extensions.httpcache.DbmCacheStorage'
# use LevelDB cache,   $ pip install leveldb
# HTTPCACHE_STORAGE = 'scrapy.extensions.httpcache.LeveldbCacheStorage'

# -+ splash +-

DOWNLOADER_MIDDLEWARES = {
    'scrapy_splash.SplashCookiesMiddleware': 720,
    'scrapy_splash.SplashMiddleware': 725,
    'scrapy.downloadermiddlewares.httpproxy.HttpProxyMiddleware': 750,
    'scrapy.downloadermiddlewares.httpcompression.HttpCompressionMiddleware': 810,
}

SPIDER_MIDDLEWARES = {
    'scrapy_splash.SplashDeduplicateArgsMiddleware': 100,
}
#SPLASH_URL = 'http://localhost:8050/'
SPLASH_URL = 'http://lon1:8050/'
DUPEFILTER_CLASS = 'scrapy_splash.SplashAwareDupeFilter'
HTTPCACHE_STORAGE = 'scrapy_splash.SplashAwareFSCacheStorage'



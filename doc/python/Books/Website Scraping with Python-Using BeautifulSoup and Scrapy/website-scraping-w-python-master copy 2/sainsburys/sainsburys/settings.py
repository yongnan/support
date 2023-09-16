# -*- coding: utf-8 -*-

BOT_NAME = 'sainsburys'

SPIDER_MODULES = ['sainsburys.spiders']
NEWSPIDER_MODULE = 'sainsburys.spiders'

USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' \
             ' (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36'

ROBOTSTXT_OBEY = True

CONCURRENT_REQUESTS = 1

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

IMAGES_STORE = 'images'

LOG_FORMATTER = 'sainsburys.formatter.SilentlyDroppedFormatter'

# Optional: if you find statistic messages annoying, enable the code below to disable those nasty messages
# EXTENSIONS = {
#     'scrapy.extensions.logstats.LogStats': None
# }

HTTPCACHE_ENABLED = True
HTTPCACHE_EXPIRATION_SECS = 0
HTTPCACHE_DIR = 'httpcache'
#HTTPCACHE_IGNORE_HTTP_CODES = []   # default
HTTPCACHE_IGNORE_HTTP_CODES = [503, 418]

# File System Storage cache
HTTPCACHE_STORAGE = 'scrapy.extensions.httpcache.FilesystemCacheStorage'
# DBM Storage cache
# HTTPCACHE_STORAGE = 'scrapy.extensions.httpcache.DbmCacheStorage'
# use LevelDB cache,   $ pip install leveldb
# HTTPCACHE_STORAGE = 'scrapy.extensions.httpcache.LeveldbCacheStorage'
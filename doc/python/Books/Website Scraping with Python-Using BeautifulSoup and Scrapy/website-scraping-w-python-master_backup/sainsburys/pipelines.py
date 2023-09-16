# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html


# class SainsburysPipeline(object):
#     def process_item(self, item, spider):
#         return item


import pymongo


class MongoDBPipeline(object):

    def __init__(self, mongo_uri, mongo_db, collection_name):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db
        self.collection_name = collection_name

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            mongo_uri=crawler.settings.get('MONGO_URI'),
            mongo_db=crawler.settings.get('MONGO_DATABASE', 'items'),
            collection_name=crawler.settings.get('MONGO_COLLECTION', 'sainsburys')
        )

    def open_spider(self, spider):
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        self.db[self.collection_name].insert_one(dict(item))
        return item


import sqlite3
from sainsburys.items import SainsburysItem

sqlite_ddl = """
CREATE TABLE IF NOT EXISTS {} (
    item_code INTEGER PRIMARY KEY,
    product_name TEXT NOT NULL,
    url TEXT NOT NULL,
    product_image TEXT,
    product_origin TEXT,
    price_per_unit TEXT,
    unit TEXT,
    product_reviews INTEGER,
    rating REAL
)
"""

sqlite_insert = """
INSERT OR REPLACE INTO {}
    values (?, ?, ?, ?, ?, ?, ?, ?, ?)
"""


class SQLitePipeline:
    def __init__(self, database_location, table_name):
        self.database_location = database_location
        self.table_name = table_name
        self.db = None

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            database_location=crawler.settings.get('SQLITE_LOCATION'),
            table_name=crawler.settings.get('SQLITE_TABLE', 'sainsburys'),
        )

    def open_spider(self, spider):
        self.db = sqlite3.connect(self.database_location)
        self.db.execute(sqlite_ddl.format(self.table_name))

    def close_spider(self, spider):
        if self.db:
            self.db.close()

    def process_item(self, item, spider):
        if type(item) == SainsburysItem:
            self.db.execute(sqlite_insert.format(self.table_name),
                            (
                                item['item_code'], item['product_name'], item['url'], item['product_image'],
                                item['product_origin'], item['price_per_unit'],
                                item['unit'] if hasattr(item, 'unit') else None,
                                int(item['product_reviews']) if hasattr(item, 'product_reviews') else None,
                                float(item['rating']) if hasattr(item, 'rating') else None
                            )
                            )
        self.db.commit()


from scrapy.exceptions import DropItem


class DuplicateItemFilter:

    def __init__(self):
        self.item_codes_seen = set()

    def process_item(self, item, spider):
        if item['item_code'] in self.item_codes_seen:
            raise DropItem("Duplicate item found: %s" % item['item_code'])
        self.item_codes_seen.add(item['item_code'])
        return item


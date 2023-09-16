# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy
from scrapy import Field


class SainsburysItem(scrapy.Item):
    url = Field()
    product_name = Field()
    product_image = Field()
    price_per_unit = Field()
    unit = Field()
    rating = Field()
    product_reviews = Field()
    item_code = Field()
    nutritions = Field()
    product_origin = Field()

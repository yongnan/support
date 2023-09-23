import sitemap

# url = "https://www.nasa.gov/sitemap.xml"
url = "http://buy.sinyi.com.tw/sitemap.xml"
map = sitemap.get_sitemap(url)
url_info = sitemap.parse_sitemap(map)
print("Found {0} urls".format(len(url_info)))
for u in url_info[20000:20500]:
    print(u)



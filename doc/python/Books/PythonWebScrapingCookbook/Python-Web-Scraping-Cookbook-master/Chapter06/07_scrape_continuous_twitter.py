from selenium import webdriver
import time

driver = webdriver.PhantomJS('../phantomjs')

print("Starting")
# url = "https://twitter.com"
# url = "https://twitter.com/i/notifications"
url = "https://www.facebook.com/yongnan.chen"
driver.get(url)

scroll_pause_time = 3.5

# Get scroll height
last_height = driver.execute_script("return document.body.scrollHeight")
while True:
    print(last_height)
    # Scroll down to bottom
    driver.execute_script(
        # "window.scrollTo(0, document.body.scrollHeight);"
        "window.document.body.scrollTo = document.body.scrollHeight;"
        # "window.scrollTo(0, Math.max(Math.max(document.body.scrollHeight,document.documentElement.scrollHeight),Math.max(document.body.offsetHeight,document.documentElement.offsetHeight),Math.max(document.body.clientHeight, document.documentElement.clientHeight)));"
    )

    # Wait to load page
    time.sleep(scroll_pause_time)

    # Calculate new scroll height and compare with last scroll height
    new_height = driver.execute_script("return document.body.scrollHeight")
    print(new_height, last_height)

    if new_height == last_height:
        break
    last_height = new_height
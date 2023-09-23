from urllib.request import urljoin
from urllib.parse import urlparse
import re
import requests
from collections import deque

def download_page(url):
    try:
        return requests.get(url).text
    except:
        print('error in the url', url)


def extract_links(page):
    if not page:
        return []
    link_regex = re.compile('<a[^>]+href=["\'](.*?)["\']', re.IGNORECASE)
    return [urljoin(page, link) for link in link_regex.findall(page)]


def get_links(page_url):
    host = urlparse(page_url)[1]
    page = download_page(page_url)
    links = extract_links(page)
    return [link for link in links if urlparse(link)[1] == host]


def breadth_first_search(start_url):
    visited = set()
    queue = deque()
    queue.append(start_url)
    while queue:
        url = queue.popleft()
        if url in visited:
            continue
        visited.add(url)
        queue.extend(get_links(url))
        print(url)


def depth_first_search(start_url):
    visited = set()
    queue = deque()
    queue.append(start_url)
    while queue:
        url = queue.popleft()
        if url in visited:
            continue
        visited.add(url)
        for link in get_links(url):
            queue.appendleft(link)
        print(url)


if __name__ == '__main__':
    print('starting navigation with BFS')
    breadth_first_search('https://www.sainsburys.co.uk/shop/gb/groceries/meat-fish/')

    print()
    print('starting navigation with DFS')
    depth_first_search('https://www.sainsburys.co.uk/shop/gb/groceries/meat-fish/')

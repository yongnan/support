import json
from urllib.request import urlopen

def getCountry(ipAddress):
    response = urlopen('http://api.ipstack.com/'+ipAddress+'?access_key=4452dc0839ce736f7ff3e2c67028db1d&format=1').read().decode('utf-8')
    responseJson = json.loads(response)
    return responseJson.get('region_code')

print(getCountry('50.78.253.58'))

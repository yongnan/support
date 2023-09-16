import json
from get_planet_data import get_planet_data
planets=get_planet_data()
o = json.dumps(planets, indent=4)
print(o, sep="\n")
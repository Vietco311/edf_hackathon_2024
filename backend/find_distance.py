import requests, json

### UNFINISHED
api_key ='AIzaSyDgRnn9abJPNUh2EPdsICk_tjPI1ONtKqo'

source = '41.92160655 8.733953832' #test
dest = '42.70180082 9.444944146' #test

url ='https://maps.googleapis.com/maps/api/distancematrix/json?'

r = requests.get(url + 'origins=' + source +
				'&destinations=' + dest +
				'&key=' + api_key +
                '&unit=metric')

x = r.json()

print(x)

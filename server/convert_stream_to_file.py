import urllib2
import re

def stream_to_file(url, filename):
    response = urllib2.urlopen(url)
    data = response.read()
    try:
        filename = u'../static/dist/downloaded_videos/' + filename+ u'.mp4'
        f = open(filename, 'wb')
        f.write(data)
        return 0
    except:
        return -1

import unirest
import json
from convert_stream_to_file import stream_to_file
from upload_to_firebase import upload_to_firebase
import sys, os
import re

def get_quality(video):
    try: # in case there is no (XXXXp) quality number
        q = int(video["format"].split(" ")[-1][1:-2])
        return q
    except:
        return 0

def get_low_qual_video(list_of_videos):
    hqVideo = list_of_videos[0]

    for v in list_of_videos:
        if v["extension"] == "m4a":
            print("THIS IS M4A")
            curr_res = get_quality(v)
            print(v["format"], v["format_note"], v["extension"])
            if curr_res > get_quality(hqVideo):
                hqVideo = v
    return hqVideo

def get_highest_quality_video(list_of_videos):
    hqVideo = list_of_videos[0]

    for v in list_of_videos:
        curr_res = get_quality(v)
        print(v["format"], v["format_note"], v["extension"])
        if curr_res > get_quality(hqVideo):
            hqVideo = v
   
    return hqVideo

def save_to_file(url, filename):
    print("Downloading video, this might take a while...")
    err_code = stream_to_file(url, filename)
    if(err_code == -1):
        print("couldn't save the file.")
    else:
        print("file saved")

def remove_file(filename):
    filename = filename + ".mp4"
    os.remove(filename)
    print("File was deleted from local machine.")

def get_video_stream_data(yt_url):
    response = unirest.get("https://getvideo.p.mashape.com/?url=" + yt_url,
    headers={
            "X-Mashape-Key": "cece4a1576mshf3dca707c65d3c2p1d30ddjsn15a6e995ec8e",
            "Accept": "text/plain"
            }
    ).body

    print(response["title"], response["uploader"])

    print("STREAMS:")
    list_of_qualities = response["streams"]
    highestQuality = get_highest_quality_video(list_of_qualities)
    print(highestQuality["url"])
    
    fullVideo = get_low_qual_video(list_of_qualities) #both video and audio
    return fullVideo, response["title"]

def remove_slashes(filename):
    new_filename = u''
    for c in filename:
        if not(c == '\\' or c == '/' or c == '?' or c == '|'):
            new_filename += c
    return new_filename

def youtube2mp4(url):
    yt_url = url
    video_data, video_name = get_video_stream_data(yt_url)

    filename = remove_slashes(video_name)
    
    save_to_file(video_data["url"], filename)
    # upload_to_firebase(filename)
    # remove_file(filename)

    print("Finished, file successfully uploaded to firebase with no trace of it in local machine.")
    return filename


def main():
    yt_url = sys.argv[1] #get url from user in cmd [program.py] [youtube-url]

    video_data, video_name = get_video_stream_data(yt_url)
    filename = video_name

    save_to_file(video_data["url"], filename)
    upload_to_firebase(filename)
    remove_file(filename)

    print("Finished, file successfully uploaded to firebase with no trace of it in local machine.")


if __name__ == '__main__':
    main()

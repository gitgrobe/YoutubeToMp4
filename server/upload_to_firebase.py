import firebase_admin
from firebase_admin import credentials, firestore, storage

def upload_to_firebase(filename):
    filename = filename + ".mp4"
    cred=credentials.Certificate('firebasics_cred.json')
    try:
            firebase_admin.initialize_app(cred, {
            'storageBucket': 'firebasics-636dd.appspot.com'
        })
    except:
        print "Couldn't upload?"
        return -1
    bucket = storage.bucket()
    blob = bucket.blob(filename)
    outfile= filename
    try:
        with open(outfile, 'rb') as my_file:
            blob.upload_from_file(my_file)
        print("File uploaded to firebase.")
        return 1
    except:
        return -1 # failed to upload

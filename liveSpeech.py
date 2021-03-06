# # transcribe incoming microphone stream:
# import speech_recognition as sr

# r = sr.Recognizer()
# mic = sr.Microphone()
# with mic as source:
#     r.adjust_for_ambient_noise(source)
#     audio = r.listen(source)
#     transcript = r.recognize_google(audio)
#     print(transcript)


#!/usr/bin/env python3

# NOTE: this example requires PyAudio because it uses the Microphone class

import speech_recognition as sr

# obtain audio from the microphone
r = sr.Recognizer()
with sr.Microphone() as source:
  
    print("Say something!")
    # consider including ambient noise reduction
    # r.adjust_for_ambient_noise(source)
    audio = r.listen(source)


# recognize speech using Sphinx
try:
    print("methinks you says: " + r.recognize_sphinx(audio))
except sr.UnknownValueError:
    print("Sphinx could not understand audio")
except sr.RequestError as e:
    print("Sphinx error; {0}".format(e))

This is the speech-to-text program! 

Download the [new release here](https://github.com/michaelpalumbo/artstar/releases/tag/0.0.6), then return to this page for install/run instructions:

## Requirements

This program is written in Python. MacOS comes pre-installed with Python. 

### MacOS Req's
Make sure homebrew is installed. Open a terminal window and type:
```shell
brew -v
``` 
and hit *enter*

You should get something like 'Homebrew 2.1.9' (don't worry about the exact numbers)
If not, you need to install homebrew. Go here: [https://brew.sh/](https://brew.sh/)

### Windows Req's:
Install python3: [https://www.python.org/downloads/release/python-374/](https://www.python.org/downloads/release/python-374/) (releases are lower down on the page)

Once python3 is installed, make sure its up to date
```shell
python -m pip install --upgrade pip setuptools wheel
```
then, install PocketSphinx (a speech interpreter):
```shell
pip install pocketsphinx
```
*if 'pip' returns an error, replace it with 'pip3'*

Make sure the Chocolatey package manager is installed (its the equivalent of macOS' homebrew:
[https://chocolatey.org/](https://chocolatey.org/)

## Installation
The rest of these steps require a terminal window. each step may take a while... wait before proceeding to next step
1. Install portaudio

OSX:
```shell
brew install portaudio
```
**Ian:** Portaudio isn't available for Windows, and I haven't found any docs on whether this program needs portaudio to run on windows. Try skipping this step, just let me know if theres any problems. At worst, I might have to find an alternate library...

2. Install elasticsearch

OSX:
```shell
brew install elasticsearch
```
Windows:
```shell
choco install elasticsearch
```

3. Install some python libraries. Run each line separately (I'm just saving myself having to type multiple steps here)
```shell
pip install SpeechRecognition
pip install pyaudio
pip install elasticsearch
```

## Running

I wrote two programs. One is a live interpreter, the other interprets recorded audio files. The former is easier to run, so it can serve as a useful test that the installation steps all worked:

### Live speech transcriber

1. 1. We'll run this program from the termninal! First, point the terminal to the artstar directory:
```shell
cd /full/path/to/artstar/folder
``` 
**hint** you can type *cd*, then drag and drop the icon for the artstar folder into terminal and it should copy the path for you. 

2. run the program:
```shell
python liveSpeech.py
```
After hitting enter, speak a phrase. Shortly after the program will return what it understood, and then quit. Please let me know if this program didn't work. 


### Audio file transcriber

1. We'll run this program from the termninal! First, point the terminal to the artstar directory:
```shell
cd /full/path/to/artstar/folder
``` 
**hint** you can type *cd*, then drag and drop the icon for the artstar folder into terminal and it should copy the path for you. 

2. Make sure there is a folder in artstar called 'interviews' (spelled exactly)

3. either [a] copy the file 'test.wave' from /artstar into /interviews, or [b] using an audio program record a short clip of yourself speaking, and save it in /interviews (name it whatever you like, just do NOT include any spaces and the extension MUST be ".wave", NOT '.wav' rename it after if you have to)

4. To transcribe the test.wave, run the program using:
```shell
python speech.py interviews/test
```
To transcrive your own recording, run the program using:
```shell
python speech.py interviews/filename
```
**note** don't include the file extension in the python command!

Wait however long the length of the file is, then check the interview folder for a new text file with the same name as your input .wave file. 

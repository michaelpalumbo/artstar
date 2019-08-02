This is the speech-to-text program! 

Download the [new release here](https://github.com/michaelpalumbo/artstar/releases/tag/0.0.6), then return to this page for install/run instructions:

## Requirements

This program is written in Python and for the time being it only works on MacOS (sorry Ian!). This is due to MacOS having a specific speech recognition interpreter... I haven't experimented with a PC-version yet. 
MacOS comes pre-installed with Python. 
Make sure homebrew is installed. Open a terminal window and type:
```shell
brew -v
``` 
and hit *enter*

You should get something like 'Homebrew 2.1.9' (don't worry about the exact numbers)
If not, you need to install homebrew. Go here: [https://brew.sh/](https://brew.sh/)

## Installation
The rest of these steps require a terminal window. each step may take a while... wait before proceeding to next step
1. Install portaudio:
```shell
brew install portaudio
```

2. Install elasticsearch
```shell
brew install elasticsearch
```

3. Install some python libraries. Run these separately (I'm just saving myself having to type multiple steps here)
```shell
pip install SpeechRecognition
pip install pyaudio
pip install elasticsearch
```

## Running

1. We'll run this program from the termninal! First, point the terminal to the artstar directory:
```shell
cd /full/path/to/artstar/folder
``` 
**hint** you can type *cd*, then drag and drop the icon for the artstar folder into terminal and it should copy the path for you. 

2. Make sure there is a folder in artstar called 'interviews' (spelled exactly)

3. either [a] copy the file 'test.wave' from /artstar into /interviews, or [b] using an audio program record a short clip of yourself speaking, and save it in /interviews (name it whatever you like, just do NOT include any spaces and the extension MUST be ".wave", NOT '.wav' rename it after if you have to)

4. 
To transcribe the test.wave, run the program using:
```shell
python speech.py interviews/test
```
To transcrive your own recording, run the program using:
```shell
python speech.py interviews/filename
```
**note** don't include the file extension in the python command!

Wait however long the length of the file is, then check the interview folder for a new text file with the same name as your input .wave file. 

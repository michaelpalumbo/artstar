# artstar

**Our artstar interviewer program is written in javascript & nodejs.**

## Install instructions for OSX: 
1. Run the program *Terminal.app*
  - This is found either in Applications/Utilities/Terminal.app, or you use the shortcut Command-Space, start to type 'terminal' and hit enter once the app is listed first. Do this now. 
  - The Terminal application will let you control nearly everything in your computer using special commands. Your computer comes pre-installed with many commands. 
  - Example command. Watch an all text-based animation of Star Wars... copy the following
  ```shell
  telnet towel.blinkenlights.nl
  ```
  ...and paste it into the terminal window. Hit Enter. Wait about 1 minute...

2. To stop a program running in terminal, you *could* close the window, but typically we want to keep the window open to run different commands. To simply stop a running command, use the shortcut "control-c" (the 'control' key plus the 'c' key). Now the star wars animation has stopped. 

3. The program I have writted uses several comand-line programs. To install these we'll use whats called a package manager, which is like a free marketplace for programs which run within Terminal.app. We'll use *Homebrew*. Run this in terminal:

```shell
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
Might take a while. Minutes likely. 

3. When its completed, install sox (a commandline program for processing soundfiles)

```shell
brew install sox
```

4. Install nodejs (the language this app is written in)
```shell
brew install node
```
5. Install imagesnap (webcam utility)
```shell
brew install imagesnap
```

Windows: 

1. Install [sox](https://sourceforge.net/projects/sox/files/latest/download)
2. Install [nodejs](https://treehouse.github.io/installation-guides/windows/node-windows.html)
  - note: in the 'Test It!' section, they refer to something called a 'command line tool', like Powershell or Windows Command Prompt. You should be able to find either of these in your programs folder. 
  - For now, you can ignore their suggestion of "Create a test file and run it" (unless you're comfortable or curious about programming in nodejs)


## Running the program:

OSX:

1. Locate the artstar folder in Finder. In terminal, type:
```shell
cd
```
Then drag the folder into terminal. The terminal command should now display:
```shell
cd /Users/username/path/to/artstar/
```
hit enter. Now everything we do in terminal will be done from within this folder. 

Run:

```shell
node artstar.js -name yourname
```
*note* your name cannot include spaces or it will throw an error. 

artstar.js will run with a default setting of 1 new photo and 1 new audio recording every 30 second interval, and will run for 10 intervals. To change either of these settings, add these flags to the run command:

```shell
-interval numberOfIntervals; -snapshots numberOfSnapshots
```

For example:

```shell
node artstar.js -name michaelpalumbo -interval 60 -snapshots 3
```
Would save a 60-second audio file and a photo to a folder 'michaelpalumbo' every 60 seconds, for 3 minutes. 

The program will stop running after the snapshot limit reached. 

Of course, if you want to stop early, remember that you can use 
```shell
control-c
```
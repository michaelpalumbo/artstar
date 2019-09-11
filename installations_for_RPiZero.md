Let’s get started installing dlib on our Raspberry Pi by ensuring we have met our library/package dependencies:
Install dlib (the easy, complete guide)





$ sudo apt-get update
$ sudo apt-get install build-essential cmake
$ sudo apt-get install libopenblas-dev liblapack-dev libatlas-base-dev

~~$ sudo apt-get install libx11-dev libgtk-3-dev~~ << son't install these
A few quick notes on both X11/GTK and OpenBLAS:
	.	We are installing GTK and X11 for GUI functionality inside dlib. These libraries can be skipped if you do not care about the GUI functionality, saving you 100-200MB in space. Space can be a premium on the Raspberry Pi, but again, if you need GUI functionality make sure you install them.
	
	
	>>>> This is key!	We install OpenBLAS for linear algebra optimizations which allows dlib functionality to execute faster. You can technically skip this as well but I highly recommend you install OpenBLAS as the optimizations are significant — any optimization you can achieve on the Raspberry Pi is well worth it!

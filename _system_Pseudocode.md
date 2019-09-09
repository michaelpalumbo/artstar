1. new audience member walks into waiting area, becomes artistNN
  1. are given a number: *artistNN* = *artist++*
  2. they wait for their number to be called by the waiting area controller
  3. when their number is called, they proceed to the creation space

2. *artistNN* enters a creation space
	1. the interviewer(?) enters the *artistNN* ID into the creatorSpace.maxpat dialog box to start the interview. 
		1. the creatorSpace.maxpat adds a new object to the artStar database: { artistNN: { } }
			- note that this databse must be accessabile across the network 

	2. *artistNN* & interviewer chat for ~5 minutes.
		1. creatorSpace.maxpat enumerates the .wave files and screenshots in a folder
	3. at the conclusion of the interview, the interviewer and/or *artistNN* choose a portrait
		1. creatorSpace.maxpat prints the protrait & quote
		2. creatorSpace.maxpat adds the portrait to the artstar database object: { artistNN: { timestamp: <UTC_timestamp>, quote: 'entire quote from speech2text.py', portrait: <UTC_timestamp>.jpeg }
	4. the interviewer & artistNN have 20 seconds to mount the portrait in the frame and enter the gallery
	5. when the interviewer and artistNN enter the gallery, whichever portrait is the least popular portrait 
		
		to do: there are two database arrays: 1. the artists (already described above), 2, the leaderboard array
		
		
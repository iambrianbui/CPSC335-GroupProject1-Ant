CPSC 335-04 Project 1: Cella Ant
Group LB

• Class number: CPSC 335-03
• Team name and members: LB (Lola Holliday, Brian Bui)
• Project number and name: Project 1 Cella Ant

• External Requirements:

• Setup and Installation (if any):


• Sample invocation:


• Intro (including the algorithm used)

Informal algorithm:
	Check coordinate in front of ant (current coordinate)
	Check if the respective coordinate is available in the array.
		If false, add it to the array, in the "Black" state.
	Check if the current coordinate is available in the array.
		If false, it is "black," cycle to red.
		If true, cycle through to the next state.
	Change the state of the current coordinate.
	Move forward.
	Change the orientation of the ant.
	Redraw the canvas.
Formal algorithm:
	At a black or red square, turn 90° left, flip the color of the square, move forward one unit
	At a yellow or green square, turn 90° right, flip the color of the square, move forward one unit

• Features (both included and missing)
	Missing actual ant 

• Contents: Files in the .zip submission

• Bugs (if any)
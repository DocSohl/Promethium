from __future__ import division
import random
import math
import json

##Creates a random map using a spherical coordinate system, converts to cartesian coordinates, and writes to file


eff = open("..\\Resources\\coordinate.txt","w")

for i in range(0,250):
	
	r = random.random()*250 + 75
	theta = random.random()*2*math.pi
	phi = random.random()*math.pi	
	
	x = (r*math.sin(phi)*(math.cos(theta)))
	y = (r*math.sin(phi)*(math.sin(theta)))
	z = (r*math.cos(phi))
	
	data = {'x': x, 'y': y, 'z': z, 'station':i}
	eff.write(json.dumps(data) + "\n")
	
eff.close()







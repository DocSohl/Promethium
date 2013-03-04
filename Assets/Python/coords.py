from __future__ import division
import random
import math


##Creates a random map using a spherical coordinate system then converses to cartesian and lastly writes to file


eff = open("coordinate.txt","w")

x = random.random()

coord = []


for i in range(0,250):
	b = []
	r = random.random()*250 + 75
	theta = random.random()*2*math.pi
	phi = random.random()*math.pi
	b.append(int(r*math.sin(phi)*math.cos(theta)))
	b.append(int(r*math.sin(phi)(math.sin(theta)))
	b.append(int(r*math.cos(phi)))
	coord.append(tuple(b))

coord = set(coord)

for line in coord:
	
	eff.write(str(line[0]) + "," + str(line[1]) + "," + str(line[2]) + "\n")
	
eff.close



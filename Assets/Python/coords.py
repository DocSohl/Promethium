from __future__ import division
import random
import math


##Creates a random map using a spherical coordinate system then converses to cartesian and lastly writes to file


eff = open("coordinate.txt","w")

x = random.random()

coord = []


for i in range(0,250):
	b = []
	q = random.random()*250 + 75
	w = random.random()*2*math.pi
	e = random.random()*2*math.pi
	b.append(int(q*math.cos(w)))
	b.append(int(q*math.sin(w)))
	b.append(int(q*math.sin(e)))
	coord.append(tuple(b))

coord = set(coord)

for line in coord:
	
	eff.write(str(line[0]) + "," + str(line[1]) + "," + str(line[2]) + "\n")
	
eff.close



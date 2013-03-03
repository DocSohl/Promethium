#pragma strict

var station : GameObject;

function Start () {
	//Test creation of a single testing station
	var position = [151,0,9];
	createStation(position);
}

function createStation (position : Array) {
	var x = position[0];
	var y = position[1];
	var z = position[2];
	var clone : GameObject;
	clone =  Instantiate(station, Vector3 (x, y, z), Quaternion.identity);
	
}

function Update () {

}
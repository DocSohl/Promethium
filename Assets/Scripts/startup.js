#pragma strict
import System.IO;

var station : GameObject;
var map = "\\Resources\\coordinate.txt";

function Start () {
	//Test creation of a single testing station
	var positions = ReadMap(map);
	for (position in positions) {
		createStation(position.Split(","[0]));
	}
	//createStation(position);
}

function createStation (position : System.String[]) {
	Debug.Log(position[0]);
	var x = parseInt(position[0].Replace("\r",""));
	var y = parseInt(position[1].Replace("\r",""));
	var z = parseInt(position[2].Replace("\r",""));
	Instantiate(station, Vector3 (x, y, z), Quaternion.identity);
	
}

function Update () {

}

function ReadMap(map : String) {
    var sr = new StreamReader(Application.dataPath + "/" + map);
    var fileContents = sr.ReadToEnd();
    sr.Close();
 
    var lines = fileContents.Split("\n"[0]);
    return lines;
}
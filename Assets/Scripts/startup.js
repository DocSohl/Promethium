#pragma strict
import System.IO;

var station : GameObject;
var map = "\\Resources\\coordinateVersion Three.txt";
static var stations = new Array();
static var ships = new Array();
var selected : GameObject = null;
var infoboxstyle : GUIStyle;
var cam : Camera;

function Start () {
	//Test creation of a single testing station
	var positions = ReadMap(map);
	for (position in positions) {
		if (position!=""){
			createStation(position.Split(","[0]));
		}
	}
}

function createStation (position : System.String[]) {
	var x = parseInt(position[0].Replace("\r",""));
	var y = parseInt(position[1].Replace("\r",""));
	var z = parseInt(position[2].Replace("\r",""));
	stations.Add(Instantiate(station, Vector3 (x, y, z), Quaternion.identity));
	
}

function Update () {
	if (Input.GetMouseButtonDown(0)){
        var hit : RaycastHit;
        var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
 
        if (Physics.Raycast(ray, hit))
        {
        	var clicked = hit.transform.gameObject;
			if(hit.transform.name=="Body"){
				clicked = hit.transform.parent.gameObject;
			}
//    		Debug.Log(clicked.transform.name);
			selectObject(clicked);
        }
        else{
        	selectObject(null);
        }
    }
}

function ReadMap(map : String) {
    var sr = new StreamReader(Application.dataPath + "/" + map);
    var fileContents = sr.ReadToEnd();
    sr.Close();
 
    var lines = fileContents.Split("\n"[0]);
    return lines;
}

function selectObject(obj : GameObject){
	selected = obj;
}

function getSelected() : GameObject{
	return selected;
}

function OnGUI () {
	if(selected==null){return;}
	var context : String;
	var ships : int;
	var guipos = cam.WorldToScreenPoint(selected.transform.position);
	guipos.y = Screen.height-guipos.y;
	if(selected.name=="Ship"){
		ships = selected.GetComponent(ShipProperties).garrison;
		context = "This fleet has:\n"+ships+" ship";
		if(ships!=1){context+="s";}
		GUI.Box(Rect(guipos.x-100, guipos.y+10, 200, 100), context, infoboxstyle);
	}
	else if(selected.name=="Station"){
		ships = selected.GetComponent(StationProperties).garrison;
		context = "This fleet has:\n"+ships+" ship";
		if(ships!=1){context+="s";}
		GUI.Box(Rect(guipos.x-100, guipos.y+10, 200, 100), context, infoboxstyle);
	}
}

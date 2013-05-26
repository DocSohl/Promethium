#pragma strict
import System.IO;

var station : GameObject;
var map = "\\Resources\\coordinateVersion Three.txt";
static var stations = new Array();
static var ships = new Array();
var selected : GameObject = null;
var infoboxstyle : GUIStyle;
var cam : Camera;
private var guipos : Vector3;
private var commit : String;

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
	if (Input.GetMouseButtonDown(0)&&!OverGUI()){
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

function OverGUI(){
	var x = Input.mousePosition.x;
	var y = Screen.height - Input.mousePosition.y;
	var vertical = x>guipos.x-100&&x<guipos.x+100;
	var horizontal = y>guipos.y+10&&y<guipos.y+110;
	return vertical&&horizontal;
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
	commit = ships.ToString();
	var ships : int;
	if(selected.name=="Ship"){
		ships = selected.GetComponent(ShipProperties).garrison;
	}
	else if(selected.name=="Station"){
		ships = selected.GetComponent(StationProperties).garrison;
	}
	commit = ships.ToString();
}

function getSelected() : GameObject{
	return selected;
}

function OnGUI () {
	if(selected==null){return;}
	var context : String;
	var ships : int;
	guipos = cam.WorldToScreenPoint(selected.transform.position);
	guipos.y = Screen.height-guipos.y;
	GUI.BeginGroup(Rect(guipos.x-100, guipos.y+10, 200, 100));
	if(selected.name=="Ship"){
		ships = selected.GetComponent(ShipProperties).garrison;
		context = "Strength:\n"+ships+" ship";
	}
	else if(selected.name=="Station"){
		ships = selected.GetComponent(StationProperties).garrison;
		context = "Garrison:\n"+ships+" ship";
	}
	if(ships!=1){context+="s";}
	GUI.Box(Rect(0,0,200,100), context, infoboxstyle);
	commit = GUI.TextField(Rect(120,5,60,40),commit,5);
	if(GUI.Button(Rect(120,55,60,40),"Assign\nTroops")){
//		int.TryParse(commit,ships);
		print("Committing: "+commit);
	}
	GUI.EndGroup();
}

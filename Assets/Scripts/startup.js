#pragma strict
import System.IO;

var cam : Camera; //The player camera object
var station : GameObject; //PreFab station style
var map = "\\Resources\\coordinateVersion Three.txt"; //Map data to load from
static var stations = new Array(); //List of all stations in the map
static var ships = new Array(); //List of all ships in the map

private var selected : GameObject = null; //The currently clicked and selected object
private var commit : String; //The number of ships committed from the Selected Objects Box
private var mouseoverobject : GameObject = null; //The mouseover object


function Start () { //Run on true game startup
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
	var hit : RaycastHit;
    var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	var ogui : boolean = OverGUI();
	if(!ogui){
	    if (Physics.Raycast(ray, hit)){ //Check if the RayCast hits an object
        	var obj = hit.transform.gameObject;
			if(hit.transform.name=="Body"){ //Some objects have separate Body subcomponents (stations, etc)
				obj = hit.transform.parent.gameObject;
			}
	    	if (Input.GetMouseButtonDown(0)){ //Select the object if the mouse is clicked
				selectObject(obj);
	    	}
	    	else{ //Otherwise activate mouseover
	    		mouseoverobject = obj;
	    		mousebox.pos = obj.transform.position;
	    	}
	    }
	    else if(Input.GetMouseButtonDown(0)){
	    	selectObject(null);
	    }
	}
}

function OverGUI() : boolean{ //Check whether the mouse is currently over the GUI
	var x = Input.mousePosition.x;
	var y = Screen.height - Input.mousePosition.y;
	var vertical = x>infobox.pos.x-100&&x<infobox.pos.x+100;
	var horizontal = y>infobox.pos.y+10&&y<infobox.pos.y+110;
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
	if(selected==null||(selected.name!="Ship"&&selected.name!="Station")){selected=null;return;}
	commit = ships.ToString();
	var tempships : int;
	if(selected.name=="Ship"){
		tempships = selected.GetComponent(ShipProperties).garrison;
	}
	else if(selected.name=="Station"){
		tempships = selected.GetComponent(StationProperties).garrison;
	}
	commit = tempships.ToString();
}

function getSelected() : GameObject{
	return selected;
}

function OnGUI () {
	if(selected!=null){ //Selected Object Box
		infobox.drawGUI();
	}
	if(mouseoverobject!=null){
		mousebox.drawGUI();
	}
	
}



class GUIObject{
	public var pos : Vector3;
	public var style : GUIStyle;
	public var drawGUI = function(){return;};
}

var infobox = new GUIObject();
var mousebox = new GUIObject();

infobox.drawGUI = function(){
	var context : String;
	var tempships : int;
	infobox.pos = cam.WorldToScreenPoint(selected.transform.position);
	infobox.pos.y = Screen.height-infobox.pos.y;
	GUI.BeginGroup(Rect(infobox.pos.x-100, infobox.pos.y+10, 200, 500)); 
	if(selected.name=="Ship"){
		tempships = selected.GetComponent(ShipProperties).garrison;
		context = "Strength:\n"+tempships+" ship";
	}
	else if(selected.name=="Station"){
		tempships = selected.GetComponent(StationProperties).garrison;
		context = "Garrison:\n"+tempships+" ship";
	}
	if(tempships!=1){context+="s";}
	GUI.Box(Rect(0,0,200,100), context, infobox.style);
	commit = GUI.TextField(Rect(120,5,60,40),commit,5);
	if(GUI.Button(Rect(120,55,60,40),"Assign\nTroops")){
		print("Committing: "+commit);
	}
	GUI.EndGroup();
};

mousebox.drawGUI = function(){
	mousebox.pos.y = Screen.height - mousebox.pos.y;
//	GUI.BeginGroup(Rect(mousebox.pos.x, mousebox.pos.y,0.125*w,0.083*h));
//	GUI.EndGroup();
	mouseoverobject = null;
};
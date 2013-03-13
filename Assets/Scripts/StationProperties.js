
var StationName = "Station";
var garrison = 0;


function Start () {
	nameChange(StationName);
	transform.name = StationName;
}

function Update () {

}

function ShipsLand(num) {
	garrison+=num;
}

function ShipsLeave(num) {
	garrison-=num;
}

function nameChange(newname){
	StationName = newname;
	transform.Find("Label").GetComponent(TextMesh).text = StationName;
}
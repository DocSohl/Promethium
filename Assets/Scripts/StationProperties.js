
var StationName = "Station";
var garrison = 10;
var ship : GameObject;
var owner : String = "AI";

//var startup : startup = GetComponent(startup);

function Start () {
	nameChange(StationName);
	transform.name = StationName;
//	spawnShip();
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

function spawnShip(){ //temporary
	if(garrison>0){
		var stationnum = Random.RandomRange(0,startup.stations.length);
		var newShip:GameObject = Instantiate(ship, transform.position, Quaternion.identity);
		newShip.GetComponent(ShipProperties).source = gameObject;
		newShip.GetComponent(ShipProperties).destination = startup.stations[stationnum];
		startup.ships.Add(newShip);
		ShipsLeave(1);
	}
}

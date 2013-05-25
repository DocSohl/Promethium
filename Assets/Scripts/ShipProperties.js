var ShipName = "Ship";
var garrison = 1;
var destination : GameObject = null;
var source : GameObject = null;
var acceleration = 1; //unused
var velocity = 1; //temporarily used instead of acceleration curves for simplicity
var destline : LineRenderer;

function Start () {
	nameChange(ShipName);
	transform.name = ShipName;
	destline = GetComponent(LineRenderer);
}

function Update () {
	if(destination!=null){
		showPath();
		var moveDirection = (destination.transform.position-transform.position).normalized*velocity;
		var rotationDirection = Quaternion.LookRotation(moveDirection);
		transform.rotation = Quaternion.Slerp(transform.rotation,rotationDirection,10);
		transform.position =  Vector3.MoveTowards(transform.position, destination.transform.position, velocity*Time.deltaTime);
		if((destination.transform.position-transform.position).magnitude==0){
			destination.GetComponent(StationProperties).ShipsLand(garrison);
			Destroy(gameObject);
		}
	}
}

function TransferIn(num) {
	garrison+=num;
}

function TransferOut(num) {
	garrison-=num;
}

function nameChange(newname){
	ShipName = newname;
	transform.Find("Label").GetComponent(TextMesh).text = ShipName;
}

function showPath() {
	if(destination!=null){
		destline.SetPosition(0,transform.position);
		destline.SetPosition(1,destination.transform.position);
	}
}
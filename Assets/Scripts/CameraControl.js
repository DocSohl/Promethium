var target : Camera;
var controller : CharacterController;
var flySpeed : int = 10;
var sprintspeed : int = 30;
var turnSpeed : float = 1;

//private var lastpoint : float = 0;

function Awake () {
	if (!target){
		target = camera;
		Debug.Log("Camera Automatically Assigned as: "+target);
	}
	controller = target.collider;
	Debug.Log("Found Collider: "+controller);
}


function Update () {
	var v = Input.GetAxis("Vertical");
	var h = Input.GetAxis("Horizontal");
	var x = Input.GetAxis("Mouse X");
	var y = Input.GetAxis("Mouse Y");
	var mod = Input.GetKey(KeyCode.LeftShift);
	var rightmouse = Input.GetMouseButton(1);
//	Debug.Log("V: "+v+" - H: "+h+" - X: "+x+" - Y: "+y);
//	Debug.Log(transform.eulerAngles.x);
	forward = controller.transform.TransformDirection(Vector3.forward);
	forward.y = 0;
//	Debug.Log(forward);
	moveDirection = Vector3(h,0,v);
	moveDirection = transform.TransformDirection(moveDirection);
	if(mod){
		moveDirection = moveDirection*sprintspeed;
	}
	else{
		moveDirection = moveDirection*flySpeed;
	}
	controller.Move(moveDirection*Time.deltaTime);
//	controller.SimpleMove(forward*v*flySpeed*Time.deltaTime);
//	controller.transform.Translate(forward.normalized*v*flySpeed*Time.deltaTime,Space.World);
//	controller.transform.Translate(Vector3.right*h*flySpeed/2*Time.deltaTime,Space.Self);
	if(rightmouse){
		controller.transform.Rotate(Vector3.up,x*turnSpeed,Space.World);
		controller.transform.eulerAngles.z=0;
		controller.transform.Rotate(Vector3.right,-y*turnSpeed,Space.Self);
	}
	
	//Debug.Log((transform.position.y-lastpoint)+", "+(Time.deltaTime*Time.deltaTime)+", "+(transform.position.y-lastpoint)/(Time.deltaTime*Time.deltaTime));
	//lastpoint = transform.position.y;
}


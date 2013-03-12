#pragma strict
function Update() {
	var rotation = Quaternion.LookRotation(Camera.main.transform.position-transform.position).eulerAngles;
	rotation.x=0;
	rotation.z=0;
    transform.rotation = Quaternion.Euler(rotation);
}
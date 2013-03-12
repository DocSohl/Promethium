var target : Transform;

 

function Update (){

   transform.position.x = Camera.main.WorldToViewportPoint (target.position).x;

   transform.position.y = Camera.main.WorldToViewportPoint (target.position).y;

}
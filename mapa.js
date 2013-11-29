// JavaScript Document
<!--------
		var x=document.getElementById("demo");
function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
  else{x.innerHTML="Geolocation não é suportada.";}
  }
function showPosition(position)
  {
  x.innerHTML="Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude; 
  }
		<!--------
		function showPosition(position)
{
var latlon=position.coords.latitude+","+position.coords.longitude;

var img_url="http://maps.googleapis.com/maps/api/staticmap?center="
+latlon+"&zoom=14&size=300x300&sensor=false";

document.getElementById("mapholder").innerHTML="<img src='"+img_url+"'>";
}
		<!--------
		function showError(error)
  {
  switch(error.code) 
    {
    case error.PERMISSION_DENIED:
      x.innerHTML="User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML="Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML="The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML="An unknown error occurred."
      break;
    }
  }
		<!--------
		function saveLocal(position){
			var lg=position.coords.longitude;
				lt=position.coords.latitude;
				alert(lg+ " " +lt);
		}
		
		<!-----
		function showPosition2(position)
		{
		var latlon2=saveLocal(lt,lt);

		var img_url="http://maps.googleapis.com/maps/api/staticmap?center="
		+latlon+"&zoom=14&size=300x300&sensor=false";

		document.getElementById("mapholder2").innerHTML="<img src='"+img_url+"'>";
		}
		
		
var map;

function init(){
	var mapOptions = {
		center: {lat: 40.1357818476, lng: -100.06093457},
		zoom: 4,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(
		document.getElementById('mapCanvas'), mapOptions
	)
};
window.addEventListener("load", init, false)


nurseArray = [
	{title : "Bailey Nurseries, Inc." , address:'1325 Bailey Road St. Paul, MN 55119', website:'http://www.baileynurseries.com/'},
	{title : "Brotzman's Nursery, Inc." , address:'6899 Chapel Road Madison, OH 44057', website:'http://www.brotzmansnursery.com/'},
	{title : "Carlton Plants LLC" , address:'P.O. Box 398 Dayton, OR 97114', website:'http://www.carltonplants.com/'},
	{title : "Cedar Valley Nurseries" , address:'19626 State Hwy 1 East Ada, OK 74820', website:'http://cedarvalleynurseries.com'},
	{title : "Greenleaf Nursery Co." , address:'28406 Highway 82 Park Hill, OK 74451', website:'http://www.greenleafnursery.com/'},
	{title : "Hans Nelson and Son Nursery", address:'31020 S.E. Waybill Boring, OR 97009', website:'http://www.hansnelson.com/'},
	{title : "Heritage Seedlings Inc", address:'4194 71st Ave S.E. Salem, OR 97317', website:'http://www.heritageseedlings.com/'},
	{title : "Honey Creek Nursery" , address:'66301 East 320 Rd. Grove, OK 74344', website:'http://www.honeycreeknurseries.com/'},
	{title : "John Holmlund Nursery, LLC" , address:'29285 S.E. Hwy 212 Boring, OR 97009', website:'http://www.jhnsy.com/'},
	{title : "Frank Schmidt and Son Co" , address:'9500 Southeast 327th Ave. Boring, OR 97009', website:'http://www.jfschmidt.com/'},
	{title : "Kankakee Nursery Co" , address:'P.O. Box 288 Aroma Park, IL 60910', website:'http://www.kankakeenursery.com/'},
	{title : "KCK Farms, LLC" , address:'1183 S.E. Amity-Dayton Hwy. Dayton, OR 97114', website:'http://www.kckfarms.com/'},
	{title : "Robinson Nursery Inc." , address:'P.O Box 100 Amity, OR 97101', website:'http://www.robinsonnursery.com/'},
	{title : "Sester Farms" , address:'33205 S.E. Oxbow Dr. Gresham, OR 97080', website:'http://www.sesterfarms.com/'},
	{title : "Speer and Sons Nursery Inc." , address:'18546 Arbor Grove Rd. Woodburn, OR 97071', website:'http://www.speernursery.com/home.html'},
	{title : "Surface Nursery" , address:'33740 SE Lusted Rd Gresham, OR 97080', website:'http://www.surfacenursery.com'},
	{title : "Walnut Hill Farms" , address:'947 Walnut Hill Rd. Belvidere TN, 37306', website:'http://www.tnnursery.com/WalnutHill/'}
]

$ = jQuery;
Ls = [];
Ms = [];



function b(){
	for(i=0;i<Ls.length;i++){
		Ms.push(new google.maps.Marker({
	        			position: Ls[i],
	        			map: map,
	        			title: nurseArray[i].title
	        	}));
		Ms[i].addListener('click', function(e) {
    			ev = e;
    			currentLocation = e.latLng;
    			/*
    			if (.getAnimation() !== null) {
    				marker.setAnimation(null);
 					 	} else {
   						 marker.setAnimation(google.maps.Animation.BOUNCE);
 					 	}
    			*/
    			var mLat = e.latLng.lat();
    			var marker;
    			//var curN;

    			for(i=0;i<Ms.length;i++){
    				if(mLat == Ms[i].position.lat()){
    					marker = Ms[i];
    					//console.log(Ms[i].title)
    					curN = nurseArray[i];
    					info(curN);
    				}

    			}

    			function info(curN){
    			contentString = '<div>'+
   				'</div>'+
   				'<h2 id="firstHeading">'+curN.title+'</h2>'+
  			 	'<div id="bodyContent">'+
   				curN.address+'<br><br>'+
   				'<a href="'+curN.website+'" target="_blank">'+curN.website+'</a>'+
   				'</div>'+
   				'</div>';
    			infoWindow.setMap(null);
    			setTimeout(function(){
    				infoWindow = new google.maps.InfoWindow({
   				 	content: contentString,
    				position: currentLocation,
    				id:'ok'
					})
    				infoWindow.open(map, marker);
    			},100)
    			}
    		});
	}
}

function a(Ms){
	for(i=0;i<nurseArray.length;i++){
	
		$.getJSON('http://maps.google.com/maps/api/geocode/json?address=' + nurseArray[i].title).then(function(r){
		location1 = r.results[0].geometry.location;
		Ls.push(new google.maps.LatLng(location1));
		
		if(Ls.length == 17){
			setTimeout(function(){b()}, 1000)
		}

		});
	}
}

a();


var currentLocation;
var contentString;

infoWindow = new google.maps.InfoWindow({
    content: contentString,
    position: currentLocation,
    id:'ok'
})


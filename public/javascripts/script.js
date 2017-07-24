
var myApp = angular.module('myApp', []);

myApp.controller("controller", function($scope, $http, $q){
    scp = $scope;
    rest = './foo'

    //$http.get(rest).then(function(r){$scope.query = r})


    $scope.dbQuery = function dbQuery (rest, params){
    	deferred = $q.defer();

        var xsrf = $.param({fkey: "key"});
        $http({
            method: 'POST',
            url: rest,
            data: params,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function(response){
            deferred.resolve(response);
            $scope.query = response.data[0];
        })

        return deferred.promise
    }; 


    getDataFromGeoJSON = function getDataFromGeoJSON(url){
        deferred = $q.defer();
        $.getJSON(url).then(function(r){
            dingus = r
        })
        return deferred.promise
    }

    $scope.dbQuery('./foo').then(function(r){
        rgeoJSON = r.data[0].row_to_json;
        rba = r;

        map = L.map('map', {drawControl: true}).setView([39.287, -76.60986], 13);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
             maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.light'
        }).addTo(map);

        var myIcon = L.icon({
            iconUrl: 'my-icon.png',
            iconSize: [38, 95],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],
            shadowUrl: 'my-icon-shadow.png',
            shadowSize: [68, 95],
            shadowAnchor: [22, 94]
        });
    L.geoJSON(rgeoJSON, {
        icon: myIcon
    }).bindPopup(function (layer) {
        return '<h6>'+layer.feature.properties.stop_name+'</h6>'

    }).addTo(map);
    })

    //currentStops = getDataFromGeoJSON('https://opendata.arcgis.com/datasets/cf30fef14ac44aad92c135f6fc8adfbe_10.geojson')

    geoJSON = function(){
        this.type = "FeatureCollection";
        this.features = [];
    }


    $.getJSON('https://opendata.arcgis.com/datasets/cf30fef14ac44aad92c135f6fc8adfbe_10.geojson').then(function(r){
        rerrr = r;
        BaltoCity = new geoJSON;
        var markers = L.markerClusterGroup();
        for(var i=0;i<r.features.length; i++){
            if(r.features[i].properties.County == 'Baltimore City'){
                BaltoCity.features.push(r.features[i])
            }
        }
        L.geoJSON(BaltoCity).addTo(map);
    });
})
/* Main JavaScript sheet for Exploring ACS data by Michael Vetter */

//Set up the initial location of the map
var initialLocation = [29.756, -95.444];

//Set up the initial zoom of the map
var initialZoom = 9;

//Create the map
var map = L.map("map",{zoomControl: false}).setView(initialLocation, initialZoom);

//Add the home button with the zoom in and zoom out buttons
var zoomHome = L.Control.zoomHome();
zoomHome.addTo(map);

//Get the data for the map
// getData(map);

//Add ESRI base tilelayer
var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

//Add CartoDB base tilelayer
var cartoDB_Positron = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.jpg", {
    attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> &copy; <a href='http://cartodb.com/attributions'>CartoDB</a>",
    subdomains: "abc"
}).addTo(map);

//Create the base maps
var baseMapLayers = {
    "Grayscale": cartoDB_Positron,
    "Imagery": esri
};

var infoPopupCenter = [29.556, -95.44];

//Create an info button to help the user
var infoPopup = L.popup({className: "help"}).setContent("<h2 class='popupTitle'>Application Help</h2><p class='popup'>Select the boundary layer you want to work with by clicking on the particular button on the left</p>" +
"<p class='popup'>Click the checkboxes for the attributes you want to display. You can only select up to 7 at a time not including Total Population over Time.</p>" +
"<p class='popup'>After clicking on a boundary, pie charts will display at the bottom corresponding to the attributes that you selected.");

//Create an info button so that the user can get information about the application
L.easyButton("<span class='fas fa-info fa-lg'</span>", (btn, map) =>{
    map.setView(initialLocation, initialZoom);
    infoPopup.setLatLng(infoPopupCenter).openOn(map);
}).addTo(map);

//Empty "shells" for the geoJson features
var counties = L.geoJson();
var blockGroups = L.geoJson();
var isd = L.geoJson();
var censusPlaces = L.geoJson();
var tracts = L.geoJson();
var zipCodes = L.geoJson();
var vulnerable = L.geoJson();

//Create a highlight so the user knows which polygon they picked
var highlight = {
    "color": "yellow",
    "weight": 2,
    "opacity": 1
};

var dehighlight = {
    "color": "#000",
    "weight": 1,
    "fill": true,
    "fillColor": "#fff",
    "fillOpacity": 0.1
};

var esriBlockGroups = L.esri.featureLayer({
    url: "https://gis.h-gac.com/arcgis/rest/services/Census_ACS/Census_ACS_5Yr_Block_Groups/MapServer/0",
    style: function(response){
        return {color: "#000", weight: 1, fill: true, fillColor: "#fff", fillOpacity: 0.1}
    },
    onEachFeature: function (feature, layer){
        layer.bindPopup("<p>" +feature.properties.Block_Group+"<p>");
        layer.on("click", e =>{
            lineTime(feature);
            var checkNum = $("input[name='chart']:checked").length;
            console.log(checkNum);
            if (checkNum > 7){
                alert("Please choose less attributes to display.");
            } else{
                if ($(".footer").is(":empty")){
                    racePop(feature);
                    agePop(feature);
                    carOwnership(feature);
                    education(feature);
                    langSpoken(feature);
                    hhIncomes(feature);
                    povAboveBelow(feature);
                    travelMode(feature);
                    timeWork(feature);
                    // lineTime(feature);
                } else{
                    // lineTime(feature);
                    $(".footer").html("");
                    racePop(feature);
                    agePop(feature);
                    carOwnership(feature);
                    education(feature);
                    langSpoken(feature);
                    hhIncomes(feature);
                    povAboveBelow(feature);
                    travelMode(feature);
                    timeWork(feature);
                }
            }
        });
        layer.on("mouseover", e =>{
            layer.setStyle(highlight);
        });
        layer.on("mouseout", e =>{
            layer.setStyle(dehighlight);
        });
    }
});

var esriCounties = L.esri.featureLayer({
    url: "https://gis.h-gac.com/arcgis/rest/services/Census_ACS/Census_ACS_5Yr_Counties/MapServer/0",
    style: response => {
        return {color: "#000", weight: 1, fill: true, fillColor: "#fff", fillOpacity: 0.1}
    },
    onEachFeature: (feature, layer) =>{
        layer.bindPopup("<p>" + feature.properties.Name+"<p>");
        layer.on("click", e =>{
            lineTime(feature);
            var checkNum = $("input[name='chart']:checked").length;
            console.log(checkNum);
            if (checkNum > 7){
                alert("Please choose less attributes to display.");
            } else{
                if ($(".footer").is(":empty")){
                    racePop(feature);
                    agePop(feature);
                    carOwnership(feature);
                    education(feature);
                    langSpoken(feature);
                    hhIncomes(feature);
                    povAboveBelow(feature);
                    travelMode(feature);
                    timeWork(feature);
                    // lineTime(feature);
                } else{
                    // lineTime(feature);
                    $(".footer").html("");
                    racePop(feature);
                    agePop(feature);
                    carOwnership(feature);
                    education(feature);
                    langSpoken(feature);
                    hhIncomes(feature);
                    povAboveBelow(feature);
                    travelMode(feature);
                    timeWork(feature);
                }
            }
        });
        layer.on("mouseover", e =>{
            layer.setStyle(highlight);
        });
        layer.on("mouseout", e =>{
            layer.setStyle(dehighlight);
        });
    }
}).addTo(map);

var esriISD = L.esri.featureLayer({
    url: "https://gis.h-gac.com/arcgis/rest/services/Census_ACS/Census_ACS_5Yr_ISDs/MapServer/0",
    style: response =>{
        return {color: "#000", weight: 1, fill: true, fillColor: "#fff", fillOpacity: 0.1}
    },
    onEachFeature: (feature, layer) =>{
        layer.bindPopup("<p>" +feature.properties.NAME + "<p>");
        layer.on("click", e =>{
            lineTime(feature);
            var checkNum = $("input[name='chart']:checked").length;
            console.log(checkNum);
            if (checkNum > 7){
                alert("Please choose less attributes to display.");
            } else{
                if ($(".footer").is(":empty")){
                    racePop(feature);
                    agePop(feature);
                    carOwnership(feature);
                    education(feature);
                    langSpoken(feature);
                    hhIncomes(feature);
                    povAboveBelow(feature);
                    travelMode(feature);
                    timeWork(feature);
                    // lineTime(feature);
                } else{
                    // lineTime(feature);
                    $(".footer").html("");
                    racePop(feature);
                    agePop(feature);
                    carOwnership(feature);
                    education(feature);
                    langSpoken(feature);
                    hhIncomes(feature);
                    povAboveBelow(feature);
                    travelMode(feature);
                    timeWork(feature);
                }
            }
        });
        layer.on("mouseover", e =>{
            layer.setStyle(highlight);
        });
        layer.on("mouseout", e =>{
            layer.setStyle(dehighlight);
        });
    }
});

var esriPlaces = L.esri.featureLayer({
    url: "https://gis.h-gac.com/arcgis/rest/services/Census_ACS/Census_ACS_5Yr_Places/MapServer/0",
    style: response =>{
        return {color: "#000", weight: 1, fill: true, fillColor: "#fff", fillOpacity: 0.1}
    },
    onEachFeature: (feature, layer) =>{
        layer.bindPopup("<p>" +feature.properties.Name + "<p>");
        layer.on("click", e =>{
            lineTime(feature);
            var checkNum = $("input[name='chart']:checked").length;
            console.log(checkNum);
            if (checkNum > 7){
                alert("Please choose less attributes to display.");
            } else{
                if ($(".footer").is(":empty")){
                    racePop(feature);
                    agePop(feature);
                    carOwnership(feature);
                    education(feature);
                    langSpoken(feature);
                    hhIncomes(feature);
                    povAboveBelow(feature);
                    travelMode(feature);
                    timeWork(feature);
                    // lineTime(feature);
                } else{
                    // lineTime(feature);
                    $(".footer").html("");
                    racePop(feature);
                    agePop(feature);
                    carOwnership(feature);
                    education(feature);
                    langSpoken(feature);
                    hhIncomes(feature);
                    povAboveBelow(feature);
                    travelMode(feature);
                    timeWork(feature);
                }
            }
        });
        layer.on("mouseover", e =>{
            layer.setStyle(highlight);
        });
        layer.on("mouseout", e =>{
            layer.setStyle(dehighlight);
        });
    }
});

var esriZip = L.esri.featureLayer({
    url: "https://gis.h-gac.com/arcgis/rest/services/Census_ACS/Census_ACS_5Yr_Zip_Codes/MapServer/0",
    style: response =>{
        return {color: "#000", weight: 1, fill: true, fillColor: "#fff", fillOpacity: 0.1}
    },
    onEachFeature: (feature, layer) =>{
        layer.bindPopup("<p>" +feature.properties.Zip_Code + "<p>");
        layer.on("click", e =>{
            lineTime(feature);
            var checkNum = $("input[name='chart']:checked").length;
            console.log(checkNum);
            if (checkNum > 7){
                alert("Please choose less attributes to display.");
            } else{
                if ($(".footer").is(":empty")){
                    racePop(feature);
                    agePop(feature);
                    carOwnership(feature);
                    education(feature);
                    langSpoken(feature);
                    hhIncomes(feature);
                    povAboveBelow(feature);
                    travelMode(feature);
                    timeWork(feature);
                    // lineTime(feature);
                } else{
                    // lineTime(feature);
                    $(".footer").html("");
                    racePop(feature);
                    agePop(feature);
                    carOwnership(feature);
                    education(feature);
                    langSpoken(feature);
                    hhIncomes(feature);
                    povAboveBelow(feature);
                    travelMode(feature);
                    timeWork(feature);
                }
            }
        });
        layer.on("mouseover", e =>{
            layer.setStyle(highlight);
        });
        layer.on("mouseout", e =>{
            layer.setStyle(dehighlight);
        });
    }
});

var esriTracts = L.esri.featureLayer({
    url: "https://gis.h-gac.com/arcgis/rest/services/Census_ACS/Census_ACS_5Yr_Tracts/MapServer/0",
    style: response =>{
        return {color: "#000", weight: 1, fill: true, fillColor: "#fff", fillOpacity: 0.1}
    },
    onEachFeature: (feature, layer) =>{
        layer.bindPopup("<p>" +feature.properties.Tract + "<p>");
        layer.on("click", e =>{
            lineTime(feature);
            var checkNum = $("input[name='chart']:checked").length;
            console.log(checkNum);
            if (checkNum > 7){
                alert("Please choose less attributes to display.");
            } else{
                if ($(".footer").is(":empty")){
                    racePop(feature);
                    agePop(feature);
                    carOwnership(feature);
                    education(feature);
                    langSpoken(feature);
                    hhIncomes(feature);
                    povAboveBelow(feature);
                    travelMode(feature);
                    timeWork(feature);
                    // lineTime(feature);
                } else{
                    // lineTime(feature);
                    $(".footer").html("");
                    racePop(feature);
                    agePop(feature);
                    carOwnership(feature);
                    education(feature);
                    langSpoken(feature);
                    hhIncomes(feature);
                    povAboveBelow(feature);
                    travelMode(feature);
                    timeWork(feature);
                }
            }
        });
        layer.on("mouseover", e =>{
            layer.setStyle(highlight);
        });
        layer.on("mouseout", e =>{
            layer.setStyle(dehighlight);
        });
    }
});

var esriVulnerable = L.esri.featureLayer({
    url: "https://gis.h-gac.com/arcgis/rest/services/Census_ACS/Census_BGs_Vulnerable_Population/MapServer/0",
    style: response =>{
        return {color: "#000", weight: 1, fill: true, fillColor: "#fff", fillOpacity: 0.1}
    },
    onEachFeature: (feature, layer) =>{
        layer.bindPopup("<p>" +feature.properties.Block_Group + "<p>");
        layer.on("click", e =>{
            lineTime(feature);
            var checkNum = $("input[name='chart']:checked").length;
            console.log(checkNum);
            if (checkNum > 7){
                alert("Please choose less attributes to display.");
            } else{
                if ($(".footer").is(":empty")){
                    racePop(feature);
                    agePop(feature);
                    carOwnership(feature);
                    education(feature);
                    langSpoken(feature);
                    hhIncomes(feature);
                    povAboveBelow(feature);
                    travelMode(feature);
                    timeWork(feature);
                    // lineTime(feature);
                } else{
                    // lineTime(feature);
                    $(".footer").html("");
                    racePop(feature);
                    agePop(feature);
                    carOwnership(feature);
                    education(feature);
                    langSpoken(feature);
                    hhIncomes(feature);
                    povAboveBelow(feature);
                    travelMode(feature);
                    timeWork(feature);
                }
            }
        });
        layer.on("mouseover", e =>{
            layer.setStyle(highlight);
        });
        layer.on("mouseout", e =>{
            layer.setStyle(dehighlight);
        });
    }
});

//Use AJAX to load the data
function getData(map){
    //load the data
    $.ajax("data/counties.geojson",{
        dataType: "json",
        success: function(response){
            L.geoJson(response, {
                style: function(feature){
                    return {color: "#000", weight: 1, fill: true, fillColor: "#fff", fillOpacity: 0.1}
                },
                onEachFeature: function(feature, layer){
                    layer.bindPopup("<p style='font-size: 20px;font-family:Crimson Text;'><b>County Name: </b>" +feature.properties.Name+ "</p>");
                    layer.on("click", function(e){
                        lineTime(feature);
                        var checkNum = $("input[name='chart']:checked").length;
                        console.log(checkNum);
                        if (checkNum > 7){
                            alert("Please choose less attributes to display.");
                        } else{
                            if ($(".footer").is(":empty")){
                                racePop(feature);
                                agePop(feature);
                                carOwnership(feature);
                                education(feature);
                                langSpoken(feature);
                                hhIncomes(feature);
                                povAboveBelow(feature);
                                travelMode(feature);
                                timeWork(feature);
                                // lineTime(feature);
                            } else{
                                // lineTime(feature);
                                $(".footer").html("");
                                racePop(feature);
                                agePop(feature);
                                carOwnership(feature);
                                education(feature);
                                langSpoken(feature);
                                hhIncomes(feature);
                                povAboveBelow(feature);
                                travelMode(feature);
                                timeWork(feature);
                            }
                        }
                        
                    });
                    layer.on("mouseover", e =>{
                        layer.setStyle(highlight);
                    });
                    layer.on("mouseout", e =>{
                        layer.setStyle(dehighlight);
                    });
                }
            }).addTo(counties);
        }
    });
    $.ajax("data/blockGroups.geojson",{
        dataType: "json",
        success: function(response){
            var selected;
            L.geoJson(response, {
                style: function(feature){
                    return {color: "#000", weight: 1, fill: true, fillColor: "#fff", fillOpacity: 0.1}
                },
                onEachFeature: function(feature, layer){
                    layer.bindPopup("<p style='font-size: 20px;font-family:Crimson Text;'><b>Block Group: </b>" +feature.properties.Block_Group+ "</p>");
                    layer.on("click", e =>{
                        lineTime(feature);
                        var checkNum = $("input[name='chart']:checked").length;
                        console.log(checkNum);
                        if (checkNum > 7){
                            alert("Please select less attributes.");
                        } else{
                            if ($(".footer").is(":empty")){
                                racePop(feature);
                                agePop(feature);
                                carOwnership(feature);
                                education(feature);
                                langSpoken(feature);
                                hhIncomes(feature);
                                povAboveBelow(feature);
                                travelMode(feature);
                                timeWork(feature);
                            } else{
                                $(".footer").html("");
                                racePop(feature);
                                agePop(feature);
                                carOwnership(feature);
                                education(feature);
                                langSpoken(feature);
                                hhIncomes(feature);
                                povAboveBelow(feature);
                                travelMode(feature);
                                timeWork(feature);
                            }
                        }
                    });
                    layer.on("mouseover", e =>{
                        layer.setStyle(highlight);
                    });
                    layer.on("mouseout", e =>{
                        layer.setStyle(dehighlight);
                    });
                }
            }).addTo(blockGroups);
        }
    });
    $.ajax("data/isd.geojson",{
        dataType: "json",
        success: function(response){
            L.geoJson(response, {
                style: function(feature){
                    return {color: "#000", weight: 1, fill: true, fillColor:"#fff", fillOpacity: 0.1}
                },
                onEachFeature: function(feature, layer){
                    layer.bindPopup("<p style='font-size: 20px;font-family:Crimson Text;'><b>ISD Name: </b>" +feature.properties.NAME+ "</p>");
                    layer.on("click", e =>{
                        lineTime(feature);
                        var checkNum = $("input[name='chart']:checked").length;
                        console.log(checkNum);
                        if (checkNum > 7){
                            alert("Please select less attributes.");
                        } else{
                            if ($(".footer").is(":empty")){
                                racePop(feature);
                                agePop(feature);
                                carOwnership(feature);
                                education(feature);
                                langSpoken(feature);
                                hhIncomes(feature);
                                povAboveBelow(feature);
                                travelMode(feature);
                                timeWork(feature);
                            } else{
                                $(".footer").html("");
                                racePop(feature);
                                agePop(feature);
                                carOwnership(feature);
                                education(feature);
                                langSpoken(feature);
                                hhIncomes(feature);
                                povAboveBelow(feature);
                                travelMode(feature);
                                timeWork(feature);
                            }
                        }
                    });
                    layer.on("mouseover", e =>{
                        layer.setStyle(highlight);
                    });
                    layer.on("mouseout", e =>{
                        layer.setStyle(dehighlight);
                    });
                }
            }).addTo(isd);
        }
    });
    $.ajax("data/places.geojson",{
        dataType: "json",
        success: function(response){
            L.geoJson(response, {
                style: function(feature){
                    return {color: "#000", weight: 1, fill: true, fillColor:"#fff", fillOpacity:0.1}
                },
                onEachFeature: function(feature, layer){
                    layer.bindPopup("<p style='font-size: 20px;font-family:Crimson Text;'><b>Name: </b>" +feature.properties.Name+ "</p>");
                    layer.on("click", e =>{
                        lineTime(feature);
                        var checkNum = $("input[name='chart']:checked").length;
                        console.log(checkNum);
                        if (checkNum > 7){
                            alert("Please select less attributes.");
                        } else{
                            if ($(".footer").is(":empty")){
                                racePop(feature);
                                agePop(feature);
                                carOwnership(feature);
                                education(feature);
                                langSpoken(feature);
                                hhIncomes(feature);
                                povAboveBelow(feature);
                                travelMode(feature);
                                timeWork(feature);
                            } else{
                                $(".footer").html("");
                                racePop(feature);
                                agePop(feature);
                                carOwnership(feature);
                                education(feature);
                                langSpoken(feature);
                                hhIncomes(feature);
                                povAboveBelow(feature);
                                travelMode(feature);
                                timeWork(feature);
                            }
                        }
                    });
                    layer.on("mouseover", e =>{
                        layer.setStyle(highlight);
                    });
                    layer.on("mouseout", e =>{
                        layer.setStyle(dehighlight);
                    });
                }
            }).addTo(censusPlaces);
        }
    });
    $.ajax("data/tracts.geojson",{
        dataType: "json",
        success: function(response){
            L.geoJson(response, {
                style: function(feature){
                    return {color: "#000", weight: 1, fill: true, fillColor:"#fff", fillOpacity: 0.1}
                },
                onEachFeature: function(feature, layer){
                    layer.bindPopup("<p style='font-size: 20px;font-family:Crimson Text;'><b>Census Tract: </b>" +feature.properties.Tract+ "</p>");
                    layer.on("click", e =>{
                        lineTime(feature);
                        var checkNum = $("input[name='chart']:checked").length;
                        console.log(checkNum);
                        if (checkNum > 7){
                            alert("Please select less attributes.");
                        } else{
                            if ($(".footer").is(":empty")){
                                racePop(feature);
                                agePop(feature);
                                carOwnership(feature);
                                education(feature);
                                langSpoken(feature);
                                hhIncomes(feature);
                                povAboveBelow(feature);
                                travelMode(feature);
                                timeWork(feature);
                            } else{
                                $(".footer").html("");
                                racePop(feature);
                                agePop(feature);
                                carOwnership(feature);
                                education(feature);
                                langSpoken(feature);
                                hhIncomes(feature);
                                povAboveBelow(feature);
                                travelMode(feature);
                                timeWork(feature);
                            }
                        }
                    });
                    layer.on("mouseover", e =>{
                        layer.setStyle(highlight);
                    });
                    layer.on("mouseout", e =>{
                        layer.setStyle(dehighlight);
                    });
                }
            }).addTo(tracts);
        }
    });
    $.ajax("data/vulnerablePop.geojson",{
        dataType: "json",
        success: function(response){
            L.geoJson(response, {
                style: function(feature){
                    return {color: "#000", weight: 1, fill: true, fillColor:"#fff", fillOpacity: 0.1}
                },
                onEachFeature: function(feature, layer){
                    layer.bindPopup("<p style='font-size: 20px;font-family:Crimson Text;'><b>Block Group: </b>" +feature.properties.Block_Group+ "</p>");
                    layer.on("click", e =>{
                        lineTime(feature);
                        var checkNum = $("input[name='chart']:checked").length;
                        console.log(checkNum);
                        if (checkNum > 7){
                            alert("Please select less attributes.");
                        } else{
                            if ($(".footer").is(":empty")){
                                racePop(feature);
                                agePop(feature);
                                carOwnership(feature);
                                education(feature);
                                langSpoken(feature);
                                hhIncomes(feature);
                                povAboveBelow(feature);
                                travelMode(feature);
                                timeWork(feature);
                            } else{
                                $(".footer").html("");
                                racePop(feature);
                                agePop(feature);
                                carOwnership(feature);
                                education(feature);
                                langSpoken(feature);
                                hhIncomes(feature);
                                povAboveBelow(feature);
                                travelMode(feature);
                                timeWork(feature);
                            }
                        }
                    });
                    layer.on("mouseover", e =>{
                        layer.setStyle(highlight);
                    });
                    layer.on("mouseout", e =>{
                        layer.setStyle(dehighlight);
                    });
                }
            }).addTo(vulnerable);
        }
    });
    $.ajax("data/zip.geojson",{
        dataType: "json",
        success: function(response){
            L.geoJson(response, {
                style: function(feature){
                    return {color: "#000", weight: 1, fill: true, fillColor:"#fff", fillOpacity: 0.1}
                },
                onEachFeature: function(feature, layer){
                    layer.bindPopup("<p style='font-size: 20px;font-family:Crimson Text;'><b>Zip Code: </b>" +feature.properties.Zip_Code+ "</p>");
                    layer.on("click", e =>{
                        lineTime(feature);
                        var checkNum = $("input[name='chart']:checked").length;
                        console.log(checkNum);
                        if (checkNum > 7){
                            alert("Please select less attributes.");
                        } else{
                            if ($(".footer").is(":empty")){
                                racePop(feature);
                                agePop(feature);
                                carOwnership(feature);
                                education(feature);
                                langSpoken(feature);
                                hhIncomes(feature);
                                povAboveBelow(feature);
                                travelMode(feature);
                                timeWork(feature);
                            } else{
                                $(".footer").html("");
                                racePop(feature);
                                agePop(feature);
                                carOwnership(feature);
                                education(feature);
                                langSpoken(feature);
                                hhIncomes(feature);
                                povAboveBelow(feature);
                                travelMode(feature);
                                timeWork(feature);
                            }
                        }
                    });
                    layer.on("mouseover", e =>{
                        layer.setStyle(highlight);
                    });
                    layer.on("mouseout", e =>{
                        layer.setStyle(dehighlight);
                    });
                }
            }).addTo(zipCodes);
        }
    });
};

//Create a baseLayers group
var baseLayers = {
    "Census Counties": counties,
    "Census Block Groups": blockGroups,
    "ISDs": isd,
    "Census Places": censusPlaces,
    "Census Tracts": tracts,
    "Vulernable Population": vulnerable,
    "Zip Codes": zipCodes
};

//Add the base layers to the map so the user can control what is on
L.control.layers(baseMapLayers).addTo(map);

//Create a search widget
// var searchControl = new L.Control.Search({
//     layer: counties,
//     propertyName: "Name",
//     zoom: 11,
//     textErr: "County does not exist",
//     textPlaceholder: "Search for a County",
//     marker: false,
//     animate: false
// });
// searchControl.on("search:locationfound", function(e){
//     e.layer.setStyle({fillColor: "#00ffff", color: "#00ffff", fillOpacity: 0.5});
//     if (e.layer._popup){
//         e.layer.openPopup();
//     }
// });
// searchControl.on("search:collapsed", function(e){
//     counties.setStyle({fillColor: "#fff", fillOpacity: 0.1, color: "#000", weight: 1, fill:true});
// });
// map.addControl(searchControl);

var searchCounties = L.esri.Geocoding.geosearch({
    providers: [L.esri.Geocoding.mapServiceProvider({
        url: "https://gis.h-gac.com/arcgis/rest/services/Census_ACS/Census_ACS_5Yr_Counties/MapServer",
        layers: [0],
        searchFields: ['Name']
    })],
    placeholder: "Search for counties"
}).addTo(map);

var searchBlockGroups = L.esri.Geocoding.geosearch({
    placeholder: "Search for Block Groups",
    providers: [L.esri.Geocoding.mapServiceProvider({
        url: "https://gis.h-gac.com/arcgis/rest/services/Census_ACS/Census_ACS_5Yr_Block_Groups/MapServer",
        layers: [0],
        searchFields: ["Block_Group"]
    })]
});

var searchISD = L.esri.Geocoding.geosearch({
    placeholder: "Search for ISDs",
    providers: [L.esri.Geocoding.mapServiceProvider({
        url: "https://gis.h-gac.com/arcgis/rest/services/Census_ACS/Census_ACS_5Yr_ISDs/MapServer",
        layers: [0],
        searchFields: ["NAME"]
    })]
});

var searchTracts = L.esri.Geocoding.geosearch({
    placeholder: "Search for Census Tracts",
    providers: [L.esri.Geocoding.mapServiceProvider({
        url: "https://gis.h-gac.com/arcgis/rest/services/Census_ACS/Census_ACS_5Yr_Tracts/MapServer",
        layers: [0],
        searchFields: ["Tract"]
    })]
});

var searchPlaces = L.esri.Geocoding.geosearch({
    placeholder: "Search for Census Designated Places",
    providers: [L.esri.Geocoding.mapServiceProvider({
        url: "https://gis.h-gac.com/arcgis/rest/services/Census_ACS/Census_ACS_5Yr_Places/MapServer",
        layers: [0],
        searchFields: ["Name"]
    })]
});

var searchZip = L.esri.Geocoding.geosearch({
    placeholder: "Search for Zip Codes",
    providers: [L.esri.Geocoding.mapServiceProvider({
        url: "https://gis.h-gac.com/arcgis/rest/services/Census_ACS/Census_ACS_5Yr_Zip_Codes/MapServer",
        layers: [0],
        searchFields: ["Zip_Code"]
    })]
});

var searchVulnerable = L.esri.Geocoding.geosearch({
    placeholder: "Search for Vulnerable Population",
    providers: [L.esri.Geocoding.mapServiceProvider({
        url: "https://gis.h-gac.com/arcgis/rest/services/Census_ACS/Census_BGs_Vulnerable_Population/MapServer",
        layers: [0],
        searchFields: ["Block_Group"]
    })]
});

// $(".search-cancel").on("click", () => {
//     counties.setStyle({fillColor: "#fff", fillOpacity: 0.1, color: "#000", weight: 1, fill:true});
// });

// $(".leaflet-popup-close-button").on("click", () =>{
//     counties.setStyle({fillColor: "#fff", fillOpacity: 0.1, color: "#000", weight: 1, fill: true});
// });

//Adding functionality to the buttons
//Function to remove the layers
function removeMapLayers(){
    if (map.hasLayer(esriCounties) !== true){
        map.removeLayer(esriBlockGroups);
        map.removeLayer(esriISD);
        map.removeLayer(esriPlaces);
        map.removeLayer(esriTracts);
        map.removeLayer(esriVulnerable);
        map.removeLayer(esriZip);
    } else if (map.hasLayer(esriBlockGroups) !== true){
        map.removeLayer(esriCounties);
        map.removeLayer(esriISD);
        map.removeLayer(esriPlaces);
        map.removeLayer(esriTracts);
        map.removeLayer(esriVulnerable);
        map.removeLayer(esriZip);
    } else if (map.hasLayer(esriISD) !== true){
        map.removeLayer(esriCounties);
        map.removeLayer(esriBlockGroups);
        map.removeLayer(esriPlaces);
        map.removeLayer(esriTracts);
        map.removeLayer(esriVulnerable);
        map.removeLayer(esriZip);
    } else if (map.hasLayer(esriPlaces) !== true){
        map.removeLayer(esriCounties);
        map.removeLayer(esriBlockGroups);
        map.removeLayer(esriISD);
        map.removeLayer(esriTracts);
        map.removeLayer(esriVulnerable);
        map.removeLayer(esriZip);
    } else if (map.hasLayer(esriTracts) !== true){
        map.removeLayer(esriCounties);
        map.removeLayer(esriBlockGroups);
        map.removeLayer(esriPlaces);
        map.removeLayer(esriISD);
        map.removeLayer(esriVulnerable);
        map.removeLayer(esriZip);
    } else if (map.hasLayer(esriVulnerable) !== true){
        map.removeLayer(esriCounties);
        map.removeLayer(esriBlockGroups);
        map.removeLayer(esriPlaces);
        map.removeLayer(esriTracts);
        map.removeLayer(esriISD);
        map.removeLayer(esriZip);
    } else if (map.hasLayer(esriZip) !== true){
        map.removeLayer(esriCounties);
        map.removeLayer(esriBlockGroups);
        map.removeLayer(esriPlaces);
        map.removeLayer(esriTracts);
        map.removeLayer(esriVulnerable);
        map.removeLayer(esriISD);
    }
};

$(".btn-counties").on("click", () =>{
    removeMapLayers();
    $(".footer").html("");
    map.addLayer(esriCounties);
});
$(".btn-blocks").on("click", () =>{
    removeMapLayers();
    $(".footer").html("");
    map.addLayer(esriBlockGroups);
    map.removeControl(searchCounties);
    map.removeControl(searchISD);
    map.removeControl(searchPlaces);
    map.removeControl(searchTracts);
    map.removeControl(searchVulnerable);
    map.removeControl(searchZip);
    searchBlockGroups.addTo(map);
});
$(".btn-isds").on("click", () =>{
    removeMapLayers();
    $(".footer").html("");
    map.addLayer(esriISD);
    map.removeControl(searchCounties);
    map.removeControl(searchBlockGroups);
    map.removeControl(searchPlaces);
    map.removeControl(searchTracts);
    map.removeControl(searchVulnerable);
    map.removeControl(searchZip);
    searchISD.addTo(map);
});
$(".btn-places").on("click", () =>{
    removeMapLayers();
    $(".footer").html("");
    map.addLayer(esriPlaces);
    map.removeControl(searchCounties);
    map.removeControl(searchISD);
    map.removeControl(searchBlockGroups);
    map.removeControl(searchTracts);
    map.removeControl(searchVulnerable);
    map.removeControl(searchZip);
    searchPlaces.addTo(map);
});
$(".btn-tracts").on("click", () =>{
    removeMapLayers();
    $(".footer").html("");
    map.addLayer(esriTracts);
    map.removeControl(searchCounties);
    map.removeControl(searchISD);
    map.removeControl(searchPlaces);
    map.removeControl(searchBlockGroups);
    map.removeControl(searchVulnerable);
    map.removeControl(searchZip);
    searchTracts.addTo(map);
});
$(".btn-vulnerable").on("click", () =>{
    removeMapLayers();
    $(".footer").html("");
    map.addLayer(esriVulnerable);
    map.removeControl(searchCounties);
    map.removeControl(searchISD);
    map.removeControl(searchPlaces);
    map.removeControl(searchTracts);
    map.removeControl(searchBlockGroups);
    map.removeControl(searchZip);
    searchVulnerable.addTo(map);
});
$(".btn-zip").on("click", () =>{
    removeMapLayers();
    $(".footer").html("");
    map.addLayer(esriZip);
    map.removeControl(searchCounties);
    map.removeControl(searchISD);
    map.removeControl(searchPlaces);
    map.removeControl(searchTracts);
    map.removeControl(searchVulnerable);
    map.removeControl(searchBlockGroups);
    searchZip.addTo(map);
});

//Function for the pie chart for population by race
function racePop(feature){
    var w = 250, h = 250, r = 100, color = d3.scaleOrdinal().range(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854"]);
    var smallW = 600;

    //Calculate the percentages of the population
    var whitePercent = ((feature.properties.Pop_White / feature.properties.Pop_Total) * 100).toFixed(0);
    var blackPercent = ((feature.properties.Pop_Black / feature.properties.Pop_Total) * 100).toFixed(0);
    var hispanicPercent = ((feature.properties.Pop_Hispanic / feature.properties.Pop_Total) * 100).toFixed(0);
    var AsianPercent = ((feature.properties.Pop_Asian / feature.properties.Pop_Total) * 100).toFixed(0);
    var otherPercent = ((feature.properties.Pop_Other / feature.properties.Pop_Total) * 100).toFixed(0);

    //Get the data with the new percentages
    var data = [
        {name:"White Population", value:whitePercent, id:"first"},
        {name:"Black Population", value:blackPercent, id:"second"},
        {name:"Hispanic Population", value:hispanicPercent, id:"third"},
        {name:"Asian Population", value:AsianPercent, id:"fourth"},
        {name:"Other Population", value: otherPercent, id:"fifth"}
    ];

    if ($(window).width() > 979){
        //Create the pie chart
        var svg = d3.select(".footer")
        .append("svg")
        .attr("class", "race")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

        var arc = d3.arc().outerRadius(r).innerRadius(0);
        var pie = d3.pie().value(function(d){return d.value;});

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("class", d =>{return "arcs " +d.data.id})
            .attr("d", arc)
            .style("fill", function(d){return color(d.value);})
            .on("mouseover", function(d){
                highlightPie(d);
                $("#chart-tooltip").html(`<div class="leaflet-tooltip"><p>${d.data.name}</p><p>${d.value} %</p>`)
                    .css("visibility", "visible")
                    .css("top", (d3.event.pageY - 30) + "px")
                    .css("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", function(d){
                dehighlightPie(d);
                $("#chart-tooltip").css("visibility", "hidden");
            });
        var desc = g.append("desc")
            .text('{"stroke": "none", "stroke-width": "0px"}');
        var title = svg.append("text")
            .attr("class", "title")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", 115)
            .text("Population By Race");

        //Check to see if the user wants to view the attribute
        if ($("#race").is(":checked")){
            return;
        } else{
            $(".race").hide();
        }
    } else{
        $(".race").remove();
        //Create the pie chart
        var svg = d3.select("#panel")
        .append("svg")
        .attr("class", "race")
        .attr("width", smallW)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + (smallW/2) + "," + (h/2) + ")");

        var arc = d3.arc().outerRadius(r).innerRadius(0);
        var pie = d3.pie().value(function(d){return d.value;});

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("d", arc)
            .style("fill", function(d){return color(d.value);})
            .on("mouseover", function(d){
                $("#chart-tooltip").html(`<div class="leaflet-tooltip"><p>${d.data.name}</p><p>${d.value} %</p>`)
                    .css("visibility", "visible")
                    .css("top", (d3.event.pageY - 30) + "px")
                    .css("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", function(d){
                $("#chart-tooltip").css("visibility", "hidden");
            });
        var title = svg.append("text")
            .attr("class", "title")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", 115)
            .text("Population By Race");

        //Check to see if the user wants to view the attribute
        if ($("#race").is(":checked")){
            return;
        } else{
            $(".race").hide();
        }
    }
    
};

//Function for the pie chart for population age
function agePop(feature){
    var w = 250, h = 250, r = 100, color = d3.scaleOrdinal().range(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854"]);
    var smallW = 600;

    //Calculate the percentages of the population
    var under5 = ((feature.properties.Age_Under_5 / feature.properties.Pop_Total) * 100).toFixed(0);
    var teenage = ((feature.properties.Age_5to17 / feature.properties.Pop_Total) * 100).toFixed(0);
    var youngAdult = ((feature.properties.Age_18to34 / feature.properties.Pop_Total) * 100).toFixed(0);
    var adult = ((feature.properties.Age_35to64 / feature.properties.Pop_Total) * 100).toFixed(0);
    var geezer = ((feature.properties.Age_65plus / feature.properties.Pop_Total) * 100).toFixed(0);

    //Get the data with the new percentages
    var data = [
        {name:"Under 5", value:under5, id:"ageFirst"},
        {name:"5 to 17", value:teenage, id:"ageSecond"},
        {name:"18 to 34", value:youngAdult, id:"ageThird"},
        {name:"35 to 64", value:adult, id:"ageFourth"},
        {name:"65 & Older", value:geezer, id:"ageFifth"}
    ];

    if ($(window).width() > 979){
        var svg = d3.select(".footer")
        .append("svg")
        .attr("class", "age")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

        var arc = d3.arc().outerRadius(r).innerRadius(0);
        var pie = d3.pie().value(d => {return d.value;});

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("class", d =>{return "arcs " +d.data.id})
            .attr("d", arc)
            .style("fill", d => {return color(d.value);})
            .on("mouseover", d =>{
                highlightPie(d);
                $("#chart-tooltip").html(`<div class="leaflet-tooltip"><p>${d.data.name}</p><p>${d.value} %</p>`)
                    .css("visibility", "visible")
                    .css("top", (d3.event.pageY - 30) + "px")
                    .css("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", d =>{
                dehighlightPie(d);
                $("#chart-tooltip").css("visibility", "hidden");
            });
        var title = svg.append("text")
            .attr("class","title")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", 115)
            .text("Population by Age");

        if ($("#age").is(":checked")){
            return;
        } else{
            $(".age").hide();
        }
    } else {
        $(".age").remove();
        var svg = d3.select("#panel")
        .append("svg")
        .attr("class", "age")
        .attr("width", smallW)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + (smallW/2) + "," + (h/2) + ")");

        var arc = d3.arc().outerRadius(r).innerRadius(0);
        var pie = d3.pie().value(d => {return d.value;});

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("d", arc)
            .style("fill", d => {return color(d.value);})
            .on("mouseover", d =>{
                $("#chart-tooltip").html(`<div class="leaflet-tooltip"><p>${d.data.name}</p><p>${d.value} %</p>`)
                    .css("visibility", "visible")
                    .css("top", (d3.event.pageY - 30) + "px")
                    .css("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", d =>{
                $("#chart-tooltip").css("visibility", "hidden");
            });
        var title = svg.append("text")
            .attr("class","title")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", 115)
            .text("Population by Age");

        if ($("#age").is(":checked")){
            return;
        } else{
            $(".age").hide();
        }
    }
    
};

//Function for the pie chart for car ownership
function carOwnership(feature){
    var w = 250, h = 250, r = 100, color = d3.scaleOrdinal().range(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854"]);
    var smallW = 600;

    //Calculate the percentages of the population
    var noCars = ((feature.properties.Auto_0_Car / feature.properties.HH_Total) * 100).toFixed(0);
    var car1 = ((feature.properties.Auto_1_Car / feature.properties.HH_Total) * 100).toFixed(0);
    var car2 = ((feature.properties.Auto_2_Car / feature.properties.HH_Total) * 100).toFixed(0);
    var car3 = ((feature.properties.Auto_3_Car / feature.properties.HH_Total) * 100).toFixed(0);
    var car4 = ((feature.properties.Auto_4Plus_Car / feature.properties.HH_Total) * 100).toFixed(0);

    //Get the data with the new percentages
    var data = [
        {name:"Owns No Car", value:noCars, id:"carFirst"},
        {name:"Owns 1 Car", value:car1, id:"carSecond"},
        {name:"Owns 2 Cars", value:car2, id:"carThird"},
        {name:"Owns 3 Cars", value:car3, id:"carFourth"},
        {name:"Owns 4 or More Cars", value:car4, id:"carFifth"}
    ];

    if ($(window).width() > 979){
        var svg = d3.select(".footer")
        .append("svg")
        .attr("class", "car")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

        var arc = d3.arc().outerRadius(r).innerRadius(0);
        var pie = d3.pie().value(d => {return d.value;});

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("class", d =>{return "arcs " +d.data.id})
            .attr("d", arc)
            .style("fill", d => {return color(d.value);})
            .on("mouseover", d =>{
                highlightPie(d);
                $("#chart-tooltip").html(`<div class="leaflet-tooltip"><p>${d.data.name}</p><p>${d.value} %</p>`)
                    .css("visibility", "visible")
                    .css("top", (d3.event.pageY - 30) + "px")
                    .css("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", d =>{
                dehighlightPie(d);
                $("#chart-tooltip").css("visibility", "hidden");
            });
        var title = svg.append("text")
            .attr("class","title")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", 115)
            .text("Car Ownership by Household");

        if ($("#car").is(":checked")){
            return;
        } else{
            $(".car").hide();
        }
    } else {
        $(".car").remove();
        var svg = d3.select("#panel")
        .append("svg")
        .attr("class", "car")
        .attr("width", smallW)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + (smallW/2) + "," + (h/2) + ")");

        var arc = d3.arc().outerRadius(r).innerRadius(0);
        var pie = d3.pie().value(d => {return d.value;});

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("d", arc)
            .style("fill", d => {return color(d.value);})
            .on("mouseover", d =>{
                $("#chart-tooltip").html(`<div class="leaflet-tooltip"><p>${d.data.name}</p><p>${d.value} %</p>`)
                    .css("visibility", "visible")
                    .css("top", (d3.event.pageY - 30) + "px")
                    .css("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", d =>{
                $("#chart-tooltip").css("visibility", "hidden");
            });
        var title = svg.append("text")
            .attr("class","title")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", 115)
            .text("Car Ownership by Household");

        if ($("#car").is(":checked")){
            return;
        } else{
            $(".car").hide();
        }
    }
    
};

//Function to create a pie chart for education
function education(feature){
    var w = 250, h = 250, r = 100, color = d3.scaleOrdinal().range(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854"]);
    var smallW = 600;

    var data = [
        {name:"No High School Education", value:feature.properties.Edu_No_High_School, id:"educationFirst"},
        {name:"High School Education", value:feature.properties.Edu_High_School, id:"educationSecond"},
        {name:"Associate's Degree", value:feature.properties.Edu_Associate, id:"educationThird"},
        {name:"Bachelor's Degree", value:feature.properties.Edu_Bachelors, id:"educationFourth"},
        {name:"Graduate Degree", value:feature.properties.Edu_Graduate, id:"educationFifth"}
    ];

    if ($(window).width() > 979){
        var svg = d3.select(".footer")
        .append("svg")
        .attr("class", "education")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

        var arc = d3.arc().outerRadius(r).innerRadius(0);
        var pie = d3.pie().value(d => {return d.value;});

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("class", d =>{return "arcs " +d.data.id})
            .attr("d", arc)
            .style("fill", d => {return color(d.value);})
            .on("mouseover", d =>{
                highlightPie(d);
                $("#chart-tooltip").html(`<div class="leaflet-tooltip"><p>${d.data.name}</p><p>${d.value}</p>`)
                    .css("visibility", "visible")
                    .css("top", (d3.event.pageY - 30) + "px")
                    .css("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", d =>{
                dehighlightPie(d);
                $("#chart-tooltip").css("visibility", "hidden");
            });
        var title = svg.append("text")
            .attr("class","title")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", 115)
            .text("Level of Education");

        if ($("#education").is(":checked")){
            return;
        } else{
            $(".education").hide();
        }
    } else{
        $(".education").remove();
        var svg = d3.select("#panel")
        .append("svg")
        .attr("class", "education")
        .attr("width", smallW)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + (smallW/2) + "," + (h/2) + ")");

        var arc = d3.arc().outerRadius(r).innerRadius(0);
        var pie = d3.pie().value(d => {return d.value;});

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("d", arc)
            .style("fill", d => {return color(d.value);})
            .on("mouseover", d =>{
                $("#chart-tooltip").html(`<div class="leaflet-tooltip"><p>${d.data.name}</p><p>${d.value}</p>`)
                    .css("visibility", "visible")
                    .css("top", (d3.event.pageY - 30) + "px")
                    .css("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", d =>{
                $("#chart-tooltip").css("visibility", "hidden");
            });
        var title = svg.append("text")
            .attr("class","title")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", 115)
            .text("Level of Education");

        if ($("#education").is(":checked")){
            return;
        } else{
            $(".education").hide();
        }
    }
    
};

//Function to create a pie chart for language spoken
function langSpoken(feature){
    var w = 250, h = 250, r = 100, color = d3.scaleOrdinal().range(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854"]);
    var smallW = 600;

    var data = [
        {name:"No English Spoken", value:feature.properties.Lang_No_Eng, id:"englishFirst"},
        {name:"Speaks English Not Well", value:feature.properties.Lang_Eng_Not_Well, id:"englishSecond"},
        {name:"Speaks English Well", value:feature.properties.Lang_Eng_Well, id:"englishThird"},
        {name:"Speaks English Very Well", value:feature.properties.Lang_Eng_Very_Well, id:"englishFourth"},
        {name:"Only Speaks English", value:feature.properties.Lang_Eng_Only, id:"englishFifth"}
    ];

    if ($(window).width() > 979){
        var svg = d3.select(".footer")
        .append("svg")
        .attr("class", "english")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

        var arc = d3.arc().outerRadius(r).innerRadius(0);
        var pie = d3.pie().value(d => {return d.value;});

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("class", d =>{return "arcs " +d.data.id})
            .attr("d", arc)
            .style("fill", d => {return color(d.value);})
            .on("mouseover", d =>{
                highlightPie(d);
                $("#chart-tooltip").html(`<div class="leaflet-tooltip"><p>${d.data.name}</p><p>${d.value}</p>`)
                    .css("visibility", "visible")
                    .css("top", (d3.event.pageY - 30) + "px")
                    .css("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", d =>{
                dehighlightPie(d);
                $("#chart-tooltip").css("visibility", "hidden");
            });
        var title = svg.append("text")
            .attr("class","title")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", 115)
            .text("Level of English Spoken");

        if ($("#english").is(":checked")){
            return;
        } else{
            $(".english").hide();
        }
    } else{
        $(".english").remove();
        var svg = d3.select("#panel")
        .append("svg")
        .attr("class", "english")
        .attr("width", smallW)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + (smallW/2) + "," + (h/2) + ")");

        var arc = d3.arc().outerRadius(r).innerRadius(0);
        var pie = d3.pie().value(d => {return d.value;});

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("d", arc)
            .style("fill", d => {return color(d.value);})
            .on("mouseover", d =>{
                $("#chart-tooltip").html(`<div class="leaflet-tooltip"><p>${d.data.name}</p><p>${d.value}</p>`)
                    .css("visibility", "visible")
                    .css("top", (d3.event.pageY - 30) + "px")
                    .css("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", d =>{
                $("#chart-tooltip").css("visibility", "hidden");
            });
        var title = svg.append("text")
            .attr("class","title")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", 115)
            .text("Level of English Spoken");

        if ($("#english").is(":checked")){
            return;
        } else{
            $(".english").hide();
        }
    }
    
};

//Function to create a pie chart for household incomes
function hhIncomes(feature){
    var w = 250, h = 250, r = 100, color = d3.scaleOrdinal().range(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854"]);
    var smallW = 600;

    //Calculate the percentages of the population
    var under25 = ((feature.properties.Inc_Below_25 / feature.properties.HH_Total) * 100).toFixed(0);
    var lower50 = ((feature.properties.Inc_25To50 / feature.properties.HH_Total) * 100).toFixed(0);
    var upper50 = ((feature.properties.Inc_50To100 / feature.properties.HH_Total) * 100).toFixed(0);
    var above100 = ((feature.properties.Inc_Above_100 / feature.properties.HH_Total) * 100).toFixed(0);

    var data = [
        {name:"Income below 25K", value:under25, id:"hhFirst"},
        {name:"25K to 50K", value:lower50, id:"hhSecond"},
        {name:"50K to 100K", value:upper50, id:"hhThird"},
        {name:"Income 100K or Greater", value:above100, id:"hhFourth"}
    ];

    if ($(window).width() > 979){
        var svg = d3.select(".footer")
        .append("svg")
        .attr("class", "income")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

        var arc = d3.arc().outerRadius(r).innerRadius(0);
        var pie = d3.pie().value(d => {return d.value;});

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("class", d =>{return "arcs " +d.data.id})
            .attr("d", arc)
            .style("fill", d => {return color(d.value);})
            .on("mouseover", d =>{
                highlightPie(d);
                $("#chart-tooltip").html(`<div class="leaflet-tooltip"><p>${d.data.name}</p><p>${d.value} %</p>`)
                    .css("visibility", "visible")
                    .css("top", (d3.event.pageY - 30) + "px")
                    .css("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", d =>{
                dehighlightPie(d);
                $("#chart-tooltip").css("visibility", "hidden");
            });
        var title = svg.append("text")
            .attr("class","title")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", 115)
            .text("Household Incomes");

        if ($("#income").is(":checked")){
            return;
        } else{
            $(".income").hide();
        }
    } else{
        $('.income').remove();
        var svg = d3.select("#panel")
        .append("svg")
        .attr("class", "income")
        .attr("width", smallW)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + (smallW/2) + "," + (h/2) + ")");

        var arc = d3.arc().outerRadius(r).innerRadius(0);
        var pie = d3.pie().value(d => {return d.value;});

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("d", arc)
            .style("fill", d => {return color(d.value);})
            .on("mouseover", d =>{
                $("#chart-tooltip").html(`<div class="leaflet-tooltip"><p>${d.data.name}</p><p>${d.value} %</p>`)
                    .css("visibility", "visible")
                    .css("top", (d3.event.pageY - 30) + "px")
                    .css("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", d =>{
                $("#chart-tooltip").css("visibility", "hidden");
            });
        var title = svg.append("text")
            .attr("class","title")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", 115)
            .text("Household Incomes");

        if ($("#income").is(":checked")){
            return;
        } else{
            $(".income").hide();
        }
    }
    
};

//Function to create a pie chart for household above/below poverty level
function povAboveBelow(feature){
    var w = 250, h = 250, r = 100, color = d3.scaleOrdinal().range(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854"]);
    var smallW = 600;

    //Calculate the percentages of the population
    var abovePoverty = ((feature.properties.Pov_Above / feature.properties.HH_Total) * 100).toFixed(0);
    var belowPoverty = ((feature.properties.Pov_Below / feature.properties.HH_Total) * 100).toFixed(0);

    var data = [
        {name:"Above Poverty Level", value:abovePoverty, id:"povFirst"},
        {name:"Below Poverty Level", value:belowPoverty, id:"povSecond"}
    ];

    if ($(window).width() > 979){
        var svg = d3.select(".footer")
        .append("svg")
        .attr("class", "poverty")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

        var arc = d3.arc().outerRadius(r).innerRadius(0);
        var pie = d3.pie().value(d => {return d.value;});

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("class", d =>{return "arcs " +d.data.id})
            .attr("d", arc)
            .style("fill", d => {return color(d.value);})
            .on("mouseover", d =>{
                highlightPie(d);
                $("#chart-tooltip").html(`<div class="leaflet-tooltip"><p>${d.data.name}</p><p>${d.value} %</p>`)
                    .css("visibility", "visible")
                    .css("top", (d3.event.pageY - 30) + "px")
                    .css("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", d =>{
                dehighlightPie(d);
                $("#chart-tooltip").css("visibility", "hidden");
            });
        var title = svg.append("text")
            .attr("class","title")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", 115)
            .text("Incomes Above/Below Poverty Level");

        if ($("#poverty").is(":checked")){
            return;
        } else{
            $(".poverty").hide();
        }
    } else{
        $(".poverty").remove();
        var svg = d3.select("#panel")
        .append("svg")
        .attr("class", "poverty")
        .attr("width", smallW)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + (smallW/2) + "," + (h/2) + ")");

        var arc = d3.arc().outerRadius(r).innerRadius(0);
        var pie = d3.pie().value(d => {return d.value;});

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("d", arc)
            .style("fill", d => {return color(d.value);})
            .on("mouseover", d =>{
                $("#chart-tooltip").html(`<div class="leaflet-tooltip"><p>${d.data.name}</p><p>${d.value} %</p>`)
                    .css("visibility", "visible")
                    .css("top", (d3.event.pageY - 30) + "px")
                    .css("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", d =>{
                $("#chart-tooltip").css("visibility", "hidden");
            });
        var title = svg.append("text")
            .attr("class","title")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", 115)
            .text("Incomes Above/Below Poverty Level");

        if ($("#poverty").is(":checked")){
            return;
        } else{
            $(".poverty").hide();
        }
    }
    
};

//Function to create a pie chart for mode of travel
function travelMode(feature){
    var w = 250, h = 250, r = 100, color = d3.scaleOrdinal().range(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854"]);
    var smallW = 600;

    var data = [
        {name:"Carpool", value:feature.properties.Mot_Carpool, id:"travelFirst"},
        {name:"Other", value:feature.properties.Mot_Other, id:"travelSecond"},
        {name:"Drive Alone", value:feature.properties.Mot_Drove_Alone, id:"travelThird"},
        {name:"Walked/Biked", value:feature.properties.Mot_Pedbike, id:"travelFourth"},
        {name:"Teleworked", value:feature.properties.Mot_Telework, id:"travelFifth"},
        {name:"Transit", value:feature.properties.Mot_Transit, id:"travelSixth"}
    ];

    if ($(window).width() > 979){
        var svg = d3.select(".footer")
        .append("svg")
        .attr("class", "mode")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

        var arc = d3.arc().outerRadius(r).innerRadius(0);
        var pie = d3.pie().value(d => {return d.value;});

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("class", d =>{return "arcs " +d.data.id})
            .attr("d", arc)
            .style("fill", d => {return color(d.value);})
            .on("mouseover", d =>{
                highlightPie(d);
                $("#chart-tooltip").html(`<div class="leaflet-tooltip"><p>${d.data.name}</p><p>${d.value}</p>`)
                    .css("visibility", "visible")
                    .css("top", (d3.event.pageY - 30) + "px")
                    .css("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", d =>{
                dehighlightPie(d);
                $("#chart-tooltip").css("visibility", "hidden");
            });
        var title = svg.append("text")
            .attr("class","title")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", 115)
            .text("Mode of Travel to Work");

        if ($("#mode").is(":checked")){
            return;
        } else{
            $(".mode").hide();
        }
    } else{
        $(".mode").remove();
        var svg = d3.select("#panel")
        .append("svg")
        .attr("class", "mode")
        .attr("width", smallW)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + (smallW/2) + "," + (h/2) + ")");

        var arc = d3.arc().outerRadius(r).innerRadius(0);
        var pie = d3.pie().value(d => {return d.value;});

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("d", arc)
            .style("fill", d => {return color(d.value);})
            .on("mouseover", d =>{
                $("#chart-tooltip").html(`<div class="leaflet-tooltip"><p>${d.data.name}</p><p>${d.value}</p>`)
                    .css("visibility", "visible")
                    .css("top", (d3.event.pageY - 30) + "px")
                    .css("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", d =>{
                $("#chart-tooltip").css("visibility", "hidden");
            });
        var title = svg.append("text")
            .attr("class","title")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", 115)
            .text("Mode of Travel to Work");

        if ($("#mode").is(":checked")){
            return;
        } else{
            $(".mode").hide();
        }
    }
    
}

//Function to create a pie chart for time to work
function timeWork(feature){
    var w = 250, h = 250, r = 100, color = d3.scaleOrdinal().range(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854"]);
    var smallW = 600;

    var data = [
        {name:"Under 5 mins", value:feature.properties.Ttw_Below_5, id:"timeFirst"},
        {name:"5 to 15", value:feature.properties.Ttw_5To15, id:"timeSecond"},
        {name:"15 to 30", value:feature.properties.Ttw_15To30, id:"timeThird"},
        {name:"30 to 60", value:feature.properties.Ttw_30To60, id:"timeFourth"},
        {name:"60 mins or Greater", value:feature.Ttw_60Plus, id:"timeFifth"}
    ];

    if ($(window).width() > 979){
        var svg = d3.select(".footer")
        .append("svg")
        .attr("class", "travel")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

        var arc = d3.arc().outerRadius(r).innerRadius(0);
        var pie = d3.pie().value(d => {return d.value;});

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("class", d =>{return "arcs " +d.data.id})
            .attr("d", arc)
            .style("fill", d => {return color(d.value);})
            .on("mouseover", d =>{
                highlightPie(d);
                $("#chart-tooltip").html(`<div class="leaflet-tooltip"><p>${d.data.name}</p><p>${d.value}</p>`)
                    .css("visibility", "visible")
                    .css("top", (d3.event.pageY - 30) + "px")
                    .css("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", d =>{
                dehighlightPie(d);
                $("#chart-tooltip").css("visibility", "hidden");
            });
        var title = svg.append("text")
            .attr("class","title")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", 115)
            .text("Travel Time to Work in Mins");

        if ($("#travel").is(":checked")){
            return;
        } else{
            $(".travel").hide();
        }
    } else{
        $(".travel").remove();
        var svg = d3.select("#panel")
        .append("svg")
        .attr("class", "travel")
        .attr("width", smallW)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + (smallW/2) + "," + (h/2) + ")");

        var arc = d3.arc().outerRadius(r).innerRadius(0);
        var pie = d3.pie().value(d => {return d.value;});

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("d", arc)
            .style("fill", d => {return color(d.value);})
            .on("mouseover", d =>{
                $("#chart-tooltip").html(`<div class="leaflet-tooltip"><p>${d.data.name}</p><p>${d.value}</p>`)
                    .css("visibility", "visible")
                    .css("top", (d3.event.pageY - 30) + "px")
                    .css("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", d =>{
                $("#chart-tooltip").css("visibility", "hidden");
            });
        var title = svg.append("text")
            .attr("class","title")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", 115)
            .text("Travel Time to Work in Mins");

        if ($("#travel").is(":checked")){
            return;
        } else{
            $(".travel").hide();
        }
    }
    
};

//Function to create a line chart for the population over time
function lineTime(feature){
    var w = 450, h = 300, bisectDate = d3.bisector(d => {return d.name;}).left;
    var data = [
        {name: "1980", value:feature.properties.tp_1980},
        {name: "1990", value:feature.properties.tp_1990},
        {name: "2000", value:feature.properties.tp_2000},
        {name: "2010", value:feature.properties.tp_2010}
    ];

    var x = d3.scaleLinear().range([0, 350]);
    var y = d3.scaleLinear().range([250, 0]);

    var valueLine = d3.line()
        .x(d => {return x(d.name);})
        .y(d => {return y(d.value);});

    var svg = d3.select(".leaflet-popup-content")
        .append("svg")
        .attr("class", "lineResult")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" +50+ "," +20+ ")");

    x.domain(d3.extent(data, d => {return d.name;}));
    y.domain([0, d3.max(data, d => {return d.value;})]);

    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueLine);

    svg.append("g")
        .attr("transform", "translate(0," +250+ ")")
        .call(d3.axisBottom(x).tickArguments([5, "f"]));

    svg.append("g")
        .call(d3.axisLeft(y).tickArguments([10, "s"]));

    var focus = svg.append("g")
        .attr("class", "infolabel")
        .style("display", "none");

    focus.append("line")
        .attr("class", "x")
        .style("stroke", "steelblue")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("y1", 0)
        .attr("y2", h);

    focus.append("line")
        .attr("class", "y")
        .style("stroke", "steelblue")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("x1", w)
        .attr("x2", w);

    // append the circle at the intersection
    focus.append("circle")
        .attr("class", "y")
        .style("fill", "none")
        .style("stroke", "blue")
        .attr("r", 4);

    // place the value at the intersection
    focus.append("text")
        .attr("class", "y1")
        .style("stroke", "white")
        .style("stroke-width", "3.5px")
        .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "-.3em");
    focus.append("text")
        .attr("class", "y2")
        .style("font-family", "Varela")
        .style("font-size", "12px")
        .attr("dx", 8)
        .attr("dy", "-.3em");

    // place the date at the intersection
    focus.append("text")
        .attr("class", "y3")
        .style("stroke", "white")
        .style("stroke-width", "3.5px")
        .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "1em");
    focus.append("text")
        .attr("class", "y4")
        .style("font-family", "Varela")
        .style("font-size", "12px")
        .attr("dx", 8)
        .attr("dy", "1em");

    svg.append("rect")
        .attr("width", w)
        .attr("height", h)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", () => {focus.style("display", null);})
        .on("mouseout", () => {focus.style("display", "none");})
        .on("mousemove", mousemove);

    function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.name > d1.name - x0 ? d1 : d0;

    var commaNum = numberWithComma(d.value);

    focus.select("circle.y")
        .attr("transform","translate(" + x(d.name) + "," + y(d.value) + ")");

    if (x(d.name) === 350){
        focus.select("text.y1")
            .attr("transform","translate(" + 225 + "," + y(d.value) + ")")
            .text("Population: " +commaNum);

        focus.select("text.y2")
            .attr("transform", "translate(" + 225 + "," + y(d.value) + ")")
            .text("Population: " +commaNum);

        focus.select("text.y3")
            .attr("transform","translate(" + 225 + "," + y(d.value) + ")")
            .text("Year: " +d.name);

        focus.select("text.y4")
            .attr("transform", "translate(" + 225 + "," + y(d.value) + ")")
            .text("Year: " +d.name);
    } else {
        focus.select("text.y1")
            .attr("transform","translate(" + x(d.name) + "," + y(d.value) + ")")
            .text("Population: " +commaNum);
        
        focus.select("text.y2")
            .attr("transform","translate(" + x(d.name) + "," + y(d.value) + ")")
            .text("Population: " +commaNum);

        focus.select("text.y3")
            .attr("transform","translate(" + x(d.name) + "," + y(d.value) + ")")
            .text("Year: " +d.name);

        focus.select("text.y4")
            .attr("transform","translate(" + x(d.name) + "," + y(d.value) + ")")
            .text("Year: " +d.name);
    }

    focus.select(".x")
        .attr("transform","translate(" + x(d.name) + "," + y(d.value) + ")")
        .attr("y2", h - y(d.value));

    focus.select(".y")
        .attr("transform","translate(" + w * -1 + "," + y(d.value) + ")")
        .attr("x2", w + w);
    };

    if ($("#line").is(":checked")){
        return;
    } else{
        $(".lineResult").hide();
    }
};

//Create a function to add a comma to the population value
function numberWithComma(number){
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};

//Create a function to highlight the piece of the pie that the user hovers on
function highlightPie(props){
    //Change the stroke
    var selected = d3.selectAll("." + props.data.id)
        .style("stroke", "yellow")
        .style("stroke-width", "5");
};

//Create a function to dehighlight the piece of the pie that the user hovered over
function dehighlightPie(props){
    var selected = d3.selectAll("." + props.data.id)
        .style("stroke", () =>{
            return "stroke", "none"
        })
        .style("stroke-width", () =>{
            return "stroke-width", "0"
        });
};


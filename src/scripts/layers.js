/**
 * Created by bdraper on 4/27/2015.
 */
//IMPORTANT: replace eventName variable below with desired event name from STN Event
var eventName = "Sandy";
//IMPORTANT(optional):replace eventType variable below with event type, i.e. "Hurricane", where applicable. If not a hurricane, leave string empty.
var eventType = "Hurricane";
//the map services root variable should be static, but change if necessary
var mapServicesRoot = "http://stnmapservices.wimcloud.usgs.gov:6080/arcgis/rest/services/STN";
//stnDomain variable should be static, but change if necessary
var stnDomain = "stn.wim.usgs.gov";
var allLayers;

require([
    "esri/geometry/Extent",
    "esri/layers/WMSLayerInfo",
    "esri/layers/FeatureLayer",
    'dojo/domReady!'
], function(
    Extent,
    WMSLayerInfo,
    FeatureLayer
) {

    allLayers = [
        {
            "groupHeading": "Event Data",
            "showGroupHeading": true,
            "includeInLayerList": true,
            "layers": {
                "NOAA Tropical Cyclone Track" : {
                    "url": "http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteocean_tropicalcyclones_trackintensityfcsts_time/MapServer",
                    "options": {
                        "id": "noaaConeTrack",
                        "opacity":0.50,
                        "visible": true
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": true,
                        "includeLegend": true,
                        "hasOpacitySlider": true,
                        "identifiable" :false
                    }
                },
                "Barometric": {
                    "url" : mapServicesRoot + "/Barometric/MapServer/0",
                    "options": {
                        "id": "baro",
                        "opacity": 1,
                        "visible": true,
                        "mode": FeatureLayer.MODE_SNAPSHOT,
                        "outFields": ["*"],
                        "definitionExpression": "EVENT_NAME = '" + eventName + "'"
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisFeature",
                        "includeInLayerList": true,
                        "includeLegend" : true,
                        "hasOpacitySlider": true,
                        "identifiable" :true
                    }
                },
                "Meteorological": {
                    "url" : mapServicesRoot + "/Meteorological/MapServer/0",
                    "options": {
                        "id": "met",
                        "opacity": 1,
                        "visible": true,
                        "mode": FeatureLayer.MODE_SNAPSHOT,
                        "outFields": ["*"],
                        "definitionExpression": "EVENT_NAME = '" + eventName + "'"
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisFeature",
                        "includeInLayerList": true,
                        "hasOpacitySlider": true,
                        "includeLegend" : true,
                        "identifiable" :true
                    }
                },
                "Rapid Deploy Gage": {
                    "url" : mapServicesRoot + "/RapidDeployGage/MapServer/0",
                    "options": {
                        "id": "rdg",
                        "opacity": 1,
                        "visible": true,
                        "mode": FeatureLayer.MODE_SNAPSHOT,
                        "outFields": ["*"],
                        "definitionExpression": "EVENT_NAME = '" + eventName + "'"
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisFeature",
                        "includeInLayerList": true,
                        "hasOpacitySlider": true,
                        "includeLegend" : true,
                        "identifiable" :true
                    }
                },
                "Storm Tide": {
                    "url" : mapServicesRoot + "/StormTide/MapServer/0",
                    "options": {
                        "id": "stormTide",
                        "opacity": 1,
                        "visible": true,
                        "mode": FeatureLayer.MODE_SNAPSHOT,
                        "outFields": ["*"],
                        "definitionExpression": "EVENT_NAME = '" + eventName + "'"
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisFeature",
                        "includeInLayerList": true,
                        "hasOpacitySlider": true,
                        "includeLegend" : true,
                        "identifiable" :true
                    }
                },
                "Wave Height": {
                    "url" : mapServicesRoot + "/WaveHeight/MapServer/0",
                    "options": {
                        "id": "waveHeight",
                        "opacity": 1,
                        "visible": true,
                        "mode": FeatureLayer.MODE_SNAPSHOT,
                        "outFields": ["*"],
                        "definitionExpression": "EVENT_NAME = '" + eventName + "'"
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisFeature",
                        "includeInLayerList": true,
                        "hasOpacitySlider": true,
                        "includeLegend" : true,
                        "identifiable" :true
                    }
                },
                "High-water Marks" : {
                    "url": mapServicesRoot + "/HWMs/MapServer/0",
                    "options": {
                        "id": "hwms",
                        "opacity": 1,
                        "visible": false,
                        "mode": FeatureLayer.MODE_SNAPSHOT,
                        "outFields": ["*"],
                        "definitionExpression": "EVENT_NAME = '" + eventName + "'"
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisFeature",
                        "includeInLayerList": true,
                        "hasOpacitySlider": true,
                        "includeLegend" : true,
                        "identifiable" :true
                    }
                },
                "USGS NWIS Gages" : {
                    "url": mapServicesRoot + "/STN_nwis_rt/MapServer/0",
                    "options": {
                        "id": "nwis",
                        "opacity": 1,
                        "visible": false,
                        "mode": FeatureLayer.MODE_SNAPSHOT,
                        "outFields": ["*"]
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisFeature",
                        "includeInLayerList": true,
                        "includeLegend": true,
                        "identifiable" :true
                    }
                },
                "FEMA Surge Boundaries" : {
                    "url": "http://services.femadata.com/arcgis/rest/services/2012_Sandy/SurgeBoundaries_Final_0214/MapServer",
                    "options": {
                        "id": "surge",
                        "opacity": 1,
                        "visible": false,
                        "outFields": ["*"]
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": true,
                        "includeLegend": true,
                        "identifiable" :false
                    }
                },
                "NWS Doppler Radar" : {
                    "url": "http://gis.srh.noaa.gov/arcgis/rest/services/RIDGERadar/MapServer",
                    "options": {
                        "id": "radar",
                        "opacity":0.99,
                        "visible": false
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": true,
                        "includeLegend": false,
                        "hasOpacitySlider": true,
                        "identifiable" :false
                    }
                }
                //"NOAA Storm Track ": {
                //    "url" : "http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/wwa",
                //    "options":{
                //        "id": "noaaConeTrack",
                //        "transparent":false,
                //        "opacity": 0.8,
                //        "visible": true,
                //        "resourceInfo":  {
                //            "extent": new Extent( -127.177734375,17.578125,-65.302734375,52.470703125, {
                //                "wkid": 4326
                //            }),
                //            "layerInfos": [new WMSLayerInfo({
                //                "name": 'noaaConeTrack',
                //                "title": 'Probability Cone and Tracks',
                //                "transparent": false
                //            })]
                //        },
                //        "visibleLayers": ['NHC_TRACK_POLY','NHC_TRACK_LIN','NHC_TRACK_PT', 'NHC_TRACK_WWLIN',
                //            'NHC_TRACK_PT_72DATE','NHC_TRACK_PT_120DATE','NHC_TRACK_PT_0NAMEDATE', 'NHC_TRACK_PT_MSLPLABELS',
                //            'NHC_TRACK_PT_72WLBL','NHC_TRACK_PT_120WLBL','NHC_TRACK_PT_72CAT','NHC_TRACK_PT_120CAT']
                //    },
                //    "wimOptions": {
                //        "type": "layer",
                //        "layerType": "agisWMS",
                //        "includeInLayerList": true,
                //        "includeLegend": true,
                //        "staticLegendOptions": {
                //            "hasStaticLegend": false,
                //            "legendTitle": "",
                //            "legendUrl": "http://nowcoast.noaa.gov/LayerInfo?layer=NHC_TRACK_POLY&data=legend"
                //        }
                //    }
                //}
            }
        }
    ]

});






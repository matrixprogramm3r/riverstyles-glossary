var LocalStorageStore = function(successCallback, errorCallback) {

    this.findByName = function(searchKey, callback) {
        var words = JSON.parse(window.localStorage.getItem("words"));
        var results = words.filter(function(element) {
            var word = element.word;
            return word.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        callLater(callback, results);
    }

    this.findById = function(id, callback) {
        var words = JSON.parse(window.localStorage.getItem("words"));
        var word = null;
        var l = words.length;
        for (var i=0; i < l; i++) {
            if (words[i].id === id) {
                word = words[i];
                break;
            }
        }
        callLater(callback, word);
    }

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }

    var words = [
            {"id": 1, "word": "Catchment", "definition": "Area of land where water collects when it rains, often bounded by hills.  Some types include rivers, damns and ground water systems."},
            {"id": 2, "word": "Floodplain", "definition": "An area of low-lying ground adjacent to a river, formed mainly of river sediments and subject to flooding."},
            {"id": 3, "word": "Geomorphic", "definition": "Of, resembling, or pertaining to the form of the earth or of its surface features."},
            {"id": 4, "word": "Geomorphic units", "definition": "The building blocks of river systems."},
            {"id": 5, "word": "Hydrologic Regime", "definition": "Changes with time in the rates of flow of rivers and in the levels and volumes of water in rivers, lakes, reservoirs and marshes."},
            {"id": 6, "word": "Longitudinal profile", "definition": "A graphic presentation of elevation vs. distance; in channel hydraulics it is a plot of water surface elevation against upstream to downstream distance."},
            {"id": 7, "word": "Planform", "definition": "Outline of an object viewed from above."},
            {"id": 8, "word": "Pro forma", "definition": "1. Done as a formality; perfunctory. 2. Provided in advance so as to prescribe form or describe items: a pro forma copy of a document."},
            {"id": 9, "word": "Terrace", "definition": "A flat area bounded by a short steep slope formed by the down-cutting of a river or by erosion."},
            {"id": 10, "word": "Reach", "definition": "Most generally, a reach is any length of a stream between any two points."},
            {"id": 11, "word": "GIS", "definition": "Geographic information system (GIS) is a computer system designed to capture, store, manipulate, analyze, manage, and present all types of spatial or geographical data."},
            {"id": 12, "word": "Baseline survey", "definition": "The first step in a project, which involves gathering key information early so that later judgments can be made about the quality and development results achieved by project."}        
        ];

    window.localStorage.setItem("words", JSON.stringify(words));

    callLater(successCallback);

}
var WebSqlStore = function(successCallback, errorCallback) {

    this.initializeDatabase = function(successCallback, errorCallback) {
        var self = this;
        this.db = window.openDatabase("RiverStyleDB", "1.0", "RiverStyle Glossary DB", 200000);
        this.db.transaction(
                function(tx) {
                    self.createTable(tx);
                    self.addSampleData(tx);
                },
                function(error) {
                    console.log('Transaction error: ' + error);
                    if (errorCallback) errorCallback();
                },
                function() {
                    console.log('Transaction success');
                    if (successCallback) successCallback();
                }
        )
    }

    this.createTable = function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS word');
        var sql = "CREATE TABLE IF NOT EXISTS word ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "word VARCHAR(50), " +
            "definition VARCHAR(250))";
        tx.executeSql(sql, null,
                function() {
                    console.log('Create table success');
                },
                function(tx, error) {
                    alert('Create table error: ' + error.message);
                });
    }

    this.addSampleData = function(tx, words) {
        var words = [
            {"id": 1, "word": "Catchment", "definition": "Area of land where water collects when it rains, often bounded by hills.  Some types include rivers, damns and ground water systems."},
            {"id": 2, "word": "Floodplain", "definition": "An area of low-lying ground adjacent to a river, formed mainly of river sediments and subject to flooding."},
            {"id": 3, "word": "Geomorphic", "definition": "Of, resembling, or pertaining to the form of the earth or of its surface features."},
            {"id": 4, "word": "Geomorphic units", "definition": "The building blocks of river systems."},
            {"id": 5, "word": "Hydrologic Regime", "definition": "Changes with time in the rates of flow of rivers and in the levels and volumes of water in rivers, lakes, reservoirs and marshes."},
            {"id": 6, "word": "Longitudinal profile", "definition": "A graphic presentation of elevation vs. distance; in channel hydraulics it is a plot of water surface elevation against upstream to downstream distance."},
            {"id": 7, "word": "Planform", "definition": "Outline of an object viewed from above."},
            {"id": 8, "word": "Pro forma", "definition": "1. Done as a formality; perfunctory.  2. Provided in advance so as to prescribe form or describe items: a pro forma copy of a document."},
            {"id": 9, "word": "Terrace", "definition": "A flat area bounded by a short steep slope formed by the down-cutting of a river or by erosion."},
            {"id": 10, "word": "Reach", "definition": "Most generally, a reach is any length of a stream between any two points."},
            {"id": 11, "word": "GIS", "definition": "Geographic information system (GIS) is a computer system designed to capture, store, manipulate, analyze, manage, and present all types of spatial or geographical data."},
            {"id": 12, "word": "Baseline survey", "definition": "The first step in a project, which involves gathering key information early so that later judgments can be made about the quality and development results achieved by project."}        
        ];
        var l = words.length;
        var sql = "INSERT OR REPLACE INTO word " +
            "(id, word, definition) " +
            "VALUES (?, ?, ?)";
        var e;
        for (var i = 0; i < l; i++) {
            e = words[i];
            tx.executeSql(sql, [e.id, e.word, e.definition],
                    function() {
                        console.log('INSERT success');
                    },
                    function(tx, error) {
                        alert('INSERT error: ' + error.message);
                    });
        }
    }

    this.findByName = function(searchKey, callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT e.id, e.word, e.definition, count(e.id) reportCount " +
                    "FROM word e " +
                    "WHERE e.word LIKE ? " +
                    "GROUP BY e.id ORDER BY e.word";

                tx.executeSql(sql, ['%' + searchKey + '%'], function(tx, results) {
                    var len = results.rows.length,
                        words = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        words[i] = results.rows.item(i);
                    }
                    callback(words);
                });
            },
            function(error) {
                alert("#1 Transaction Error: " + error.message);
            }
        );
    }

    this.findById = function(id, callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT e.id, e.word, e.definition, count(e.id) reportCount " +
                    "FROM word e " +
                    "WHERE e.id=:id";

                tx.executeSql(sql, [id], function(tx, results) {
                    callback(results.rows.length === 1 ? results.rows.item(0) : null);
                });
            },
            function(error) {
                alert("#2 Transaction Error: " + error.message);
            }
        );
    };

    this.initializeDatabase(successCallback, errorCallback);

}

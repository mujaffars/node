function createDb(dbName) {
    var db = new PouchDB(dbName, {skipSetup: true});
    db.info().then(console.log.bind(console))
            .catch(console.log.bind(console));
    return db;
}

function getDb(dbName) {
    var db = new PouchDB(dbName, {skipSetup: true});
    return db;
}

function destroyDb(db) {
    db.destroy().then(function (response) {
        console.log(response);
        // success
    }).catch(function (err) {
        console.log(err);
    });
}

function createDoc(db, docId, docTitle) {
    db.put({
        _id: docId,
        title: docTitle
    }).then(function (response) {
        // handle response
    }).catch(function (err) {
        console.log(err);
    });
}

function createDocKey(db, docId) {
    db.get(docId).then(function (doc) {
        return db.put({
            _id: docId,
            _rev: doc._rev,
            levels: {
            }
        });
    }).then(function (response) {
        
    }).catch(function (err) {
        console.log(err);
    });
}

function insertObject(db, docId, lvlId) {
    db.upsert(docId, function (doc) {
        doc.levels[lvlId] = {key: 'first 6', info: 'this is info 6666'}
        return doc;
    }).then(function (res) {
        // success, res is {rev: '1-xxx', updated: true}
        db.get(docId).then(function (doc) {
            console.log(doc);
        });
    }).catch(function (err) {
        // error
    });
}

function getDoc(db, docName) {
    db.get(docName).then(function (doc) {

    }).catch(function (err) {
        createDoc(db, 'doc1', 'doc1')
        createDocKey(db, 'doc1');
    });
}
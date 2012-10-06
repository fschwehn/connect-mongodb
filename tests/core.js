var testosterone = require('testosterone')({title: 'models/advertiser'})
  , assert = testosterone.assert
  , gently = global.GENTLY = new (require('gently'))
  , Db = require('mongodb').Db
  , Server = require('mongodb').Server
  , server_config_1 = new Server('localhost', 27017, {auto_reconnect: true, native_parser: true})
  , server_config_2 = new Server('localhost', 27017, {auto_reconnect: true, native_parser: true})
  , url = 'mongodb://localhost:27017/test'
  , connect_mongodb = require('..')
  , db = new Db('test', server_config_1, {});

testosterone

  .add('Should callback an error if no db given', function (done) {
    var funk = require('funk')('parallel');

    db.open(function () {
      // Assert that the variable assignment to the contructor call takes place 
      // prior to the callback execution provided to the constructor.
      var newDb = new connect_mongodb({db: db}, function(){
        funk.add(assert.ok)(newDb instanceof connect_mongodb);
      });
      connect_mongodb(null, funk.add(assert.ok));
      connect_mongodb({db: null}, funk.add(assert.ok));
      connect_mongodb({db: db, setInterval: -1}, funk.add(assert.ifError));
      connect_mongodb({server_config: server_config_2, setInterval: -1}, funk.add(assert.ifError));
      connect_mongodb({url: url, setInterval: -1}, funk.add(assert.ifError));
      funk.run(done);
    });
  })

  .run();


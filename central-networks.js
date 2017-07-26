var chalk = require("chalk");
var { table } = require("table");

var { mergeEntities } = require("./util");

function listNetworks2(ztCentral, db) {
  return function(vorpal, options) {
    vorpal
      .command("central networks ", "lists central networks")
      .action(function(args, callback) {
        this.log("fetching networks");
        var self = this;
        ztCentral.getNetworks(function(err, res) {
          if (err) return callback(err);

          mergeEntities(db, res, "centralNetworks", "id");

          var table = formatNetworks(res);
          self.log(table);

          callback();
        });
      });
  };
}

function formatNetworks(networks) {
  var headers = [
    [
      chalk.bold("id"),
      chalk.bold("name"),
      chalk.bold("online members"),
      chalk.bold("private")
    ]
  ];

  var data = networks.map(network => [
    network.id,
    network.config.name || "",
    network.onlineMemberCount,
    network.config.private
  ]);

  return table(headers.concat(data), {});
}

module.exports = { listNetworks2: listNetworks2 };

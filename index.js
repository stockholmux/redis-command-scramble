var
  argv            = require('yargs')
    .demand('json')
    .demand('conf')
    .default('randomlength',8)
    .argv,
  commands        = require('redis-commands'),
  crypto          = require('crypto'),
  fs              = require('fs'),
  nodeRedisConfig = {},
  renames         = [];

function getRandomBytes() {
  return crypto.randomBytes(argv.randomlength).toString('hex');
}

commands.list.forEach(function(aCommand,cb) {
  var
    newRandomName = 'r'+getRandomBytes(),
    commandUp     = aCommand.toUpperCase();
  if (commandUp === 'QUIT') {
    console.log('skipping quit');
  } else {
    nodeRedisConfig[commandUp] = newRandomName;
    renames.push([
      'rename-command',
      commandUp,
      newRandomName
    ].join(' '));
  }
  
});

fs.writeFile(
  argv.json,
  JSON.stringify(nodeRedisConfig,null,' '),
  function(err) {
    if (err) { throw err; }
    console.log('JSON written to',argv.json);

    fs.writeFile(
      argv.conf,
      renames.join('\r\n'),
      function(err) {
        if (err) { throw err; }
        console.log('Renames written to',argv.conf);
      }
    )
  }
);
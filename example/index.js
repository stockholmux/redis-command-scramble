var
  argv      = require('yargs')
    .demand('redisopts')
    .demand('renamejson')
    .argv,
  redis     = require('redis'),
  redisOpts = require(argv.redisopts),
  client;

redisOpts['rename_commands'] = require(argv.renamejson);

client = redis.createClient(redisOpts);

client.get('test',function(err,response) {
  if (err) { throw err; }
  console.log(response);
  client.quit();
});
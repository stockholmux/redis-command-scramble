# redis-command-scramble

This script will generate `rename-commands` configuration lines (for redis.conf) renaming all the Redis commands to random characters. It will generate a node_redis compatible `rename_commands` configuration object

## Uh, why?

Scrambling Redis commands can add a level of security to your Redis instance. Further explanation can be found [here](https://medium.com/@stockholmux/redis-quickie-scramble-and-unscramble-your-commands-in-node-js-1495a5549618).

## How?

First, install the dependencies with NPM by running this command in the directory

```
$ npm install
```

then run the script:

```
node index.js --json ~/path/to/outfile.json --conf ~/path/to/outfile.conf
```

You will need to copy the contents of the outfile.conf to the end of your redis configuration file. See the node example (`example/index.js`) for usage with node_redis.


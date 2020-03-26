# nodejs-cluster
A single instance of Node.js runs in a single thread. To take advantage of multi-core systems, the user will sometimes want to launch a cluster of Node.js processes to handle the load.

Details: https://nodejs.org/api/cluster.html

## Architecture

### Single Thread
<img src="https://raw.githubusercontent.com/Kshirodram/nodejs-cluster/master/single-thread.png" height="200" width="400"/>

### Cluster mode
<img src="https://raw.githubusercontent.com/Kshirodram/nodejs-cluster/master/cluster-mode.png" height="400" width="400"/>

### Cluster internal
<img src="https://raw.githubusercontent.com/Kshirodram/nodejs-cluster/master/internal-cluster.png" height="300" width="400"/>

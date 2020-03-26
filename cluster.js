const express = require("express");
const cluster = require("cluster");
const os = require("os");

// Check for master mode and execute the file
if (cluster.isMaster) {
  // Calculate the physical core and fork that many thread. Because no of physical core
  // === number cork child processes of nodejs will give you better performance
  const cores = os.cpus().filter(function(cpu, index) {
    const hasHyperthreading = cpu.model.includes("Intel");
    const isOdd = index % 2 === 1;
    return !hasHyperthreading || isOdd;
  });
  let cpuCount = cores.length;
  console.log(`No of CPU count: ${cpuCount}`);
  for (let i = 0; i < cpuCount; i += 1) {
    // This file will be execute again but in child mode
    cluster.fork();
  }
} else {
  const app = express();
  const port = 3000;
  console.log("process Id:", process.pid);
  app.get("/", function(req, res) {
    console.log("pid", process.pid, "handler start, blocking CPU");
    // hold the execution by 5sec
    const start = Date.now();
    while (Date.now() - start < 5000) {
      // keep waiting and do nothing
    }
    console.log("pid", process.pid, "unblocked, responding");
    res.status(200).send(`Result after 5sec`);
  });

  app.get("/fast", function(req, res) {
    res.end(
      `Ideally it should delayed by ~5sec but because of cluster mode it will work fast.`
    );
  });

  app.listen(port, () => {
    console.log(`server is listening on localhost:${port}`);
  });
}

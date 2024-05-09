import { credentials } from "@grpc/grpc-js";
import process from "node:process";
import { GreeterClient, HelloRequest } from "./helloworld_pb.ts";
import parseArgs from "npm:minimist";

function main() {
  const argv = parseArgs(process.argv.slice(2), {
    string: "target",
  });
  let target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = "localhost:50051";
  }
  const client = new GreeterClient(target, credentials.createInsecure());
  let user;
  if (argv._.length > 0) {
    user = argv._[0];
  } else {
    user = "world";
  }
  const request = HelloRequest.create({
    name: user,
  });
  client.sayHello(request, function (err, response) {
    if (err) {
      console.error("Error:", err);
      return;
    }
    console.log("Greeting:", response.message);
  });
}

main();

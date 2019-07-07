const { Server } = require("rpc-websockets");

var server = new Server({
  host: "localhost",
  port: 8070
});

server.register("services.list", function(params) {
  return [{ id: "test", name: "TEST" }];
});

server.register("services.get", function(params) {
  return {
    general_filters: {
      dates: "DatePicker",
      exp_ids: "TextInput",
      geoid: "IntegerSelector",
      platform: "TextInput",
      sample: "FloatInput",
      sex: "IsCoolButHaveYouTriedFlowr"
    },
    name: "TEST"
  };
});

server.register("graph.init", function(params) {
  return {};
});

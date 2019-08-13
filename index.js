const { Server } = require("rpc-websockets");
const jsf = require("json-schema-faker");
const schema = require("./schema");

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
      sample: "FloatInput",
      dates: "DatePicker",
      exp_ids: "TextInput",
      geoid: "IntegerSelector",
      platform: "TextInput",
      sex: "IsCoolButHaveYouTriedFlowr"
    },
    name: "TEST"
  };
});

server.register("graph.get_available_dates", function(params) {
  return [`2019-02-01`];
});

server.register("graph.init", function(params) {
  return {};
});

server.register("ping", function(params) {
  return {};
});

server.register("graph.get_graph", function(params) {
  let worldSetted = false;
  let worldPrevId;

  const mock = jsf
    .generate(schema)
    .result.filter((el, idx, array) => {
      if (el.cls === "edge" && el.source !== el.target) {
        return (
          array.filter(el2 => el2.cls === "node" && el.source === el2.id)
            .length &&
          array.filter(el2 => el2.cls === "node" && el.target === el2.id).length
        );
      }

      if (el.cls === "node") {
        return array.filter(
          el2 =>
            el2.cls === "edge" && (el2.source === el.id || el2.target === el.id)
        ).length;
      }

      return false;
    })
    .reduce((acc, el) => {
      if (el.cls === "edge") {
        if (
          !acc.filter(el2 => {
            return (
              el2.cls === "edge" &&
              el2.source === el.source &&
              el2.target === el.target
            );
          }).length
        ) {
          acc.push(el);
        }
      }

      if (el.cls === "node") {
        if (
          !acc.filter(el2 => {
            return el2.cls === "node" && el2.id === el.id;
          }).length
        ) {
          acc.push(el);
        }
      }

      return acc;
    }, [])
    .map(el => {
      if (!worldSetted && el.cls === "node") {
        worldPrevId = el.id;
        el.id = "world";
        worldSetted = true;
      }
      el.id = String(el.id);
      return el;
    })
    .map(el => {
      if (el.cls === "edge") {
        if (el.target === worldPrevId) {
          el.target = "world";
        }

        if (el.source === worldPrevId) {
          el.source = "world";
        }

        el.id = `${el.target}->${el.source}`;
        el.target = String(el.target);
        el.source = String(el.source);
      }

      return el;
    });
  console.log(mock);
  return mock;
});

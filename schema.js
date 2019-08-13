module.exports = {
  $schema: "http://json-schema.org/draft-06/schema#",
  $ref: "#/definitions/Flowr",
  definitions: {
    Flowr: {
      type: "object",
      additionalProperties: false,
      properties: {
        result: {
          type: "array",
          minItems: 400,
          maxItems: 400,
          items: {
            $ref: "#/definitions/Result"
          }
        },
        id: {
          type: "integer"
        }
      },
      required: ["id", "result"],
      title: "Flowr"
    },
    Result: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: {
          type: "integer",
          minimum: 0,
          maximum: 20
        },
        users: {
          type: "integer",
          minimum: 0,
          maximum: 100000
        },
        sessions: {
          type: "integer",
          minimum: 0,
          maximum: 100000
        },
        users_share: {
          type: "number",
          minimum: 0,
          maximum: 0.3
        },
        sessions_share: {
          type: "number",
          minimum: 0,
          maximum: 0.3
        },
        ru_name: {
          type: "string",
          minLength: 5,
          maxLength: 10
        },
        cls: {
          $ref: "#/definitions/Cls"
        },
        source: {
          type: "integer",
          minimum: 0,
          maximum: 20
        },
        target: {
          type: "integer",
          minimum: 0,
          maximum: 20
        }
      },
      required: [
        "cls",
        "id",
        "ru_name",
        "sessions",
        "sessions_share",
        "source",
        "target",
        "users",
        "users_share"
      ],
      title: "Result"
    },
    Cls: {
      type: "string",
      enum: ["node", "edge"],
      title: "Cls"
    }
  }
};

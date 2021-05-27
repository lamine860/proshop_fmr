register_schema =  {
    "type": "object",
    "properties": {
      "name": { "type": "string", "minLength": 2, "maxLength": 60 },
      "email": { "type": "string", "format": "email" },
      "password": { "type": "string", "minLength": 8, "maxLength": 32 }
    },
    "required": [ "name", "email", "password" ]
  }
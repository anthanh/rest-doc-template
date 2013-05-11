/*! REST Doc Template | @antaipt | MIT/GPL2 Licensed
  source: https://github.com/anthanh/rest-doc-template  */

var blueprint = {
    "gateway": "http://localhost",
    "resources": [
        {
            "title": "GET /user",
            "type": "user",
            "description": [
                "description line 1",
                "description line 2"
            ],
            "path": "/user",
            "logued": false,
            "method": "GET",
            "query":[
                {
                    "name": "page",
                    "type": "integer",
                    "required": false,
                    "default": 0,
                    "description": {
                        "type": "String",
                        "value": ""
                    }
                },
                {
                    "name": "size",
                    "type": "String",
                    "required": true,
                    "default": 10,
                    "description": {
                        "type": "format",
                        "value": "dd-mm-yyyy"
                    }
                }
            ],
            "queryExample": "page=0&size=10",
            "data": '{"name":"Nombre","surnames":"Apellidos","gender":"0","birthdate":"05-10-1985","idcard":"abcdefg"}',
            "response": '{"_payload":{},"_response":{"code":"?","devInfo":null,"info":null,"message":null,"status":200,"type":null}}',
            "codeStatus":[
                {
                    "code": 200,
                    "reason": ""
                }
            ],
            "comments": [
                "comment line 1",
                "comment line 2"
            ]
        },
        {
            "title": "PUT /user",
            "type": "user",
            "description": "descripción",
            "path": "/user",
            "logued": true,
            "method": "PUT",
            "query":[
                {
                    "name": "page",
                    "type": "integer",
                    "required": false,
                    "default": 0,
                    "description": "Mayor o igual que <code>0</code>"
                },
                {
                    "name": "size",
                    "type": "integer",
                    "required": false,
                    "default": 10,
                    "description": "Mayor o igual que <code>1</code>"
                },
                {
                    "name": "fields",
                    "type": "String",
                    "required": false,
                    "default": "''",
                    "description": "Nombres de los campos por el que se filtran"
                }
            ],
            "queryExample": "page=0&size=10",
            "data": '{"result":"ok","name":"Nombre","surnames":"Apellidos","gender":"0","birthdate":"05-10-1985","idcard":"abcdefg"}',
            "response": '{"_payload":{},"_response":{"code":"?","devInfo":null,"info":null,"message":null,"status":200,"type":null}}',
            "codeStatus":[
                {
                    "code": 200,
                    "reason": "Ok"
                },
                {
                    "code": 400,
                    "reason": "Petición sintácticamente incorrecta"
                },
                {
                    "code": 401,
                    "reason": "No autenticado"
                },
                {
                    "code": 403,
                    "reason": "No autorizado"
                },
                {
                    "code": 404,
                    "reason": "No existe"
                },
                {
                    "code": 422,
                    "reason": "Petición semánticamente incorrecta"
                }
            ],
            "comments": "comment"
        }
    ]
};
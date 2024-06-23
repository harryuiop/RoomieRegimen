/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "8zua4hsd49de3ck",
    "created": "2024-06-23 06:03:27.405Z",
    "updated": "2024-06-23 06:03:27.405Z",
    "name": "flatmates",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vmsim1ho",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("8zua4hsd49de3ck");

  return dao.deleteCollection(collection);
})

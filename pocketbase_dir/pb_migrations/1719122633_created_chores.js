/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "jrk1jv3ggekpdcz",
    "created": "2024-06-23 06:03:53.042Z",
    "updated": "2024-06-23 06:03:53.042Z",
    "name": "chores",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ycrzeddt",
        "name": "chore_name",
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
  const collection = dao.findCollectionByNameOrId("jrk1jv3ggekpdcz");

  return dao.deleteCollection(collection);
})

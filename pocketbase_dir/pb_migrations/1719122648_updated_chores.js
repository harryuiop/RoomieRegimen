/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jrk1jv3ggekpdcz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hqaws5iv",
    "name": "assigned",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jrk1jv3ggekpdcz")

  // remove
  collection.schema.removeField("hqaws5iv")

  return dao.saveCollection(collection)
})

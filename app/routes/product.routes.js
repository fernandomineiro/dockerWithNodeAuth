const { authJwt } = require("../middleware");

module.exports = app => {
  const product = require("../controllers/product.controller.js");

  var router = require("express").Router();


  router.post("/", product.create);

  router.get("/", product.findAll);

  router.get("/published", product.findAllPublished);

  router.get("/:id", product.findOne);

  router.put("/:id", product.update);

  router.delete("/:id", product.delete);

  router.delete("/", product.deleteAll);

  app.use('/api/products', router);
};

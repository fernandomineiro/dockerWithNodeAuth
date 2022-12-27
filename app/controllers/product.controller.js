const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Nome já existente!"
    });
    return;
  }

  const product = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };


  Product.create(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error no back"
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Product.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro no back."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não pode encontrar produto com id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro no back com id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Produto atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Não pode atualizar produto com id=${id}. Algum campo não pode ser null!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro na atualização id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Produto deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Não pode deletar produto com id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Produto não encontrado com id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Product.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Produtos deletado com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "erro no back"
      });
    });
};

exports.findAllPublished = (req, res) => {
  Product.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro no back"
      });
    });
};

const BaseDAO = require('./BaseDAO');

class ProdutoDAO extends BaseDAO {
  constructor() {
    super("produtos"); // usa a colecao "produtos"
  }
}

module.exports = ProdutoDAO;

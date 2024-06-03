const mongoose = require('mongoose');

const esquemaDePostagem = new mongoose.Schema({
    titulo: { type: String, required: true },
    conteudo: { type: String, required: true }
});

module.exports = mongoose.model("Postagem", esquemaDePostagem);

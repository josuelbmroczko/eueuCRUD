const express = require('express'); // Importa o módulo Express
const router = express.Router(); // Inicia uma instância de roteador Express
const Postagem = require('../modelos/postagem'); // Importa o modelo de Postagem para interagir com o banco de dados

// Rota para listar todas as postagens
// Rota para listar todas as postagens
router.get('/', async (req, res) => {
    try {
        const postagens = await Postagem.find();
        res.json(postagens);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar postagens' });
    }
});


// Rota para criar uma nova postagem
router.post('/postes', async (req, res) => {
    // Cria um novo objeto Postagem com os dados fornecidos no corpo da requisição
    const postagem = new Postagem({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    });

    try {
        // Tenta salvar a nova postagem no banco de dados
        const postagemSalva = await postagem.save();
        // Responde com a postagem recém-salva
        res.json(postagemSalva);
    } catch (erro) {
        // Em caso de erro, responde com uma mensagem de erro
        res.json({ mensagem: erro });
    }
});

// Rota para visualizar os detalhes de uma postagem específica
router.get('/:postId', async (req, res) => {
    try {
        const postagem = await Postagem.findById(req.params.postId); // Encontra a postagem com o ID fornecido
        res.json(postagem); // Responde com os detalhes da postagem encontrada
    } catch (erro) {
        res.json({ mensagem: erro }); // Em caso de erro, responde com uma mensagem de erro
    }
});

// Rota para atualizar uma postagem existente
router.patch('/:postId', async (req, res) => {
    try {
        const postagemAtualizada = await Postagem.updateOne(
            { _id: req.params.postId }, // Encontra a postagem com o ID fornecido
            { $set: { titulo: req.body.titulo, conteudo: req.body.conteudo } } // Atualiza os campos fornecidos
        );
        res.json(postagemAtualizada); // Responde com a postagem atualizada
    } catch (erro) {
        res.json({ mensagem: erro }); // Em caso de erro, responde com uma mensagem de erro
    }
});

// Rota para excluir uma postagem existente
router.delete('/:postId', async (req, res) => {
    try {
        const postagemRemovida = await Postagem.deleteOne({ _id: req.params.postId }); // Remove a postagem com o ID fornecido
        res.json(postagemRemovida); // Responde com a postagem removida
    } catch (erro) {
        res.json({ mensagem: erro }); // Em caso de erro, responde com uma mensagem de erro
    }
});

module.exports = router; // Exporta o roteador para uso em outros arquivos

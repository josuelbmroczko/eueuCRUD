////RODANDO AQUI http://localhost:3000/post
const express = require('express'); // Importa o Express para criar o servidor web
const mongoose = require('mongoose'); // Importa o Mongoose para lidar com o MongoDB
const aplicativo = express(); // Inicia uma instância do Express
const PORTA = process.env.PORTA || 3000; // Define a porta como 3000 ou a porta fornecida

aplicativo.use(express.json()); // Permite que o Express interprete JSON

// Conecta ao banco de dados MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.xkkpnka.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log("MongoDB conectado")) // Mensagem de sucesso na conexão
.catch(erro => console.log(erro)); // Mensagem de erro na conexão

// Adiciona uma rota raiz
aplicativo.get('/', (req, res) => {
    res.send('Bem-vindo à API de Postagens!'); // Mensagem de resposta para a rota raiz
});

// Usa as rotas definidas no arquivo `rotas/postes.js`
const rotasPosts = require('./rotas/postes'); // Corrige o caminho para 'rotas/postes'
aplicativo.use('/post', rotasPosts);

// Inicia o servidor Express na porta definida
aplicativo.listen(PORTA, () => {
    console.log(`Servidor está rodando na PORTA ${PORTA}`);
});

const UserRepository = require('../repository/UserRepository');
const UserValidator = require('../validators/UserValidator');
const jwt = require('jsonwebtoken');

class UserController {

    async index(req, res) {
        var users = await UserRepository.findAll();

        if (!users.status) {
            res.status(500);
            res.json({error: 'Falha ao carregar lista de usuários.'});
            return;
        }

        res.json(users.result);
    }

    async findUser(req, res) {
        var id = req.params.id;
        var user = await UserRepository.findById(id);

        if (user && !user.status) {
            res.status(500);
            res.json({error: 'Falha ao carregar dados.'});
            return;
        }

        if (!user) {
            res.status(404);
            res.json({});
            return;
        }

        res.status(200);
        res.json(user.result[0]);
    }

    async create(req, res) {
        var {nome, email, senha, nome_completo} = req.body;

        var errorMsg = UserValidator
            .fieldsValidate(nome, email, senha, nome_completo);

        if (errorMsg) {
            res.status(400);
            res.json({error: errorMsg});
            return;
        }

        var user = await UserRepository.findByEmail(email);
        if (user) {
            errorMsg = UserValidator
                .emailValidate(user.result[0], email); 
        }

        user = await UserRepository.findByName(nome);
        if (user) {
            errorMsg = UserValidator
                .nameValidate(user.result[0], email); 
        }

        if (errorMsg) {
            res.status(400);
            res.json({error: errorMsg});
            return;
        }

        //Criando novo usuário
        var result = await UserRepository
            .newUser(nome, email, senha, nome_completo);
        
        if (!result.status) {
            res.status(500);
            res.json({error: 'Falha ao cadastrar usuário.'});
            return;
        }
        
        res.status(201);
        res.json({success: 'Cadastro realizado com sucesso!'});
    }

    async edit(req, res) {
        var {id, nome, email, nome_completo} = req.body;

        var errorMsg = UserValidator
            .fieldsValidate(nome, email, nome_completo, id);

        if (errorMsg) {
            res.status(400);
            res.json({error: errorMsg});
            return;
        }

        var user = await UserRepository.findByEmail(email);
        if (user) {
            errorMsg = UserValidator
                .emailValidate(user.result[0], email, id); 
        }

        user = await UserRepository.findByName(nome);
        if (user) {
            errorMsg = UserValidator
                .nameValidate(user.result[0], email, id); 
        }

        var user = await UserRepository.findByName(nome);
        if (user) {
            errorMsg = UserValidator
                .nameValidate(user.result[0], email, id); 
        }

        if (errorMsg) {
            res.status(400);
            res.json({error: errorMsg});
            return;
        }

        var result = await UserRepository.update(id, nome, email, nome_completo);

        if (!result.status) {
            if (result.err) {
                res.status(400);
                res.json({error: result.err});
                return;
            }

            res.status(500);
            res.json({error: "Falha ao atualizar usuário."});
            return;
        }
        
        res.status(200);
        res.json({success: 'Atualização realizada com sucesso!'});
    }

    async remove(req, res) {
        var id = req.params.id;
        var result = await UserRepository.delete(id);

        if (!result.status) {
            if (result.err) {
                res.status(400);
                res.json({error: result.err});
                return;
            }

            res.status(500);
            res.json({error: "Falha ao excluir usuário."});
            return;
        }
        
        res.status(200);
        res.json({success: 'Exclusão realizada com sucesso!'});
    }

    async changePassword(req, res) {
        var {id, senha} = req.body;

        var result = await UserRepository.updatePassword(id, senha)

        if (!result.status) {
            if (result.err) {
                res.status(400);
                res.json({error: result.err});
                return;
            }

            res.status(500);
            res.json({error: "Falha ao atualizar senha."});
            return;
        }

        res.status(200);
        res.json({success: 'Senha atualizada com sucesso!'});
    }

    async login(req, res) {
        var {login, senha} = req.body;

        var result = await UserRepository.authenticate(login, senha);

        if (!result.status) {
            if (result.err) {
                res.status(400);
                res.json({error: result.err});
                return;
            }

            res.status(500);
            res.json({error: "Falha ao logar."});
            return;
        }
        
        const user = {
            id: result.user.id,
            nome: result.user.nome,
            email: result.user.email
        };

        res.status(200);
        res.set('x-access-token', result.token);
        res.json({user: user});
    }

}

module.exports = new UserController();
const knex = require('../config/dataBase/connection');
const bcrypt = require('bcrypt');
const tokenService = require('../services/tokenService');

class UserRepository {
    
    async findAll() {
        try {
            var result = await knex.select(
                "id", "nome", "email", 
                "nome_completo", "data_cadastro"
            ).table("usuarios");

            return {status: true, result};

        } catch (error) {
            return {status: false, error};
        }
    }

    async findById(id) {
        try {
            var result = await knex.select(
                "id", "nome", "email", 
                "nome_completo", "data_cadastro"
            ).table("usuarios")
            .where({id: id});

            if (result.length > 0) {
                return {status: true, result};
            }

        } catch (error) {
            return {status: false, error};
        }
    }

    async findByEmail(email) {
        try {
            var result = await knex.select(
                "id", "nome", "email", "senha",
                "nome_completo", "data_cadastro"
            ).table("usuarios")
            .where({email: email});

            if (result.length > 0) {
                return {status: true, result};
            }

        } catch (error) {
            return {status: false, error};
        }
    }

    async findByName(nome) {
        try {
            var result = await knex.select(
                "id", "nome", "email", "senha",
                "nome_completo", "data_cadastro"
            ).table("usuarios")
            .where({nome: nome});

            if (result.length > 0) {
                return {status: true, result};
            }

        } catch (error) {
            return {status: false, error};
        }
    }

    async newUser (nome, email, senha, nome_completo) {
        try {
            //criptografando a senha
            var hash = await bcrypt.hash(senha, 10);

            await knex.insert({
                nome, 
                email, 
                senha: hash, 
                nome_completo, 
                data_cadastro: new Date()
            }).table('usuarios');

            return {status: true};

        } catch (error) {
            return {status: false, error};
        }
    }

    async update(id, nome, email, nome_completo) {
        var user = await this.findById(id);

        if (!user) {
            return {status: false, err: "Usuário não cadastrado."}
        }
        
        var editUser = {};

        if (nome) {
            editUser.nome = nome;
        }

        if (email) {
            editUser.email = email;
        }

        if (nome_completo) {
            editUser.nome_completo = nome_completo;
        }

        try {
            await knex.update(editUser).where({id: id}).table('usuarios');
            return {status: true};
        } catch (error) {
            return {status: false, error};
        }
    }

    async delete(id) {
        var user = await this.findById(id);

        if (!user) {
            return {status: false, err: "Usuário não cadastrado."}
        }

        try {
            await knex.delete().where({id: id}).table("usuarios");
            return {status: true};
        } catch (error) {
            return {status: false, error};
        }
    }

    async updatePassword(id, novaSenha) {
        var user = await this.findById(id);

        if (!user) {
            return {status: false, err: "Usuário não cadastrado."}
        }

        var hash = await bcrypt.hash(novaSenha, 10);

        try {
            await knex.update({senha: hash}).where({id: id}).table('usuarios');
            return {status: true};
        } catch (error) {
            return {status: false, error};
        }
    }

    async authenticate(login, senha) {
        try {
            var user = undefined;

            if (!login) {
                return {status: false, err: "Informe o login e a senha."}
            }

            if (login) {
                user = await this.findByName(login);
            }

            if (!user) {
                user = await this.findByEmail(login);
            }
            
            user = user.result[0];
            var result = undefined;
            var token = undefined;

            if (user) {
                result = await bcrypt.compare(senha, user.senha);

                if (result) {
                    token = tokenService.getToken(user);
                }
            }
    
            if (!user || !result) {
                return {status: false, err: "Login ou senha incorretos."}
            }
            
            return {status: true, token: token, user: user};
        } catch (error) {
            return {status: false, error};
        }

    }

}

module.exports = new UserRepository();
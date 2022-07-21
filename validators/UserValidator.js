class UserValidator {

    fieldsValidate(nome, email, nome_completo, id = undefined, senha = undefined) {
        var msg = undefined;

        if (!nome || !nome.trim().length) {
            msg = 'O campo nome é obrigatório.';
        } 

        if (!email || !email.trim().length) {
            msg = 'O campo e-mail é obrigatório.';
        }

        if (!id && (!senha || !senha.trim().length)) {
            msg = 'O campo senha é obrigatório.';
        }

        if (!nome_completo || !nome_completo.trim().length) {
            msg = 'O campo nome completo é obrigatório.';
        }

        return msg;

    }

    emailValidate(user, email, id = undefined) {
        if (user && email) {
            if ((user && !id) 
                || (user.email == email && user.id != id)) {

                return 'E-mail já cadastrado!';
            }
        }

        return undefined;
    }

    nameValidate(user, nome, id = undefined) {
        if (user && nome) {
            if ((user && !id) 
                || (user.nome == nome && user.id != id)) {

                return 'Nome já cadastrado!';
            }
        }

        return undefined;
    }

}

module.exports = new UserValidator();
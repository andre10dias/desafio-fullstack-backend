class VehicleValidator{

    fieldsValidate(modelo, total_vendas, conectado, atualizacao_software) {
        var msg = undefined;

        if (!modelo || !modelo.trim().length) {
            msg = 'O campo modelo é obrigatório.';
        } 

        if (!total_vendas) {
            msg = 'O campo total de vendas é obrigatório.';
        }

        if (!conectado) {
            msg = 'O campo conectado é obrigatório.';
        }
        
        if (!atualizacao_software) {
            msg = 'O campo atualização software é obrigatório.';
        }

        return msg;

    }

}

module.exports = new VehicleValidator();
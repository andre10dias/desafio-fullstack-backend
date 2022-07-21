var knex = require('../config/dataBase/connection');

class Vehicle {

    async findAll(model) {
        var result;
        try {
            if (model) {
                result = await knex.select("*")
                    .table("veiculos")
                    .where("modelo", "like", `%${model}%`);
            } else {
                result = await knex.select("*")
                    .table("veiculos");
            }

            return {status: true, result};

        } catch (error) {
            return {status: false, error};
        }
    }

    async findById(id) {
        try {
            var result = await knex.select("*").table("veiculos")
            .where({id: id});

            if (result.length > 0) {
                return {status: true, result};
            }

        } catch (error) {
            return {status: false, error};
        }
    }

    async newVehicle (modelo, total_vendas, conectado, atualizacao_software) {
        try {
            await knex.insert({
                modelo, 
                total_vendas, 
                conectado, 
                atualizacao_software
            }).table('veiculos');

            return {status: true};

        } catch (error) {
            return {status: false, error};
        }
    }

    async update(id, modelo, total_vendas, conectado, atualizacao_software) {
        var vehicle = await this.findById(id);

        if (!vehicle) {
            return {status: false, err: "Veículo não cadastrado."}
        }
        
        var editVehicle = {};

        if (modelo) {
            editVehicle.modelo = modelo;
        }

        if (total_vendas) {
            editVehicle.total_vendas = total_vendas;
        }

        if (conectado) {
            editVehicle.conectado = conectado;
        }

        if (atualizacao_software) {
            editVehicle.atualizacao_software = atualizacao_software;
        }

        try {
            await knex.update(editVehicle).where({id: id}).table('veiculos');
            return {status: true};
        } catch (error) {
            return {status: false, error};
        }
    }

    async delete(id) {
        var vehicle = await this.findById(id);

        if (!vehicle) {
            return {status: false, err: "Veículo não cadastrado."}
        }

        try {
            await knex.delete().where({id: id}).table("veiculos");
            return {status: true};
        } catch (error) {
            return {status: false, error};
        }
    }

}

module.exports = new Vehicle();
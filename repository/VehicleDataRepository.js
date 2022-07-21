var knex = require('../config/dataBase/connection');

class VehicleData {

    async findAll(vin) {
        try {
            var result;

            if (vin) {
                result = await knex.select("*")
                    .table("dados_veiculos")
                    .where("vin", "like", `%${vin}%`);
            } else {
                result = await knex.select("*")
                    .table("dados_veiculos");
            }

            return {status: true, result};

        } catch (error) {
            return {status: false, error};
        }
    }

    async findById(id) {
        try {
            var result = await knex.select("*").table("dados_veiculos")
                .where({id: id});

            if (result.length > 0) {
                return {status: true, result};
            }

        } catch (error) {
            return {status: false, error};
        }
    }

    async newVehicleData(dataVehicle) {
        try {
            await knex.insert(dataVehicle).table('dados_veiculos');
            return {status: true};

        } catch (error) {
            return {status: false, error};
        }
    }

    async update(dataVehicle) {

        var data = await this.findById(dataVehicle.id);

        if (!data) {
            return {status: false, err: "Dados não cadastrados."}
        }

        try {
            await knex.update(dataVehicle).where({id: dataVehicle.id})
                .table('dados_veiculos');
            return {status: true};
        } catch (error) {
            return {status: false, error};
        }
    }

    async delete(id) {
        var vehicleData = await this.findById(id);

        if (!vehicleData) {
            return {status: false, err: "Dados não cadastrados."}
        }

        try {
            await knex.delete().where({id: id}).table("dados_veiculos");
            return {status: true};
        } catch (error) {
            return {status: false, error};
        }
    }

}

module.exports = new VehicleData();
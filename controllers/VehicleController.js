const VehicleRepository = require('../repository/VehicleRepository');
const VehicleValidator = require('../validators/VehicleValidator');

class VehicleController {

    async index(req, res) {
        var { modelo } = req.query;
        var vehicle = await VehicleRepository.findAll(modelo);

        if (!vehicle.status) {
            res.status(500);
            res.json({error: 'Falha ao carregar lista de veículos.'});
            return;
        }

        const result = {vehicles: vehicle.result};

        res.status(200);
        res.json(result);
    }

    async findVehicle(req, res) {
        var id = req.params.id;
        var vehicle = await VehicleRepository.findById(id);

        if (vehicle && !vehicle.status) {
            res.status(500);
            res.json({error: 'Falha ao carregar dados.'});
            return;
        }

        if (!vehicle) {
            res.status(404);
            res.json({});
            return;
        }

        const result = {vehicles: vehicle.result[0]};

        res.status(200);
        res.json(result);
    }

    async create(req, res) {
        var {modelo, total_vendas, conectado, atualizacao_software} = req.body;

        var errorMsg = VehicleValidator
            .fieldsValidate(modelo, total_vendas, conectado, atualizacao_software);

        if (errorMsg) {
            res.status(400);
            res.json({error: errorMsg});
            return;
        }
        
        var result = await VehicleRepository
            .newVehicle(modelo, total_vendas, conectado, atualizacao_software);
        
        if (!result.status) {
            res.status(500);
            res.json({error: 'Falha ao cadastrar veículo.'});
            return;
        }
        
        res.status(201);
        res.json({success: 'Cadastro realizado com sucesso!'});
    }

    async edit(req, res) {
        var {id, modelo, total_vendas, conectado, atualizacao_software} = req.body;

        var errorMsg = VehicleValidator
            .fieldsValidate(modelo, total_vendas, conectado, atualizacao_software);

        if (errorMsg) {
            res.status(400);
            res.json({error: errorMsg});
            return;
        }

        var result = await VehicleRepository.update(id, modelo, total_vendas, 
            conectado, atualizacao_software);

        if (!result.status) {
            if (result.err) {
                res.status(400);
                res.json({error: result.err});
                return;
            }

            res.status(500);
            res.json({error: "Falha ao atualizar veículo."});
            return;
        }
        
        res.status(200);
        res.json({success: 'Atualização realizada com sucesso!'});
    }

    async remove(req, res) {
        var id = req.params.id;
        var result = await VehicleRepository.delete(id);

        if (!result.status) {
            if (result.err) {
                res.status(400);
                res.json({error: result.err});
                return;
            }

            res.status(500);
            res.json({error: "Falha ao excluir veículo."});
            return;
        }
        
        res.status(200);
        res.json({success: 'Exclusão realizada com sucesso!'});
    }

}

module.exports = new VehicleController();
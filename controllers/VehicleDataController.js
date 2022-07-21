const VehicleDataRepository = require('../repository/VehicleDataRepository');
const VehicleDataValidator = require('../validators/VehicleDataValidator');

class DataVehicleController {

    async index(req, res) {
        var { vin } = req.query;
        var vehicleData = await VehicleDataRepository.findAll(vin);

        if (!vehicleData.status) {
            res.status(500);
            res.json({error: 'Falha ao carregar lista de dados.'});
            return;
        }

        const result = {vehicleData: vehicleData.result};

        res.status(200);
        res.json(result);
    }

    async findVehicleData(req, res) {
        var id = req.params.id;
        var vehicleData = await VehicleDataRepository.findById(id);

        if (vehicleData && !vehicleData.status) {
            res.status(500);
            res.json({error: 'Falha ao carregar dados.'});
            return;
        }

        if (!vehicleData) {
            res.status(404);
            res.json({});
            return;
        }

        const result = {vehicleData: vehicleData.result[0]};

        res.status(200);
        res.json(result);
    }

    async create(req, res) {
        const dataVehicle = {
            vin: req.body.vin, 
            odometro: req.body.odometro, 
            pressao_pneus: req.body.pressao_pneus, 
            status_veiculo: req.body.status_veiculo, 
            status_bateria: req.body.status_bateria, 
            nivel_combustivel: req.body.nivel_combustivel, 
            latitude: req.body.latitude, 
            longitude: req.body.longitude
        }

        var errorMsg = VehicleDataValidator
            .fieldsValidate(dataVehicle);

        if (errorMsg) {
            res.status(400);
            res.json({error: errorMsg});
            return;
        }
        
        var result = await VehicleDataRepository
            .newVehicleData(dataVehicle);
        
        if (!result.status) {
            res.status(500);
            res.json({error: 'Falha ao cadastrar dados.'});
            return;
        }
        
        res.status(201);
        res.json({success: 'Cadastro realizado com sucesso!'});
    }

    async edit(req, res) {
        const dataVehicle = {
            id: req.body.id, 
            vin: req.body.vin, 
            odometro: req.body.odometro, 
            pressao_pneus: req.body.pressao_pneus, 
            status_veiculo: req.body.status_veiculo, 
            status_bateria: req.body.status_bateria, 
            nivel_combustivel: req.body.nivel_combustivel, 
            latitude: req.body.latitude, 
            longitude: req.body.longitude
        }

        var errorMsg = VehicleDataValidator
            .fieldsValidate(dataVehicle);

        if (errorMsg) {
            res.status(400);
            res.json({error: errorMsg});
            return;
        }

        var result = await VehicleDataRepository.update(dataVehicle);

        if (!result.status) {
            if (result.err) {
                res.status(400);
                res.json({error: result.err});
                return;
            }

            res.status(500);
            res.json({error: "Falha ao atualizar dados."});
            return;
        }
        
        res.status(200);
        res.json({success: 'Atualização realizada com sucesso!'});
    }

    async remove(req, res) {
        var id = req.params.id;
        var result = await VehicleDataRepository.delete(id);

        if (!result.status) {
            if (result.err) {
                res.status(400);
                res.json({error: result.err});
                return;
            }

            res.status(500);
            res.json({error: "Falha ao excluir dados."});
            return;
        }
        
        res.status(200);
        res.json({success: 'Exclusão realizada com sucesso!'});
    }

}

module.exports = new DataVehicleController();
class VehicleDataValidator{

    fieldsValidate(dataVehicle) {

        var msg = undefined;

        if (!dataVehicle.vin || !dataVehicle.vin.trim().length) {
            msg = 'O campo vin é obrigatório.';
        } 

        if (!dataVehicle.odometro) {
            msg = 'O campo odometro é obrigatório.';
        }

        if (!dataVehicle.pressao_pneus || !dataVehicle.pressao_pneus.trim().length) {
            msg = 'O campo pressao pneus é obrigatório.';
        }
        
        if (!dataVehicle.status_veiculo || !dataVehicle.status_veiculo.trim().length) {
            msg = 'O campo status veiculo é obrigatório.';
        }

        if (!dataVehicle.status_bateria || !dataVehicle.status_bateria.trim().length) {
            msg = 'O campo status bateria é obrigatório.';
        }

        if (!dataVehicle.nivel_combustivel) {
            msg = 'O campo nível combustível é obrigatório.';
        }

        if (!dataVehicle.latitude) {
            msg = 'O campo latitude é obrigatório.';
        }
        
        if (!dataVehicle.longitude) {
            msg = 'O campo longitude é obrigatório.';
        }

        return msg;

    }

}

module.exports = new VehicleDataValidator();
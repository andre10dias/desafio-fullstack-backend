class HomeController{
    async index(req, res){
        res.send("API rodando...");
    }
}

module.exports = new HomeController();
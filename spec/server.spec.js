var request = require("request");

var idNovoPlaneta;

describe("API Planetas", () => {


    describe("api/planeta post", () => {

        it("Deve inserir planeta no banco", (done) => {

            let planetaTeste = {
                "nome": "Nome Teste 02",
                "clima": "Clima Teste 01",
                "terreno": "Terreno teste 01",
            }

            request.post("http://localhost:3000/api/planeta", { json: true, body: planetaTeste }, (err, res) => {

                let novoPlaneta = res.body;
                idNovoPlaneta = novoPlaneta._id;
                console.log();
                expect(res.statusCode).toEqual(201);
                done();

            })
        })//Deve retornar 200 OK


    })

    describe("api/planeta get", () => {


        it("Deve retornar 200 OK", (done) => {

            request.get("http://localhost:3000/api/planeta", (err, res) => {
                expect(res.statusCode).toEqual(200);

                done();

            })
        })//Deve retornar 200 OK

        it("Deve retornar um lista com itens", (done) => {

            request.get("http://localhost:3000/api/planeta", (err, res) => {
                expect(JSON.parse(res.body).length).toBeGreaterThan(0);

                done();

            })
        })//Deve retornar um lista com itens

    })

    


})
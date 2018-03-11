import mongoose from 'mongoose';
import { PlanetaSchema } from '../models/modelPlaneta';

const Planeta = mongoose.model('Planeta', PlanetaSchema);
const swapi = require('swapi-node');

const defaultSelect = 'nome clima terreno totalAparicoesFilmes';


export const addPlaneta = (req, res) => {
    let newPlaneta = new Planeta(req.body);

    Planeta.findOne({ 'nome': req.body.nome }, (err, planeta) => {

        console.log(planeta);

        if (planeta) {

            res.statusCode = 409;
            res.json({
                message: `Planeta ${req.body.nome} já existe com id ${planeta._id}| Que a Força esteja com você.`
            });

        } else {
            newPlaneta.save((err, planeta) => {
                if (err) {
                    res.statusCode = 412;
                    res.send(err);
                }
                res.statusCode = 201;
                res.json(planeta)

                updateAparicoesFilmes(planeta);

            })
        }

    });




};

export const getPlanetas = (req, res) => {

    Planeta.find({}, defaultSelect, (err, listaPlanetas) => {
        if (err) {
            res.send(err);
        }
        res.json(listaPlanetas);
    });
};


export const updatePlaneta = (req, res) => {
    Planeta.findOneAndUpdate(
        { _id: req.params.planetaId },
        req.body,
        { new: true },
        (err, planeta) => {
            if (err) {
                res.send(err);
            }

            if (planeta) {
                res.json(planeta);
            } else {
                res.json({
                    message: 'Planeta não encontrado. Verifique o os dados enviandos e tente novamente | Que a Força esteja com você.'
                });
            }
        }
    )
};

export const deletePlaneta = (req, res) => {

    Planeta.findById({ _id: req.params.planetaId }, function (err, planeta) {

        console.log(planeta);

        if (!planeta) {
            res.json({
                message: `ID ${req.params.planetaId} não existe | Que a Força esteja com você.`
            });

        } else {
            Planeta.remove({ _id: req.params.planetaId }, (err, planeta) => {
                if (err) {
                    res.send(err);
                }
                res.statusCode = 201;
                res.json({
                    message: 'Excluido com sucesso'
                });
            })
        }




    })





}

export const getPlanetaById = (req, res) => {
    Planeta.findById({ "_id": req.params.planetaId }, (err, planeta) => {


        if (planeta) {
            res.json(planeta);
        } else {
            res.status(404);
            res.json({
                message: 'Planeta não encontrado. Verifique o ID e tente novamente. Lembre: O nome é case-sensitive | Que a Força esteja com você.'
            });
        }





    })
}

export const getPlanetaByNome = (req, res) => {
    Planeta.findOne({ 'nome': req.params.planetaNome }, (err, planeta) => {
        if (err) {
            res.send(err);
        } else {
            if (planeta) {
                res.json(planeta);
            } else {
                res.status(404);
                res.json({
                    message: 'Planeta não encontrado. Verifique o nome e tente novamente. Lembre: O nome é case-sensitive | Que a Força esteja com você.'
                });
            }
        }


    })
}

var updateAparicoesFilmes = (planeta) => {
    swapi.get(`http://swapi.co/api/planets/?search=${planeta.nome}`).then((swapiResult) => {
        if (swapiResult.count == 1) {
            let totalAparicoes = swapiResult.results[0].films.length;
            Planeta.findByIdAndUpdate(planeta._id, { $set: { totalAparicoesFilmes: totalAparicoes } }, { new: true }, (err, res) => {
                if (err) {
                    console.log(err)
                }
                console.log(res);
            });
        }
    });
}


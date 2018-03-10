import mongoose from 'mongoose';
import { PlanetaSchema } from '../models/modelPlaneta';

const Planeta = mongoose.model('Planeta', PlanetaSchema);
const swapi = require('swapi-node');

const defaultSelect = 'nome clima terreno totalAparicoesFilmes';


export const addPlaneta = (req, res) => {
    let newPlaneta = new Planeta(req.body);

    newPlaneta.save((err, planeta) => {
        if (err) {
            res.statusCode = 412;
            res.send(err);
        }
        res.json(planeta)

        swapi.get(`http://swapi.co/api/planets/?search=${planeta.nome}`).then((swapiResult) => {

        console.log(planeta);

            if(swapiResult.count == 1){

                let totalAparicoes = swapiResult.results[0].films.length;
                console.log(totalAparicoes);

                Planeta.findByIdAndUpdate(planeta._id, { $set: { totalAparicoesFilmes: totalAparicoes }}, {new: true}, (err, res) => {
                    if(err){
                        console.log(err)
                    }
                    console.log(res);
                });
               
            }

            

        });

    })

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
            res.json(planeta);
        }
    )
};

export const deletePlaneta = (req, res) => {
    Planeta.remove({ _id: req.params.planetaId }, (err, mobile) => {
        if (err) {
            res.send(err);
        }
        res.json({
            message: 'Excluido com sucesso'
        });
    })
}


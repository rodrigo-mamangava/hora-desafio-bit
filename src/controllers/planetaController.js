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

        updateAparicoesFilmes(planeta);

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

            if(planeta){
                res.json(planeta);
            }else{
                res.status(404);
                res.json({
                    mensagem: 'Planeta não encontrado. Verifique o os dados enviandos e tente novamente | Que a Força esteja com você.'
                });
            }
        }
    )
};

export const deletePlaneta = (req, res) => {
    Planeta.remove({ _id: req.params.planetaId }, (err, planeta) => {
        if (err) {
            res.send(err);
        }
        res.json({
            message: 'Excluido com sucesso'
        });
    })
}

export const getPlanetaById = (req, res) => {
    Planeta.findById({ _id: req.params.planetaId }, (err, planeta) => {
        if (err) {
            res.send(err);
        }
        res.json(planeta);
    })
}

export const getPlanetaByNome = (req, res) => {
    Planeta.findOne({ 'nome': req.params.planetaNome }, (err, planeta) => {
        if (err) {
            res.send(err);            
        }
        if(planeta){
            res.json(planeta);
        }else{
            res.status(404);
            res.json({
                mensagem: 'Planeta não encontrado. Verifique o nome e tente novamente. Lembre: O nome é case-sensitive | Que a Força esteja com você.'
            });
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


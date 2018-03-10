import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const PlanetaSchema = new Schema({
    nome: {
        type: String,
        required: 'nome é obrigatório'
    },
    clima: {
        type: String,
        required: 'clima é obrigatório'
    },
    terreno: {
        type: String,
        required: 'terreno é obrigatório'
    },
    totalAparicoesFilmes: {
        type: Number
    }
});


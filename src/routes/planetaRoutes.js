import {
    addPlaneta,
    getPlanetas,
    updatePlaneta,
    deletePlaneta,
    getPlanetaById,
    getPlanetaByNome
} from '../controllers/planetaController';

const routes = (app) => {

    //planeta
    app.route('/api/planeta')
        .get(getPlanetas)
        .post(addPlaneta);

    app.route('/api/planeta/:planetaId')
        .put(updatePlaneta)
        .delete(deletePlaneta)
        .get(getPlanetaById);

    app.route('/api/planeta/nome/:planetaNome')
        .get(getPlanetaByNome);
}

export default routes
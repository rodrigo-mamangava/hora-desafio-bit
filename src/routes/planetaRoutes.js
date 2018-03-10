import {
    addPlaneta,
    getPlanetas,
    updatePlaneta,
    deletePlaneta
} from '../controllers/planetaController';

const routes = (app) => {

    //planeta
    app.route('/api/planeta')
        .get(getPlanetas)
        .post(addPlaneta);

    app.route('/api/planeta/:planetaId')
        .put(updatePlaneta)
        .delete(deletePlaneta);
}

export default routes
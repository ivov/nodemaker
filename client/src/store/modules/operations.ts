// @ts-nocheck

const state = {
    operations: [
        {
            key: 0,
            resource: "",
            name: "",
            description: "",
            endpoint: "",
            requestMethod: "",
            cancel: false
        }
      ]
};

const getters = {
    operations: (state: any) => {return state.operations},
    operationWithResourceNames: (state: any) => {
        const nameList: any = [];

        state.operations.forEach(operation => {
            nameList.push(operation.name + " : " + operation.resource);
        });

        return nameList;
    }
};

const actions = {
    addOperation({ commit }) {
        const operation = {
            key: state.operations.length,
            resource: "",
            name: "",
            description: "",
            endpoint: "",
            requestMethod: "",
            cancel: true
        };

        commit('pushToOperations', operation);
    },
};

const mutations = {
    pushToOperations: (state, operation) => state.operations.push(operation),
    submitOperations: (state, operations) => state.operations = operations,
};

export default {
    state,
    getters,
    actions,
    mutations
}

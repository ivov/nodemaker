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
    operationNames: (state: any) => {
        const nameList: any = [];

        state.operations.forEach(operation => {
            nameList.push(operation.name);
        });

        return nameList;
    },
    operationWithResourceNames: (state: any) => {
        const nameList: any = [];

        state.operations.forEach(operation => {
            nameList.push(operation.name + " : " + operation.resource);
        });

        return nameList;
    }
};

const actions = {
    submitOperations({ commit }, operations) {
        commit('submitOperations', operations);
    },
};

const mutations = {
    submitOperations: (state, operations) => state.operations = operations,
};

export default {
    state,
    getters,
    actions,
    mutations
}

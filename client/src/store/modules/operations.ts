const state: OperationsState = {
    operations: [
        {
            key: 0,
            resource: "",
            name: "",
            description: "",
            endpoint: "",
            //@ts-ignore for empty string
            requestMethod: "",
            cancel: false
        }
      ]
};

const getters = {
    operations: (state: OperationsState): FrontendOperation[] => {return state.operations},
    operationWithResourceNames: (state: OperationsState): string[] => {
        const nameList: string[] = [];

        state.operations.forEach(operation => {
            nameList.push(operation.name + " : " + operation.resource);
        });

        return nameList;
    }
};

const actions = {
    addOperation({ commit }: any) {
        const operation: FrontendOperation = {
            key: state.operations.length,
            resource: "",
            name: "",
            description: "",
            endpoint: "",
            //@ts-ignore for empty string
            requestMethod: "",
            cancel: true
        };

        commit('pushToOperations', operation);
    },
};

const mutations = {
    pushToOperations: (state: OperationsState, operation: FrontendOperation) => state.operations.push(operation),
    submitOperations: (state: OperationsState, operations: FrontendOperation[]) => state.operations = operations,
};

export default {
    state,
    getters,
    actions,
    mutations
}

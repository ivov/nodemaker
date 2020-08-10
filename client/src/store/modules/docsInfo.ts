// @ts-nocheck

const state = {
    docsInfo: {
        serviceUrl: "",
        introDescription: "",
        exampleUsage: "",
        workflowNumber: "",
    }
};

const getters = {
    docsInfo: (state: any) => {return state.docsInfo;}
};

const mutations = {
    submitDocsInfo: (state: any, info: any) => state.docsInfo = info,
};

export default {
    state,
    getters,
    mutations
}


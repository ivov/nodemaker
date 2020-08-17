const state: DocsInfoState = {
    docsInfo: {
        serviceName: "",
        serviceUrl: "",
        introDescription: "",
        exampleUsage: "",
        workflowUrl: "",
    }
};

const getters = {
    docsInfo: (state: DocsInfoState): DocsParameters => {return state.docsInfo;}
};

const mutations = {
    submitDocsInfo: (state: DocsInfoState, info: DocsParameters) => state.docsInfo = info,
};

export default {
    state,
    getters,
    mutations
}


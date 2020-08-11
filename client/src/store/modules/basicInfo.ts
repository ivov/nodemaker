// @ts-nocheck

const state = {
    basicInfo: {
        name: "",
        auth: "",
        color: "",
        baseURL: "",
        webhookEndpoint: "",
    },
    nodeType: "",
    documentation: false,
};

const getters = {
    basicInfo: (state: any) => {return state.basicInfo;},
    nodeType: (state) => {return state.nodeType},
    documentation: (state) => {return state.documentation},
};

const mutations = {
    submitBasicInfo: (state: any, info: any) => state.basicInfo = info,
    setNodeType: (state, nodeType) => state.nodeType = nodeType,
    setDocumentation: (state, documentation) => state.documentation = documentation,
};

export default {
    state,
    getters,
    mutations
}


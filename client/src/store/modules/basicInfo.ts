const state: BasicInfoState = {
    basicInfo: {
        serviceName: "",
        //@ts-ignore because of the empty string
        authType: "",
        nodeColor: "",
        apiUrl: "",
        webhookEndpoint: "",
    },
    nodeType: "",
    documentation: false,
};

const getters = {
    basicInfo: (state: BasicInfoState): BasicInfo => {return state.basicInfo;},
    nodeType: (state: BasicInfoState): FrontendNodeType => {return state.nodeType},
    documentation: (state: BasicInfoState): boolean => {return state.documentation},
};

const mutations = {
    submitBasicInfo: (state: BasicInfoState, info: BasicInfo) => state.basicInfo = info,
    setNodeType: (state: BasicInfoState, nodeType: FrontendNodeType) => state.nodeType = nodeType,
    setDocumentation: (state: BasicInfoState, documentation: boolean) => state.documentation = documentation,
};

export default {
    state,
    getters,
    mutations
}


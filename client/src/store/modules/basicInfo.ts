const state = {
    basicInfo: {
        name: "",
        auth: "",
        color: "",
        baseURL: "",
        tester: "",
    }
};

const getters = {
    basicInfo: (state: any) => {return state.basicInfo;}
};

const actions = {
    submitBasicInfo({ commit }, info) {
        commit('submitBasicInfo', info);
    },
};

const mutations = {
    submitBasicInfo: (state, info) => state.basicInfo = info,
};

export default {
    state,
    getters,
    actions,
    mutations
}


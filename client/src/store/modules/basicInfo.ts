// @ts-nocheck

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
    submitBasicInfo({ commit }, info: any) {
        commit('submitBasicInfo', info);
    },
};

const mutations = {
    submitBasicInfo: (state: any, info: any) => state.basicInfo = info,
};

export default {
    state,
    getters,
    actions,
    mutations
}


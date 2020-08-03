const state = {
    resources: [ 
        {
            key: 0,
            text: "",
            cancel: false
        }
    ]
};

const getters = {
    resources: (state: any) => {return state.resources},
    resourceNames: (state: any) => {
        const nameList: any = [];

        state.resources.forEach(resource => {
            nameList.push(resource.text);
        });

        return nameList;
    }
};

const actions = {
    submitResources({ commit }, resources) {
        commit('submitResources', resources);
    },
};

const mutations = {
    submitResources: (state, resources) => state.resources = resources,
};

export default {
    state,
    getters,
    actions,
    mutations
}


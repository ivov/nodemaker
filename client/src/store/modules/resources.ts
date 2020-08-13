// @ts-nocheck

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
    addResource({ commit }) {
        const resource = {
          key: state.resources.length,
          text: "",
          cancel: true
        };
  
        commit('pushToResources', resource);
      },
};

const mutations = {
    pushToResources: (state, resource) => state.resources.push(resource),
    submitResources: (state, resources) => state.resources = resources,
};

export default {
    state,
    getters,
    actions,
    mutations
}


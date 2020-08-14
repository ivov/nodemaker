const state: ResourcesState = {
    resources: [ 
        {
            key: 0,
            text: "",
            cancel: false
        }
    ]
};

const getters = {
    resources: (state: ResourcesState): FrontendResource[] => {return state.resources},
    resourceNames: (state: ResourcesState): string[] => {
        const nameList: string[] = [];

        state.resources.forEach(resource => {
            nameList.push(resource.text);
        });

        return nameList;
    }
};

const actions = {
    addResource({ commit }: any) {
        const resource: FrontendResource = {
          key: state.resources.length,
          text: "",
          cancel: true
        };
  
        commit('pushToResources', resource);
      },
};

const mutations = {
    pushToResources: (state: ResourcesState, resource: FrontendResource) => state.resources.push(resource),
    submitResources: (state: ResourcesState, resources: FrontendResource[]) => state.resources = resources,
};

export default {
    state,
    getters,
    actions,
    mutations
}


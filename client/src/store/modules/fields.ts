const state = {
    fields: [
        {
          key: 0,
          resourceOperation: [
            {
              key: 0,
              value: "",
              add: true,
              cancel: false
            }
          ],
          type: "",
          name: "",
          description: "",
          default: ""
        }
      ]
};

const getters = {
    fields: (state: any) => {return state.fields},
};

const actions = {
    submitFields({ commit }, fields) {
        commit('submitFields', fields);
    },
};

const mutations = {
    pushToResourceOperation: (state, { newObj, key }) => state.fields[key].resourceOperation.push(newObj),
    submitResourceOperation: (state, { newObj, fieldKey }) => state.fields[fieldKey].resourceOperation = newObj,
    pushToFields: (state, field) => state.fields.push(field),
    submitFields: (state, fields) => state.fields = fields,
};

export default {
    state,
    getters,
    actions,
    mutations
}



import Vue from 'vue';

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
    fields: (state) => {return state.fields; },
};

const actions = {
    createOption({ commit }, fieldKey) {
      const option = {
        name: "",
        description: "",
        key: 0,
        add: true,
        cancel: false
      };

      commit('createOption', { fieldKey, option });
    },
    submitFields({ commit }, fields) {
        commit('submitFields', fields);
    },
};

const mutations = {
    pushToResourceOperation: (state, { newObj, key }) => state.fields[key].resourceOperation.push(newObj),
    submitResourceOperation: (state, { newObj, fieldKey }) => state.fields[fieldKey].resourceOperation = newObj,
    createOption: (state, { fieldKey, option }) => Vue.set(state.fields[fieldKey], 'options', [option]),
    pushOption: (state, { fieldKey, option}) => state.fields[fieldKey].options.push(option),
    submitOptions: (state, { fieldKey, newObj }) => state.fields[fieldKey].options = newObj,
    pushToFields: (state, field) => state.fields.push(field),
    submitFields: (state, fields) => state.fields = fields,
};

export default {
    state,
    getters,
    actions,
    mutations
}



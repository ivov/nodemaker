// @ts-nocheck

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
    fields: (state: any) => {return state.fields;},
};

const actions = {
    createOption({ commit }, fieldKey: any) {
      const option = {
        name: "",
        description: "",
        key: 0,
        add: true,
        cancel: false
      };

      commit('createOption', { fieldKey, option });
    },
    createInnerOption({ commit }, { fieldKey, optionKey }) {
      const option = {
        name: "",
        description: "",
        key: 0,
        add: true,
        cancel: false
      };

      commit('createInnerOption', { fieldKey, optionKey, option });
    },
    createCollectionOption({ commit }, fieldKey: any) {
      const option = {
        key: 0,
        type: "",
        name: "",
        description: "",
        default: "",
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

    createInnerOption: (state, { fieldKey, optionKey, option }) => Vue.set(state.fields[fieldKey].options[optionKey], 'options', [option]),
    pushInnerOption: (state, { fieldKey, optionKey, option }) => state.fields[fieldKey].options[optionKey].options.push(option),
    submitInnerOptions: (state, { fieldKey, optionKey, newObj }) => state.fields[fieldKey].options[optionKey].options = newObj,

    pushToFields: (state, field) => state.fields.push(field),
    submitFields: (state, fields) => state.fields = fields,
};

export default {
    state,
    getters,
    actions,
    mutations
}



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
  addField({ commit }) {
    const field = {
        key: state.fields.length,
        resourceOperation: [
          {
            key: 0,
            value: "",
            resource: "",
            operation: "",
            add: true,
            cancel: false
          }
        ],
        type: "",
        name: "",
        description: "",
        default: "",
        cancel: true
      };

      commit('pushToFields', field);
    },
    addResourceOperation({ commit }, key) {
      const newObj = {
        key: state.fields[key].resourceOperation.length,
        text: "",
        add: false,
        cancel: true
      };

      commit('pushToResourceOperation', { newObj, key });
    },
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
    addOption({ commit }, fieldKey) {
      const option = {
        name: "",
        description: "",
        key: state.fields[fieldKey].options.length,
        add: false,
        cancel: true
      };

      commit('pushOption', { fieldKey, option });
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
    addInnerOption({ commit }, { fieldKey, optionKey }) {
      const option = {
        name: "",
        description: "",
        key: state.fields[fieldKey].options[optionKey].options.length,
        add: false,
        cancel: true
      };

      commit('pushInnerOption', { fieldKey, optionKey, option });
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
    addCollectionOption({ commit }, fieldKey) {
      const option = {
        key: this.fields[fieldKey].options.length,
        type: "",
        name: "",
        description: "",
        default: "",
        add: false,
        cancel: true
      };

      commit('pushOption', { fieldKey, option });
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



// @ts-nocheck

import Vue from 'vue';

const state = {
    properties: [
        {
            key: 0,
            displayName: "",
            required: false,
            description: "",
            type: "",
            default: "",
          }
      ]
};

const getters = {
    properties: (state: any) => {return state.properties},
    propertyNames: (state: any) => {
        let names = [];

        state.properties.forEach(property => {
            if(property.options !== undefined) {
                property.options.forEach(option => {
                    names.push(property.displayName + " : " + option.name);
                });
            }
        });

        return names;
    }
};

const actions = {
    createPropertyOption({ commit }, propertyKey: any) {
        const option = {
            name: "",
            description: "",
            key: 0,
            add: true,
            cancel: false
        };

        commit('createPropertyOption', { propertyKey, option });
    },
    addProperty({ commit }) {
        const property = {
            key: state.properties.length,
            resource: "",
            name: "",
            description: "",
            endpoint: "",
            requestMethod: "",
            default: "",
            cancel: true
        };

        commit('pushProperty', property);
    },
    addPropertyOption({ commit }, propertyKey) {
        const option = {
          name: "",
          description: "",
          key: state.properties[propertyKey].options.length,
          add: false,
          cancel: true
        };
  
        commit('pushPropertyOption', { propertyKey, option });
    },
};

const mutations = {
    toggleRequired: (state, { propertyKey, newValue }) => Vue.set(state.properties[propertyKey], 'required', newValue),

    pushProperty: (state, property) => state.properties.push(property),
    submitProperties: (state, properties) => state.properties = properties,

    createPropertyOption: (state, { propertyKey, option }) => Vue.set(state.properties[propertyKey], 'options', [option]),
    pushPropertyOption: (state, { propertyKey, option}) => state.properties[propertyKey].options.push(option),
    submitPropertyOptions: (state, { propertyKey, newObj }) => state.properties[propertyKey].options = newObj,
};

export default {
    state,
    getters,
    actions,
    mutations
}

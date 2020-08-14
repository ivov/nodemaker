import Vue from 'vue';

const state: PropertyState = {
    properties: [
        {
            key: 0,
            displayName: "",
            required: false,
            description: "",
            //@ts-ignore for empty string
            type: "",
            default: "",
          }
      ]
};

const getters = {
    properties: (state: PropertyState): FrontendProperty[] => {return state.properties},
    propertyNames: (state: PropertyState): string[] => {
        let names: string[] = [];

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
    createPropertyOption({ commit }: any, propertyKey: number) {
        const option: OptionsOption = {
            name: "",
            description: "",
            key: 0,
            add: true,
            cancel: false
        };

        commit('createPropertyOption', { propertyKey, option });
    },
    addProperty({ commit }: any) {
        const property: FrontendProperty = {
            key: state.properties.length,
            resource: "",
            displayName: "",
            description: "",
            default: "",
            //@ts-ignore for empty string
            type: "",
            required: false,
            cancel: true
        };

        commit('pushProperty', property);
    },
    addPropertyOption({ commit }: any, propertyKey: number) {
        const option: WebhookPropertyOption = {
          name: "",
          description: "",
          //@ts-ignore
          key: state.properties[propertyKey].options.length,
          add: false,
          cancel: true
        };
  
        commit('pushPropertyOption', { propertyKey, option });
    },
};

const mutations = {
    toggleRequired: (state: PropertyState, { propertyKey, newValue }: { propertyKey: number; newValue: boolean}) => Vue.set(state.properties[propertyKey], 'required', newValue),

    pushProperty: (state: PropertyState, property: FrontendProperty) => state.properties.push(property),
    submitProperties: (state: PropertyState, properties: FrontendProperty[]) => state.properties = properties,

    createPropertyOption: (state: PropertyState, { propertyKey, option }: { propertyKey: number; option: WebhookPropertyOption }) => Vue.set(state.properties[propertyKey], 'options', [option]),
    //@ts-ignore will not be undefined
    pushPropertyOption: (state: PropertyState, { propertyKey, option}: { propertyKey: number; option: WebhookPropertyOption }) => state.properties[propertyKey].options.push(option),
    submitPropertyOptions: (state: PropertyState, { propertyKey, newObj }: { propertyKey: number; newObj: WebhookPropertyOption[] }) => state.properties[propertyKey].options = newObj,
};

export default {
    state,
    getters,
    actions,
    mutations
}

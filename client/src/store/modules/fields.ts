import Vue from 'vue';

const state: FieldsState = {
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
          //@ts-ignore for empty string
          type: "",
          name: "",
          description: "",
          required: false,
          default: ""
        }
      ]
};

const getters = {
    fields: (state: FieldsState): FrontendField[] => {return state.fields;},
};

const actions = {
  addField({ commit }: any) {
    const field: FrontendField = {
        key: state.fields.length,
        resourceOperation: [
          {
            key: 0,
            value: "",
            add: true,
            cancel: false
          }
        ],
        //@ts-ignore for empty string
        type: "",
        name: "",
        description: "",
        default: "",
        cancel: true
      };

      commit('pushToFields', field);
    },
    addResourceOperation({ commit }: any, key: number) {
      const newObj: AssociatedProps = {
        key: state.fields[key].resourceOperation.length,
        value: "",
        add: false,
        cancel: true
      };

      commit('pushToResourceOperation', { newObj, key });
    },
    createOption({ commit }: any, fieldKey: number) {
      const option: OptionsOption = {
        name: "",
        description: "",
        key: 0,
        add: true,
        cancel: false
      };

      commit('createOption', { fieldKey, option });
    },
    addOption({ commit }: any, fieldKey: number) {
      const option: OptionsOption = {
        name: "",
        description: "",
        //@ts-ignore because of optional chaining operator
        key: state.fields[fieldKey].options?.length,
        add: false,
        cancel: true
      };

      commit('pushOption', { fieldKey, option });
    },
    createInnerOption({ commit }: any, { fieldKey, optionKey }: { fieldKey: number; optionKey: number}) {
      const option: OptionsOption = {
        name: "",
        description: "",
        key: 0,
        add: true,
        cancel: false
      };

      commit('createInnerOption', { fieldKey, optionKey, option });
    },
    addInnerOption({ commit }: any, { fieldKey, optionKey }: { fieldKey: number; optionKey: number}) {
      const option: OptionsOption = {
        name: "",
        description: "",
        //@ts-ignore this will only be called on a CollectionOption
        key: state.fields[fieldKey]?.options[optionKey].options.length,
        add: false,
        cancel: true
      };

      commit('pushInnerOption', { fieldKey, optionKey, option });
    },
    createCollectionOption({ commit }: any, fieldKey: number) {
      const option: CollectionOption = {
        key: 0,
        //@ts-ignore for empty string
        type: "",
        name: "",
        description: "",
        default: "",
        add: true,
        cancel: false
      };

      commit('createOption', { fieldKey, option });
    },
    addCollectionOption({ commit }: any, fieldKey: number) {
      const option: CollectionOption = {
        key: state.fields[fieldKey].options.length,
        //@ts-ignore for empty string
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
    toggleFieldsRequired: (state: FieldsState, { fieldKey, newValue }: { fieldKey: number; newValue: boolean}) => Vue.set(state.fields[fieldKey], 'required', newValue),

    pushToResourceOperation: (state: FieldsState, { newObj, key }: { newObj: AssociatedProps; key: number}) => state.fields[key].resourceOperation.push(newObj),
    submitResourceOperation: (state: FieldsState, { newObj, fieldKey }: { newObj: AssociatedProps[]; fieldKey: number}) => state.fields[fieldKey].resourceOperation = newObj,

    createOption: (state: FieldsState, { fieldKey, option }: { fieldKey: number; option: FrontendOption}) => Vue.set(state.fields[fieldKey], 'options', [option]),
    pushOption: (state: FieldsState, { fieldKey, option} : { fieldKey: number; option: FrontendOption}) => state.fields[fieldKey].options.push(option),
    submitOptions: (state: FieldsState, { fieldKey, newObj }: { fieldKey: number; newObj: FrontendOption[]}) => state.fields[fieldKey].options = newObj,

    createInnerOption: (state: FieldsState, { fieldKey, optionKey, option }: { fieldKey: number; optionKey: number; option: OptionsOption}) => Vue.set(state.fields[fieldKey].options[optionKey], 'options', [option]),
    //@ts-ignore because this will always be a CollectionOption and the error is caused by OptionsOption
    pushInnerOption: (state: FieldsState, { fieldKey, optionKey, option }: { fieldKey: number; optionKey: number; option: OptionsOption}) => state.fields[fieldKey].options[optionKey].options.push(option),
    //@ts-ignore because this will always be a CollectionOption and the error is caused by OptionsOption
    submitInnerOptions: (state: FieldsState, { fieldKey, optionKey, newObj }: { fieldKey: number; optionKey: number; newObj: OptionsOption[]}) => state.fields[fieldKey].options[optionKey].options = newObj,

    pushToFields: (state: FieldsState, field: FrontendField) => state.fields.push(field),
    submitFields: (state: FieldsState, fields: FrontendField[]) => state.fields = fields,
};

export default {
    state,
    getters,
    actions,
    mutations
}


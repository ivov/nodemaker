import Vue from 'vue'
import Vuex from 'vuex'

import basicInfo from './modules/basicInfo';
import resources from './modules/resources';
import operations from './modules/operations';
import fields from './modules/fields';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    basicInfo,
    resources,
    operations,
    fields,
  }
})

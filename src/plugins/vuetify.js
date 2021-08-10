import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
    themes: {
      light: {
        primary: colors.orange.darken2, // #E53935
        //secondary: colors.red.lighten4, // #FFCDD2
        //accent: colors.indigo.base, // #3F51B5
      },
    },
  },
  icons: {
    iconfont: 'mdi', // 默认值 - 仅用于展示目的
  },
});

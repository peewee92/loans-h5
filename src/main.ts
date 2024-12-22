import { createApp } from 'vue';
import App from './App.vue';
import { i18n } from '@/i18n';
import router from '@/router';
import store from '@/store';
import './assets/font/iconfont.css';
import './assets/app.css';
import { Picker } from '@nutui/nutui'

const app = createApp(App);

// 路由
app.use(router);

// 国际化
app.use(i18n);

app.use(Picker)

// 状态管理
app.use(store);

app.mount('#app');

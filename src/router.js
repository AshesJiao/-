import Vue from 'vue'
import Router from 'vue-router'
import Headline from './views/Headline.vue'
import Important from './views/Important.vue'
import TalkView  from './views/TalkView.vue'
import NewsDetail from './views/NewsDetail.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'headline',
      component: Headline
    },
    {
      path: '/important',
      name: 'important',
      component:Important
    },
    {
      path:'/talkView',
      name:'TalkView',
      component:TalkView 
    },
    {
      path:'/newsDetail',
      name:'NewsDetail',
      component:NewsDetail
    }
  ],
  linkActiveClass: 'active'
})

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '医保中心', icon: 'el-icon-menu' }
    }]
  },

  {
    path: '/Info',
    component: Layout,
    redirect: '/Info',
    name: 'Info',
    meta: { title: '医疗基本信息维护', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'medicine',
        name: 'medicine',
        component: () => import('@/views/basic_medical_information/medicine/index.vue'),
        meta: { title: '药品信息维护', icon: 'el-icon-s-help' }
      },
      {
        path: 'project',
        name: 'project',
        component: () => import('@/views/basic_medical_information/project/index.vue'),
        meta: { title: '诊疗项目信息维护', icon: 'el-icon-s-help' }
      },
      {
        path: 'service',
        name: 'service',
        component: () => import('@/views/basic_medical_information/service/index.vue'),
        meta: { title: '服务设施项目维护', icon: 'el-icon-s-help' }
      },
      {
        path: 'disease',
        name: 'disease',
        component: () => import('@/views/basic_medical_information/disease/index.vue'),
        meta: { title: '病种信息维护', icon: 'el-icon-s-help' }
      },
      {
        path: 'institution',
        name: 'institution',
        component: () => import('@/views/basic_medical_information/institution/index.vue'),
        meta: { title: '定点医疗机构信息维护', icon: 'el-icon-s-help' }
      },
      {
        path: 'treatment',
        name: 'treatment',
        component: () => import('@/views/basic_medical_information/treatment/index.vue'),
        meta: { title: '医疗待遇计算参数维护', icon: 'el-icon-s-help' }
      }
    ]
  },
  {
    path: '/treatment',
    component: Layout,
    redirect: '/treatment',
    name: 'treatment',
    meta: { title: '医疗待遇审批', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'people',
        name: 'people',
        component: () => import('@/views/treatment_approval/people/index.vue'),
        meta: { title: '人员就诊机构审批', icon: 'el-icon-user-solid' }
      },
      {
        path: 'special',
        name: 'special',
        component: () => import('@/views/treatment_approval/special/index.vue'),
        meta: { title: '特检特治审批', icon: 'el-icon-user-solid' }
      }
    ]
  },
  {
    path: '/insurance',
    component: Layout,
    redirect: '/insurance',
    name: 'insurance',
    meta: { title: '医保中心报销', icon: 'el-icon-document' },
    children: [
      {
        path: 'center',
        name: 'center',
        component: () => import('@/views/medical_insurance/center/index.vue'),
        meta: { title: '中心报销', icon: 'el-icon-document' }
      },
      {
        path: 'cancel',
        name: 'cancel',
        component: () => import('@/views/medical_insurance/cancel/index.vue'),
        meta: { title: '取消报销', icon: 'el-icon-document' }
      }
    ]
  },
  {
    path: '/inquiry',
    component: Layout,
    redirect: '/inquiry',
    name: 'inquiry',
    meta: { title: '综合查询', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'cost',
        name: 'cost',
        component: () => import('@/views/comprehensive_inquiry/cost/index.vue'),
        meta: { title: '医疗人员费用查询', icon: 'el-icon-search' }
      }
    ]
  },
  {
    path: '/service',
    component: Layout,
    redirect: '/service',
    name: 'service',
    meta: { title: '公共业务', icon: 'el-icon-share' },
    children: [
      {
        path: 'team',
        name: 'team',
        component: () => import('@/views/public_service/team/index.vue'),
        meta: { title: '单位基本信息维护', icon: 'el-icon-share' }
      },
      {
        path: 'person',
        name: 'person',
        component: () => import('@/views/public_service/person/index.vue'),
        meta: { title: '个人基本信息维护', icon: 'el-icon-share' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/pages/Login/Login'
//首页
import Homeage from '@/pages/Homepage/Homeage'
import yuezilogin from '@/pages/Login/yuezilogin'
//权限管理
import  CharacterManagement from '@/pages/AuthorityManagement/CharacterManagement'
import  PeopleManagement from '@/pages/AuthorityManagement/PeopleManagement'
//商户列表
import MemberList from '@/pages/ClubManagement/MemberList'
import Platform from '@/pages/ClubManagement/Platform'
import RecreationClub from '@/pages/ClubManagement/RecreationClub'
//用户管理
/* import BabyManagement from '@/pages/UserManagement/BabyManagement'
import MoMMangement from '@/pages/UserManagement/MoMMangement'
import IntelligentMeasurement from '@/pages/UserManagement/IntelligentMeasurement' */
//商品管理--月子套餐
import LiliPackage from '@/pages/CommodityManagement/LiliPackage'
import addGoods from '@/pages/CommodityManagement/addGoods'
//云课堂
import ClodList from '@/pages/CloudClassroom/ClodList'
import CloudAdd from '@/pages/CloudClassroom/CloudAdd'
import  Technocracy from '@/pages/CloudClassroom/Technocracy' //专家管理
//活动管理
import  ActiveList from "@/pages/ActiveManagement/ActiveList"
import  PagePackage from "@/pages/PageEditManagement/PagePackage"
//页面编辑管理
import PageEditManagement from "@/pages/PageEditManagement/PageEditManagement"
//VIP专订
import VipOrder from "@/pages/VIPOrder/VipOrder"
import  VIPRemind from "@/pages/VIPOrder/VIPRemind"
//商品管理-->预约到店,
import MerchandiseControllist from "@/pages/MerchandiseControl/MerchandiseControllist"
import MerchandiseControladd from  "@/pages/MerchandiseControl/MerchandiseControladd"
//系统设置-->呼叫中心
import  CallCenter from "@/pages/SystemManagement/CallCenter"
//商品管理-->远程智能
import  Custody from "@/pages/IntelligentMonitoring/Custody"
import Remote  from "@/pages/IntelligentMonitoring/Remote"
//数据统计
import UserData from '@/pages/DataStatistics/UserData'
import  OrderData from '@/pages/DataStatistics/OrderData'
//结算管理
import BondeRefund from  '@/pages/SettlementManagement/BondeRefund'
import CommissionSet from '@/pages/SettlementManagement/CommissionSet'
import OrderDatabase from '@/pages/SettlementManagement/OrderDatabase'
//消息管理
import Feedback from "@/pages/MessageSet/Feedback"
//设置提成规则
import Commission from '@/pages/SetCommission/Commission'
//产康列表
import ProductionList from '@/pages/Production/ProductionList'
//留言咨询列表
import MessageConsulting from '@/pages/MessageSet/MessageConsulting'
//Ai智能
import AiCapcityAdd from '@/pages/AiCapcity/AiCapcityAdd'
import  Article from '@/pages/AiCapcity/Article'
import  RuleList from '@/pages/AiCapcity/RuleList'
import  PostpartumMood from '@/pages/AiCapcity/PostpartumMood'
import PushRules from '@/pages/AiCapcity/PushRules'
//实用工具
import ChildrenSong from '@/pages/Utility/ChildrenSong'
import  Assistedfood from '@/pages/Utility/Assistedfood'
import  AssistedfoodAdd from '@/pages/Utility/AssistedfoodAdd'
//用户管理
import OnManagetPreson from '@/pages/OnsiteManagement/OnManagetPreson'
import  UserList  from '@/pages/OnsiteManagement/UserList'
import  dataMonitor from '@/pages/OnsiteManagement/dataMonitor'
import  PhotoManage from '@/pages/OnsiteManagement/PhotoManage'
//订单管理
import CloudListorder from '@/pages/CustomerOrder/CloudListorder'
import OrderRefund from '@/pages/CustomerOrder/OrderRefund'
import postpartummealOrder from '@/pages/CustomerOrder/postpartummealOrder'
import RemoteListorder from '@/pages/CustomerOrder/RemoteListorder'
import ToStoreService from '@/pages/CustomerOrder/ToStoreService'
import VisitingService from '@/pages/CustomerOrder/VisitingService'
//积分管理列表
import IntegralList from '@/pages/Integral/IntegralList'
import IntegrationRule from '@/pages/Integral/IntegrationRule'
import Listofrules from '@/pages/Integral/Listofrules'
Vue.use(Router)
export default new Router({
  routes: [
      {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
           { path: '/yuezilogin', name: 'yuezilogin', component: yuezilogin },
           { path: '/Homeage', name: 'Homeage', component: Homeage },
           { path: '/MemberList', name: 'MemberList', component: MemberList },
           { path: '/Platform', name: 'Platform', component: Platform },
           { path: '/RecreationClub', name: 'RecreationClub', component:RecreationClub },
           { path: '/LiliPackage', name: 'LiliPackage', component:LiliPackage },
           { path: '/addGoods', name: 'addGoods', component:addGoods },
           { path: '/ClodList', name: 'ClodList', component:ClodList },
           { path: '/CloudAdd', name: 'CloudAdd', component:CloudAdd },
           { path: '/Technocracy', name: 'Technocracy', component:Technocracy},
           { path: '/ActiveList', name: 'ActiveList', component:ActiveList},
           { path: '/PageEditManagement', name: 'PageEditManagement', component:PageEditManagement}, 
           { path: '/VipOrder', name: 'VipOrder', component:VipOrder}, 
           { path: '/VIPRemind', name: 'VIPRemind', component:VIPRemind},
           { path: '/MerchandiseControllist', name: 'MerchandiseControllist', component:MerchandiseControllist}, 
           { path: '/MerchandiseControladd', name: 'MerchandiseControladd', component:MerchandiseControladd}, 
           { path: '/CallCenter', name: 'CallCenter', component:CallCenter}, 
           { path: '/Custody', name: 'Custody', component:Custody}, 
           { path: '/Remote', name: 'Remote', component:Remote}, 
           { path:'/Feedback',name:'Feedback',component:Feedback},
           { path:'/OnManagetPreson',name:'OnManagetPreson',component:OnManagetPreson},
           { path:'/CharacterManagement',name:'CharacterManagement',component:CharacterManagement},
           { path:'/PeopleManagement',name:'PeopleManagement',component:PeopleManagement},
           { path:'/Commission',name:'Commission',component:Commission},
           { path:'/PagePackage',name:'PagePackage',component:PagePackage},
           { path:"/MessageConsulting",name:'MessageConsulting',component:MessageConsulting},
           { path:'/AiCapcityAdd',name:'AiCapcityAdd',component:AiCapcityAdd},
           { path:'/Article',name:'Article',component:Article},
           { path:'/RuleList',name:'RuleList',component:RuleList},
           { path:'/ChildrenSong',name:'ChildrenSong',component:ChildrenSong},
           { path:'/ProductionList',name:'ProductionList',component:ProductionList},
           { path:'/PostpartumMood',name:'PostpartumMood',component:PostpartumMood},
           { path:'/PushRules',name:'PushRules',component:PushRules},
           { path:'/Assistedfood',name:'Assistedfood',component:Assistedfood},
           { path:'/AssistedfoodAdd',name:'AssistedfoodAdd',component:AssistedfoodAdd},
           { path:'/IntegralList',name:'IntegralList',component:IntegralList},
           { path:'/IntegrationRule',name:'IntegrationRule',component:IntegrationRule},
           { path:'/Listofrules',name:'Listofrules',component:Listofrules},
           { path:'/UserList',name:'UserList',component:UserList},
           { path:'/OrderData',name:'OrderData',component:OrderData},
           { path:'/UserData',name:'UserData',component:UserData},
           { path:'/BondeRefund',name:'BondeRefund',component:BondeRefund},
           { path:'/CommissionSet',name:'CommissionSet',component:CommissionSet},
           { path:'/OrderDatabase',name:'OrderDatabase',component:OrderDatabase},
           { path:'/CloudListorder',name:'CloudListorder',component:CloudListorder},
           { path:'/OrderRefund',name:'OrderRefund',component:OrderRefund},
           { path:'/postpartummealOrder',name:'postpartummealOrder',component:postpartummealOrder},
           { path:'/RemoteListorder',name:'RemoteListorder',component:RemoteListorder},
           { path:'/ToStoreService',name:'ToStoreService',component:ToStoreService},
           { path:'/VisitingService',name:'VisitingService',component:VisitingService},
           { path:'/dataMonitor',name:'dataMonitor',component:dataMonitor},
           { path:'/PhotoManage',name:'PhotoManage',component:PhotoManage},
        ]
    },
     {
      path: '/Login',
      name: 'Login',
      component: Login
    }, 
    {
      path:'/',
      redirect:'/Login',//访问时候,使用重定向redirect,默认跳转到首页,
      component:Login
    }, 
  ]
})

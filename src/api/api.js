import axios from 'axios'
import qs from 'qs'
 //let baseURL =  require('../../static/baseUrl')
 import {baseUrl} from '../../static/baseUrl'
 import {iframe} from '../../static/iframe'
axios.defaults.baseURL = baseUrl
const aa = sessionStorage.getItem('sesstion')
console.log(baseUrl)
//登录
export const businessmanLogin= (parms) => {
    return axios
       .post("/bespeakApi/adminUser/login",parms)
       .then(res => res.data);
   };
//菜单栏
export const getMenuList=(mysession) => {
    return axios
       .get("/homeApi/menu/getMenuList",{"headers":{"sessionId": mysession}})
   };
//修改密码
export const businessmanUpdatePasswd =(parms,mysession) => {
    return axios
       .post("/bespeakApi/adminUser/updatePasswd",parms,{"headers":{"sessionId": mysession}})
   };
   //商户编辑修改
   export const clubEdit= (parms) => {
    return axios
       .post("/bespeakApi/businessman/edit",parms)
       .then(res => res.data);
   };
   //省市联动接口
   export const  getcity =(parms) => {
    return axios
       .get("/bespeakApi/region/list", { params: parms})
       .then(res => res.data);
   };
//商户列表
export const  getbusinessman =(parms,mysession) => {
    return axios
       .get("/bespeakApi/businessman/list", { params:parms,"headers":{"sessionId": mysession}})
       .then(res => res.data);
   };
 //商家冻结
 export const updateUserStatus =(parms,mysession) => {
    return axios
       .post("/bespeakApi/businessman/updateBusinessmanStatus",parms,{"headers":{"sessionId": mysession}})
   };

//商会删除接口
export const clubdel = (parms) => {
    return axios
       .post("/bespeakApi/businessman/del",parms)
       .then(res => res.data);
   };
//商户新增
export const  addregister =(parms) => {
    return axios
       .post("/bespeakApi/businessman/register", parms)
       .then(res => res.data);
   };
//商品管理------->月子套餐天数增加
export const daysCountadd =(parms,mysession) => {
    return axios
       .post("/dietApi/meal/daysCount/add",parms,{"headers":{"sessionId": mysession}})
   };
  //商品管理--->月子套餐天列表显示
  export const daysCountlist =(mysession) => {
    return axios
       .get("/dietApi/meal/daysCount/list",{"headers":{"sessionId": mysession}})
   };

//商品管理----->2.4.12.	月子套餐搭配增加
export const itemAssortadd =(parms,mysession) => {
    return axios
       .post("/dietApi/meal/itemAssort/add", parms,{"headers":{"sessionId": mysession}})
   };
//商品管理------>列表显示2.4.13.月子套餐搭配列表
export const itemAssortlist =(mysession) => {
    return axios
       .get("/dietApi/meal/itemAssort/list",{"headers":{"sessionId": mysession}})
   };
//月子套餐列表
export const itemgetItemList =(parms,mysession) => {
    return axios
       .post("/dietApi/meal/item/getItemList",parms,{"headers":{"sessionId": mysession}})
   };
//月子套餐列表删除
export const itemgetItemListdel =(parms,mysession) => {
    return axios
       .post("/dietApi/meal/item/del",parms,{"headers":{"sessionId": mysession}})
   };

//月子套餐--套餐详情-->点击编辑时候获取的内容
export const itemgetitemInfo =(parms,mysession) => {
    return axios
       .post("/dietApi/meal/item/itemInfo",parms,{"headers":{"sessionId": mysession}})
   };
//月子套餐-->修改-->2.4.4
export const itemgeedit =(parms,mysession) => {
    return axios
       .post("/dietApi/meal/item/edit",parms,{"headers":{"sessionId": mysession}})
   };
//月子套餐-->商品上下品
export const itemgetstateChange =(parms,mysession) => {
    return axios
       .post("/dietApi/meal/item/stateChange",parms,{"headers":{"sessionId": mysession}})
   };

//商品管理------>2.4.14.	月子套餐搭配修改
export const itemAssortedit =(parms,mysession) => {
    return axios
       .post("/dietApi/meal/itemAssort/edit",parms,{"headers":{"sessionId": mysession}})
   };
  //商品管理------->2.4.1.	月子套餐增加（后台）
  export const itemitemall =(parms,mysession) => {
    return axios
       .post("/dietApi/meal/item/itemall",parms,{"headers":{"sessionId": mysession}})
   };
//云课堂----->2.1.2.	专家增加
export const expertadd =(parms,mysession) => {
    return axios
       .post("/classroomApi/expert/add",parms,{"headers":{"sessionId": mysession}})
   };
//云课堂-->专家列表
export const expertList =(parms,mysession) => {
    return axios
       .post("/classroomApi/expert/getList",parms,{"headers":{"sessionId": mysession}})
   };
//云课堂-->专家删除
export const expertListdel =(parms,mysession) => {
    return axios
       .post("/classroomApi/expert/del",parms,{"headers":{"sessionId": mysession}})
   };
//云课堂--->专家编辑
export const expertListupdate=(parms,mysession) => {
    return axios
       .post("/classroomApi/expert/update",parms,{"headers":{"sessionId": mysession}})
   };
//云课堂--->课程增加
export const Cloudclassroomadd=(parms,mysession) => {
    return axios
       .post("/classroomApi/classroom/add",parms,{"headers":{"sessionId": mysession}})
   };
//云课堂-->列表显示
export const CloudclasssearchBack=(parms,mysession) => {
    return axios
       .post("/classroomApi/classroom/searchBack",parms,{"headers":{"sessionId": mysession}})
   };
//云课堂-->删除
export const Cloudclasssdel=(parms,mysession) => {
    return axios
       .post("/classroomApi/classroom/del",parms,{"headers":{"sessionId": mysession}})
   };
//云课堂-->课堂上架
export const Cloudclassup=(parms,mysession) => {
    return axios
       .post("/classroomApi/classroom/stateChange",parms,{"headers":{"sessionId": mysession}})
   };
//云课堂-->课堂下架
/* export const Cloudclassdown=(parms,mysession) => {
    return axios
       .post("/classroomApi/classroom/down",parms,{"headers":{"sessionId": mysession}})
   }; */
//云课堂-->编辑
export const Cloudclassedit=(parms,mysession) => {
    return axios
       .post("/classroomApi/classroom/edit",parms,{"headers":{"sessionId": mysession}})
   };
//活动管理-->新增
export const activityAdd=(parms,mysession) => {
    return axios
       .post("/homeApi/activity/add",parms,{"headers":{"sessionId": mysession}})
   };
//活动管理---->列表获取
export const activitylist=(parms,mysession) => {
    return axios
       .get("/homeApi/activity/list",{ params: parms,"headers":{"sessionId": mysession}})
   };
 //活动管理--> 删除
 export const activitydel=(parms,mysession) => {
    return axios
       .post("/homeApi/activity/del",parms,{"headers":{"sessionId": mysession}})
   };
//活动管理--->编辑
export const activityedit=(parms,mysession) => {
    return axios
       .post("/homeApi/activity/edit",parms,{"headers":{"sessionId": mysession}})
   };
//首页编辑管理
export const broadcastadd=(parms,mysession) => {
    return axios
       .post("/homeApi/bannerPic/add",parms,{"headers":{"sessionId": mysession}})
   };
//首页管理显示图片
export const broadcastget=(mysession) => {
    return axios
        .get("/homeApi/bannerPic/list",{"headers":{"sessionId": mysession}})
   };
///VIP专订
export const pregnantadd=(parms,mysession) => {//孕育记录新增
    return axios
       .post("/homeApi/pregnant/add",parms,{"headers":{"sessionId": mysession}})
   };
//VIP专定提交重复的时候提示
export const queryexists=(parms,mysession) => {//
    return axios
       .post("/classroomApi/vip/custom/queryexists",parms,{"headers":{"sessionId": mysession}})
   };
   //孕育记录列表
 export const pregnantlist=(parms) => {//孕育
    return axios
       .get("/homeApi/pregnant/list",  {params : parms})
   };
//孕育记录删除
export const pregnantdel=(parms,mysession) => {//孕育记录新增
       return axios
       .post("/homeApi/pregnant/del",parms,{"headers":{"sessionId": mysession}})
   };
//孕育记录-->编辑
export const pregnantedit=(parms,mysession) => {
    return axios
    .post("/homeApi/pregnant/edit",parms,{"headers":{"sessionId": mysession}})
};
//vip-->今日提醒新增.
export const remindadd=(parms,mysession) => {
    return axios
    .post("/homeApi/today/remind/add",parms,{"headers":{"sessionId": mysession}})
};
//vip-->今日提醒列表.
export const remindlist=(parms,mysession) => {
    return axios
    .get("/homeApi/today/remind/list",{params:parms,'headers':{'sessionId': mysession}})
};
//vip-专定增加
export const customadd=(parms,mysession) => {
    return axios
    .post("/classroomApi/vip/custom/add",parms,{"headers":{"sessionId": mysession}})
};
//专定课程编辑
export const customgetvipupdate=(parms,mysession) => {
    return axios
    .post("/classroomApi/vip/custom/update",parms,{"headers":{"sessionId": mysession}})
};
//专定课程列表
export const customgetList=(parms,mysession) => {
    return axios
    .post("/classroomApi/vip/custom/getList",parms,{"headers":{"sessionId": mysession}})
};
//专定课程删除
export const customgetdel=(parms,mysession) => {
    return axios
    .post("/classroomApi/vip/custom/delmulti",parms,{"headers":{"sessionId": mysession}})
};
//vip今日提醒--->删除
export const reminddel=(parms,mysession) => {
    return axios
    .post("/homeApi/today/remind/del",parms,{"headers":{"sessionId": mysession}})
};
//VIP今日提醒-->编辑
export const remindedit=(parms,mysession) => {
    return axios
    .post("/homeApi/today/remind/edit",parms,{"headers":{"sessionId": mysession}})
};
//2.6.6.	护理套餐天数增加(后台)
export const nursingApiadd=(parms,mysession) => {
    return axios
    .post("/nursingApi/nurs/daysCount/add",parms,{"headers":{"sessionId": mysession}})
};
//2.6.7.	护理套餐天数列表（后台）
export const nursingApilist=(parms,mysession) => {
    return axios
    .get("/nursingApi/nurs/daysCount/list", {params:parms,'headers':{'sessionId': mysession}})
};
//护理套餐新增
export const nursingApinursadd=(parms,mysession) => {
    return axios
    .post("/nursingApi/nurs/item/add",parms,{"headers":{"sessionId": mysession}})
};
//2.6.2.	护理套餐列表（后台）
export const nursingApinursitemlist=(parms,mysession) => {
    return axios
    .get("/nursingApi/nurs/item/list",{params:parms,'headers':{'sessionId': mysession}})
};
//2.6.4.	护理套餐删除（后台）
export const nursingApinursitemdel=(parms,mysession) => {
    return axios
    .post("/nursingApi/nurs/item/del",parms,{"headers":{"sessionId": mysession}})
};
//护理套餐上下架
export const nursingApinurstateChange=(parms,mysession) => {
    return axios
    .post("/nursingApi/nurs/item/stateChange",parms,{"headers":{"sessionId": mysession}})
};
//护理套餐-->编辑得到详情
export const nursingApinursitemInfo=(parms,mysession) => {
    return axios
    .get("/nursingApi/nurs/item/itemInfo",{params:parms,'headers':{'sessionId': mysession}})
};
//护理套餐编辑功能
export const nursitemedit=(parms,mysession) => {
    return axios
    .post("/nursingApi/nurs/item/edit",parms,{"headers":{"sessionId": mysession}})
};
//系统管理-->电话
export const centerPhoneadd=(parms,mysession) => {
    return axios
    .post("/bespeakApi/centerPhone/add",parms,{"headers":{"sessionId": mysession}})
};
//系统管理的电话,
export const centerPhonelist=(mysession) => {
    return axios
    .get("/bespeakApi/centerPhone/list",{'headers':{'sessionId': mysession}})
};
//问题反馈列表
export const feedbacklist=(params) => {
    return axios
    .get("/bespeakApi/question/feedback/list",{params:params})
};
//2.1.24.	问题反馈处理
export const feedbackhandle=(parms,mysession) => {
    return axios
    .post("/bespeakApi/question/feedback/handle",parms,{"headers":{"sessionId": mysession}})
};
//上门人员管理--列表
export const waiterlist=(parms,mysession) => {
    return axios
    .get("/nursingApi/waiter/list",{params:parms,'headers':{'sessionId': mysession}})
};
//上门人员增加
export const waiteradd=(parms,mysession) => {
    return axios
    .post("/nursingApi/waiter/add",parms,{"headers":{"sessionId": mysession}})
};
///上们人员-->删除
export const waiterdel=(parms,mysession) => {
    return axios
    .post("/nursingApi/waiter/del",parms,{"headers":{"sessionId": mysession}})
};
//上门人员-->详情
export const waiterget=(parms,mysession) => {
    return axios
    .get("/nursingApi/waiter/get",{params:parms,'headers':{'sessionId': mysession}})
};
//上门人员->编辑
export const waiteredit=(parms,mysession) => {
    return axios
    .post("/nursingApi/waiter/edit",parms,{"headers":{"sessionId": mysession}})
};
//上门人员提成显示套餐id,名称列表
export const itemgetIdList=(parms,mysession) => {
    return axios
    .get("/nursingApi/nurs/item/getIdList",{params:parms,'headers':{'sessionId': mysession}})
};
//上门人员增加
export const profitSharingadd=(parms,mysession) => {
    return axios
    .post("/nursingApi/waiter/profitRule/add",parms,{"headers":{"sessionId": mysession}})
};
//2.6.23.	上门人员服务提成列表（后台）
export const profitSharinglist=(parms,mysession) => {
    return axios
    .get("/nursingApi/waiter/profitRule/list",{params:parms,'headers':{'sessionId': mysession}})
};
//上门人员提成编辑
export const profitSharingedit=(parms,mysession) => {
    return axios
    .post("/nursingApi/waiter/profitRule/edit",parms,{"headers":{"sessionId": mysession}})
};
//页面编辑分类增加
export const navigationaddResidence=(parms,mysession) => {
    return axios
    .post("/nursingApi/nurs/navigation/addResidence",parms,{"headers":{"sessionId": mysession}})
};
//页面编辑分类列表
export const navigationgetList=(parms,mysession) => {
    return axios
    .get("/nursingApi/nurs/navigation/getList",{params:parms,'headers':{'sessionId': mysession}})
};
//页面编辑上架
export const navigationstateChange=(parms,mysession) => {
    return axios
    .post("/nursingApi/nurs/navigation/stateChange",parms,{"headers":{"sessionId": mysession}})
};
//页面编辑删除
export const navigationdel=(parms,mysession) => {
    return axios
    .post("/nursingApi/nurs/navigation/del",parms,{"headers":{"sessionId": mysession}})
};
//页面编辑
export const navigationstateupdate=(parms,mysession) => {
    return axios
    .post("/nursingApi/nurs/navigation/update",parms,{"headers":{"sessionId": mysession}})
};
//远程智能监护-->预约规格增加
export const bespeakspecadd=(parms,mysession) => {
    return axios
    .post("/bespeakApi/bespeak/spec/add",parms,{"headers":{"sessionId": mysession}})
};
//远程智能监控-->天数列表
export const bespeakspeclist=(mysession) => {
    return axios
        .get("/bespeakApi/bespeak/spec/list",{"headers":{"sessionId": mysession}})
   };
//远程智能监控-->增加
export const bespeaksitemaddAll=(parms,mysession) => {
    return axios
    .post("/bespeakApi/bespeak/item/addAll",parms,{"headers":{"sessionId": mysession}})
};
//远程智能列表
export const bespeakApiitemlist=(parms,mysession) => {
    return axios
    .get("/bespeakApi/bespeak/item/list",{params:parms,'headers':{'sessionId': mysession}})
};
//远程智能上下架
export const bespeakstateChange=(parms,mysession) => {
    return axios
    .post("/bespeakApi/bespeak/item/stateChange",parms,{"headers":{"sessionId": mysession}})
};
//远程智能删除
export const bespeakstateitemdel=(parms,mysession) => {
    return axios
    .post("/bespeakApi/bespeak/item/del",parms,{"headers":{"sessionId": mysession}})
};
//远程智能编辑
export const bespeakstateitemedit=(parms,mysession) => {
    return axios
    .post("/bespeakApi/bespeak/item/edit",parms,{"headers":{"sessionId": mysession}})
};
//预约项目获取/详情
export const bespeakApiitemget=(parms,mysession) => {
    return axios
    .get("/bespeakApi/bespeak/item/itemInfo",{params:parms,'headers':{'sessionId': mysession}})
};
//留言咨询列表
export const themeasksearch=(parms,mysession) => {
    return axios
    .post("/themeApi/theme/ask/search",parms,{"headers":{"sessionId": mysession}})
};
//留言咨询回复
export const themeaskupdate=(parms,mysession) => {
    return axios
    .post("/themeApi/theme/ask/update",parms,{"headers":{"sessionId": mysession}})
};
//2.12.4.	获取角色列表
export const rolegetList=(mysession) => {
    return axios
    .get("/homeApi/role/getList",{'headers':{'sessionId': mysession}})
};



//角色增加
export const roleadd=(parms,mysession) => {
    return axios
    .post("/homeApi/role/add",parms,{"headers":{"sessionId": mysession}})
};
//角色编辑
export const roleupdate=(parms,mysession) => {
    return axios
    .post("/homeApi/role/update",parms,{"headers":{"sessionId": mysession}})
};
//2.5.18.	异常推送文章添加
export const articleadd=(parms,mysession) => {
    return axios
    .post("/monitorApi/monitor/article/add",parms,{"headers":{"sessionId": mysession}})
};
//2.5.19.	异常文章列表显示（后台）
export const articlegetList=(parms,mysession) => {
    return axios
    .get("/monitorApi/monitor/article/getList",{params:parms,'headers':{'sessionId': mysession}})
};
//2.5.20.	异常推送文章删除（后台）
export const articledel=(parms,mysession) => {
     return axios
     .post("/monitorApi/monitor/article/del",parms,{"headers":{"sessionId": mysession}})
};
//2.5.22.	异常推送文章修改（后台）
export const articleupdate=(parms,mysession) => {
    return axios
    .post("/monitorApi/monitor/article/update",parms,{"headers":{"sessionId": mysession}})
};
//2.5.24.	新生儿、产妇规则添加（后台）
export const evaluationadd=(parms,mysession) => {
    return axios
    .post("/monitorApi/evaluation/rule/add",parms,{"headers":{"sessionId": mysession}})
};
//2.5.25.	新生儿、产妇规则列表（后台）
export const evaluationgetList=(parms,mysession) => {
    return axios
    .get("/monitorApi/evaluation/rule/list",{params:parms,'headers':{'sessionId': mysession}})
};
//新生儿、产妇规则删除（后台）
export const evaluationdel=(parms,mysession) => {
    return axios
    .post("/monitorApi/evaluation/rule/del",parms,{"headers":{"sessionId": mysession}})
};
//新生儿、产妇规则编辑的
export const evaluationruleedit=(parms,mysession) => {
    return axios
    .post("/monitorApi/evaluation/rule/edit",parms,{"headers":{"sessionId": mysession}})
};






//新生儿、产妇规则获取详情的
export const evaluationupdate=(parms,mysession) => {
    return axios
    .post("/monitorApi/evaluation/rule/update",parms,{"headers":{"sessionId": mysession}})
};
//2.8.22	儿歌分类增加
export const classroomApiadd=(parms,mysession) => {
    return axios
    .post("/classroomApi/children/song/add",parms,{"headers":{"sessionId": mysession}})
};
//儿歌分类列表
export const childrengetList=(parms,mysession) => {
    return axios
    .get("/classroomApi/children/song/getList",{params:parms,'headers':{'sessionId': mysession}})
};
//2.8.21	儿歌或故事增加
export const childrensongadd=(parms,mysession) => {
    return axios
    .post("/classroomApi/children/song/add",parms,{"headers":{"sessionId": mysession}})
};
//2.8.26	儿歌或者故事编辑
export const childrensongedit=(parms,mysession) => {
    return axios
    .post("/classroomApi/children/song/edit",parms,{"headers":{"sessionId": mysession}})
};

//2.8.23	儿歌或者故事搜索
export const childrensongsearch=(parms,mysession) => {
    return axios
    .post("/classroomApi/children/song/search",parms,{"headers":{"sessionId": mysession}})
};
//2.8.26	儿歌或者故事删除
export const childrensongdel=(parms,mysession) => {
    return axios
    .post("/classroomApi/children/song/del",parms,{"headers":{"sessionId": mysession}})
};
//产康规则题目增加
export const subjectadd=(parms,mysession) => {
    return axios
    .post("/monitorApi/questionnaire/subject/add",parms,{"headers":{"sessionId": mysession}})
};
//产康列表
export const subjectgetList=(parms,mysession) => {
    return axios
    .get("/monitorApi/questionnaire/subject/getchankang",{params:parms,'headers':{'sessionId': mysession}})
};
//产后情绪列表
export const questionnairegetList=(parms,mysession) => {
    return axios
    .get("/monitorApi/questionnaire/subject/getList",{params:parms,'headers':{'sessionId': mysession}})
};
//2.4.42.	产后情绪推荐规则增加
export const emotionRuleadd=(parms,mysession) => {
    return axios
    .post("/monitorApi/questionnaire/emotionRule/add",parms,{"headers":{"sessionId": mysession}})
};
//2.4.44.	产后情绪推荐规则列表
export const emotionRulelist=(parms,mysession) => {
    return axios
    .get("/monitorApi/questionnaire/emotionRule/list",{params:parms,'headers':{'sessionId': mysession}})
};
//2.4.45.	产后情绪推荐规则删除
export const emotionRuledel=(parms,mysession) => {
    return axios
    .post("/monitorApi/questionnaire/emotionRule/del",parms,{"headers":{"sessionId": mysession}})
};
//2.4.43.	产后情绪推荐规则编辑
export const emotionRuleedit=(parms,mysession) => {
    return axios
    .post("/monitorApi/questionnaire/emotionRule/edit",parms,{"headers":{"sessionId": mysession}})
};
//2.4.31.	产后情绪题目删除
export const subjectdel=(parms,mysession) => {
    return axios
    .post("/monitorApi/questionnaire/subject/del",parms,{"headers":{"sessionId": mysession}})
};

 //2.4.36.	产后情绪推荐规则删除
export const delchankangdel=(parms,mysession) => {
    return axios
    .post("/monitorApi/questionnaire/subject/delchankang",parms,{"headers":{"sessionId": mysession}})
};

//2.3.21.	婴儿辅食文章添加
export const auxiliaryFoodarticleadd=(parms,mysession) => {
    return axios
    .post("/dietApi/auxiliaryFood/article/add",parms,{"headers":{"sessionId": mysession}})
};
//2.3.22.	婴儿辅食文章搜索
export const auxiliaryFoodsearch=(parms,mysession) => {
    return axios
    .get("/dietApi/auxiliaryFood/article/search",{params:parms,'headers':{'sessionId': mysession}})
};
//2.3.24.	婴儿辅食文章删除
export const auxiliaryFoodarticledel=(parms,mysession) => {
    return axios
    .post("/dietApi/auxiliaryFood/article/del",parms,{"headers":{"sessionId": mysession}})
};
//2.3.23.	婴儿辅食文章修改
export const auxiliaryFoodarticleedit=(parms,mysession) => {
    return axios
    .post("/dietApi/auxiliaryFood/article/edit",parms,{"headers":{"sessionId": mysession}})
};
//2.1.35.	积分进出日志列表
export const tradeLoglist=(parms,mysession) => {
    return axios
    .get("/bespeakApi/tradeLog/list",{params:parms,'headers':{'sessionId': mysession}})
};
///2.1.34.	积分进出日志编辑
export const tradeLogedit=(parms,mysession) => {
    return axios
    .post("/bespeakApi/tradeLog/edit",parms,{"headers":{"sessionId": mysession}})
};

//积分规则增加
export const integrationRuleadd=(parms,mysession) => {
    return axios
    .post("/bespeakApi/integrationRule/add",parms,{"headers":{"sessionId": mysession}})
};
///积分规则列表
export const integrationRulelist=(mysession) => {
    return axios
    .get("/bespeakApi/integrationRule/list",{'headers':{'sessionId': mysession}})
};
//积分类型获取单个菜单商品
export const getProductList=(parms,mysession) => {
    return axios
    .get("bespeakApi/integration/itemSet/getProductList",{params:parms,'headers':{'sessionId': mysession}})
};
//积分2.1.30.	积分与产品设置增加
export const itemSetadd=(parms,mysession) => {
    return axios
    .post("/bespeakApi/integration/itemSet/add",parms,{"headers":{"sessionId": mysession}})
};
//设置列表
export const itemSetList=(parms,mysession) => {
    return axios
    .get("/bespeakApi/integration/itemSet/list",{params:parms,'headers':{'sessionId': mysession}})
};
//积分设置停用启用
export const stateChange=(parms,mysession) => {
    return axios
    .post("/bespeakApi/integration/itemSet/stateChange",parms,{"headers":{"sessionId": mysession}})
};
//2.1.31.	积分与产品设置编辑
export const itemSetedit=(parms,mysession) => {
    return axios
    .post("/bespeakApi/integration/itemSet/edit",parms,{"headers":{"sessionId": mysession}})
};
//订单管理云智能
export const orderlist=(parms,mysession) => {
    return axios
    .get("/bespeakApi/bespeak/order/list",{params:parms,'headers':{'sessionId': mysession}})
};
//远程智能分配人员
export const dispatchadd=(parms,mysession) => {
    return axios
    .post("/nursingApi/waiter/dispatch/add",parms,{"headers":{"sessionId": mysession}})
};
//权限管理人员增加
export const adminUseradd=(parms,mysession) => {
    return axios
    .post("/bespeakApi/adminUser/addadmin",parms,{"headers":{"sessionId": mysession}})
};
//2.12.6.	获取管理员列表
export const adminUsergetList=(parms,mysession) => {
    return axios
    .post("/bespeakApi/adminUser/getadminList",parms,{"headers":{"sessionId": mysession}})
};
//管理员停用启用
export const adminUserupdate=(parms,mysession) => {
    return axios
    .post("/bespeakApi/adminUser/updateadmin",parms,{"headers":{"sessionId": mysession}})
};
//管理员删除
export const adminUserdel=(parms,mysession) => {
    return axios
    .post("/bespeakApi/adminUser/deladmin",parms,{"headers":{"sessionId": mysession}})
};
////根据角色获取选中
export const getSelectMenu=(parms,mysession) => {
    return axios
    .post("/homeApi/menu/getSelectMenu",parms,{"headers":{"sessionId": mysession}})
};
//月子订单列表
export const Monthorderlist=(parms,mysession) => {
    return axios
    .get("/dietApi/meal/order/list",{params:parms,'headers':{'sessionId': mysession}})
};
//上门服务的订单列表
export const VistList=(parms,mysession) => {
    return axios
    .get("/nursingApi/nurs/order/list",{params:parms,'headers':{'sessionId': mysession}})
};
//云课堂订单列别
export const classroomorderlist=(parms,mysession) => {
    return axios
    .get("/classroomApi/classroom/order/list",{params:parms,'headers':{'sessionId': mysession}})
};
//数据中心---->订单数据
export const orderDataStatislist=(parms,mysession) => {
    return axios
    .get("/homeApi/order/dataStatis/list",{params:parms,'headers':{'sessionId': mysession}})
};
//数据中新--->用户数据
export const userDataStatislist=(parms,mysession) => {
    return axios
    .get("/homeApi/user/dataStatis/list",{params:parms,'headers':{'sessionId': mysession}})
};
//结算管理---提成结算列表
export const profitStatislist=(parms,mysession) => {
    return axios
    .get("/homeApi/waiter/profitStatis/list",{params:parms,'headers':{'sessionId': mysession}})
};
//结算管理--->2.3.19.	押金退还列表
export const refundForegiftlist=(parms,mysession) => {
    return axios
    .get("/dietApi/meal/order/refundForegift/list",{params:parms,'headers':{'sessionId': mysession}})
};
//结算管理--->订单结算列表
export const settlementlist=(parms,mysession) => {
    return axios
    .get("/homeApi/yzd/order/settlement/list",{params:parms,'headers':{'sessionId': mysession}})
};
//用户管理---用户列表
export const bespeakApiuserlist=(parms,mysession) => {
    return axios
    .get("/bespeakApi/user/list",{params:parms,'headers':{'sessionId': mysession}})
};
//用户获取宝宝详情
export const getByMomByUserId=(parms,mysession) => {
    return axios
    .get("/bespeakApi/baby/getByMomByUserId",{params:parms,'headers':{'sessionId': mysession}})
};
//用户数据检测列表
export const usermonitorlist=(parms,mysession) => {
    return axios
    .post("/monitorApi/monito/babyPuerpera/usermonitorlist",parms,{"headers":{"sessionId": mysession}})
};
//2.12.7.	根据角色获取选中菜单
/* export const usermonitorlist=(parms,mysession) => {
    return axios
    .post("/homeApi/menu/getSelectMenu",parms,{"headers":{"sessionId": mysession}})
}; */
//2.12.3.	赋予角色菜单
export const addrolemenulist=(parms,mysession) => {
    return axios
    .post("/homeApi/role/addrolemenu",parms,{"headers":{"sessionId": mysession}})
};
//2.8.33.	会所数据统计数据(上部分)
export const dataStatisorderCount=(mysession) => {
    return axios
    .get("/homeApi/club/dataStatis/orderCount",{'headers':{'sessionId': mysession}})
};
//2.8.34.	会所数据统计数据(下部分)
export const orderAmount=(parms,mysession) => {
    return axios
    .get("/homeApi/club/dataStatis/orderAmount",{params:parms,'headers':{'sessionId': mysession}})
};
//月子岛-->首页是上部分
export const dataStatisorderCountyzd=(mysession) => {
    return axios
    .get("/homeApi/yzd/dataStatis/orderCount",{'headers':{'sessionId': mysession}})
};
//月子岛->2.8.36.	月子岛数据统计数据(下部分)

export const dorderAmountyzd=(parms,mysession) => {
    return axios
    .get("/homeApi/yzd/dataStatis/orderAmount",{params:parms,'headers':{'sessionId': mysession}})
};
// 退出登录时  调用
export const loginOut = (mysession) => {
    return axios.post('/bespeakApi/businessman/signOut', {}, {"headers":{"sessionId": mysession}})
}

//

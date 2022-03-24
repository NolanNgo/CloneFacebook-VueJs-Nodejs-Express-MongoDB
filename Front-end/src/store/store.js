import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: {},
        isShow:false,
        isShow2:false,
        accessToken:"",
        isRefesh : false
    },
    getters:{

    },
    mutations:{
        setUser(state,user){
            state.user = user;
        },
        setIsShow(state,data){
            state.isShow = data;
        },
        setIsShow2(state,data){
            state.isShow2 = data;
        },
        setAccessToken(state,data){
            state.accessToken = data;
        },
        setisRefesh(state,data){
            state.isRefesh = data;
        }
    },
    actions:{
        actionsSetUser(context,newUser){
            context.commit('setUser',newUser)
        }
    }
})
export default store 
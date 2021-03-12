import { GetterTree, MutationTree, ActionTree } from "vuex";


export interface MenuModalState {
    isShowingMenu:boolean
}


export const enum mutationStringMenuModal{
    SET_IS_SHOWING_MENU_MODAL = 'setIsShowingMenuModal',
}

export const enum getterStringMenuModal{
    IS_SHOWING_MENU_MODAL = 'isShowingMenuModal',
}

export const state:MenuModalState = {
    isShowingMenu:false
};

export const getters: GetterTree<MenuModalState, any> = {
    isShowingMenuModal: state => state.isShowingMenu
};

export const mutations: MutationTree<any> = {
    // setUser(state, payload:IUser){ console.log("PAYLOAD", payload), state.user = payload;}
    setIsShowingMenuModal(state, payload:boolean){            console.log("click", payload); state.isShowingMenu = payload},
};

export const actions: ActionTree<MenuModalState, any> = {

};

export const menuModal = {
    actions,
    mutations,
    getters,
    state
};

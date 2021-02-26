import { GetterTree, MutationTree, ActionTree } from "vuex";
import { DB } from '@/main';


export interface UserState {
    user:IUser | null
}
export interface IUser{
    name:string,
    email:string,
    userId:string,
}



export const enum mutationStringUser{
    SET_USER = 'setUser'
}
export const enum actionStringUser{
    GET_USER = 'getUser',
    POST_USER = 'postUser',
    UPDATE_USER = 'updateUser',
}
export const enum getterStringUser{
    user = 'user'
}

export const state:UserState = {
    user:null
};

export const getters: GetterTree<UserState, any> = {
    user: state => state.user
};

export const mutations: MutationTree<any> = {
    // setUser(state, payload:IUser){ console.log("PAYLOAD", payload), state.user = payload;}
};

export const actions: ActionTree<UserState, any> = {

    getUser({commit}): Promise<IUser> {
        console.log("running get user");
        return new Promise((resolve, reject) => {
            let userID = localStorage.getItem('userId');

            DB.collection("users").doc(userID as string).get().then((doc) => {

                if (doc.exists) {
                    let user = doc.data();
                    console.log("Document data:", doc.data());
                    commit(mutationStringUser.SET_USER, user);
                    resolve(user as IUser);
                } else {
                    console.log("Cant find user");
                    console.log("No such document!");
                }

            }).catch((err) => {
                reject(err);
                reject("error");

            });

        });


    },
    postUser({commit}, newUser: IUser): void {
        DB.collection("users").doc(newUser.userId).set({
            name: newUser.name,
            email: newUser.email,
            userId:newUser.userId,
        }).then((res: any) => {
            console.log("res", res);
        }).catch((err: any) => {
            console.log(err);
        })
    },
    updateUser({commit, state, dispatch}, payload:IUser):Promise<IUser>{
        console.log("payload inside", payload);
        return new Promise((resolve, reject) => {

            let userID = localStorage.getItem('userId');

            DB.collection("users").doc(userID as string).set(payload, { merge: true }).then(function(doc:any){
                console.log("RES pushed to state", payload);
                dispatch(actionStringUser.GET_USER);
                resolve(payload);
            }).catch((err:any)=>{
                console.log(err);
                reject(err);
            })
        })
    },
};

export const users = {
    actions,
    mutations,
    getters,
    state
};

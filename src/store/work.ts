import { GetterTree, MutationTree, ActionTree } from "vuex";
import { DB } from '@/main';
import {category} from "@/Types/Types";


export interface WorkState {
    work:IWork[] | null
}
export interface IWork{
    imageUrl:string,
    title:string,
    category:Category,
    content:string;
    imageIngressUrl:string;
}

export enum Category {
    all = "all topics",
    performances = "performances",
    projects = "projects",
    publications = "publications",
    films = "films",
    blank = "",
}



export const enum mutationStringWork{
    SET_WORK = 'setWork'
}
export const enum actionStringWork{
    GET_WORK = 'getWork',
    POST_WORK = 'postWork',
    UPDATE_WORK = 'updateUser',
    GET_WORK_BY_ID = 'getWorkById'
}
export const enum getterStringWork{
    WORK = 'work'
}

export const state:WorkState = {
    work:[],
};

export const getters: GetterTree<WorkState, any> = {
    work: state => state.work
};

export const mutations: MutationTree<any> = {
    setWork(state, payload:IWork[]){ console.log("PAYLOAD", payload), state.work = payload;}
};

export const actions: ActionTree<WorkState, any> = {

    getWork({commit}): Promise<IWork[]> {
        console.log("running get work");
        return new Promise((resolve, reject) => {

            let workList: IWork[] = [];

            DB.collection("work").get().then((doc) => {
                doc.forEach(res => {
                    let work: Partial<IWork> = res.data();
                    console.log("data", res.data());
                    let newContact = {imageUrl: work.imageUrl, title: work.title, content:work.content, category:work.category, imageIngressUrl:work.imageIngressUrl};
                    workList.push(newContact as IWork);
                });

                commit(mutationStringWork.SET_WORK, workList);
                resolve(workList);

            }).catch((err) => {
                reject(err);
                reject("error");

            });

        });


    },

    getWorkById({commit, dispatch}, workId:string):Promise<IWork>{
        return new Promise((resolve, reject) => {
            let workList: IWork[] = [];
            DB.collection("work").where("title", "==", workId).get().then((doc:any) => {
                doc.forEach((res: { data: () => Partial<IWork>; id: any; }) => {
                    let work: Partial<IWork> = res.data();



                    let newWork = {
                        imageUrl:work.imageUrl,
                        title:work.title,
                        category:work.category,
                        content:work.content,
                        imageIngressUrl:work.imageIngressUrl
                    };

                    workList.push(newWork as IWork);


                });
                resolve(workList[0]);

            }).catch((e:Error) => {
                console.log("Error", e);
                reject(e);
            });
        });

    },

    postWork({commit, dispatch}, newWork:Partial<IWork>): Promise<void> {
        console.log(newWork);
        return new Promise((resolve, reject) => {
        DB.collection("work").doc().set({
            title: newWork.title,
            content: newWork.content,
            imageUrl: newWork.imageUrl,
            category: newWork.category,
            imageIngressUrl: newWork.imageIngressUrl
        }).then((res: any) => {
            resolve(res);
            dispatch(actionStringWork.GET_WORK);
        }).catch((err: any) => {
            console.log(err);
            reject(err);
        })
        })
    },

    // postUser({commit}, newUser: IUser): void {
    //     DB.collection("users").doc(newUser.userId).set({
    //         name: newUser.name,
    //         email: newUser.email,
    //         userId:newUser.userId,
    //     }).then((res: any) => {
    //         console.log("res", res);
    //     }).catch((err: any) => {
    //         console.log(err);
    //     })
    // },
    // updateUser({commit, state, dispatch}, payload:IUser):Promise<IUser>{
    //     console.log("payload inside", payload);
    //     return new Promise((resolve, reject) => {
    //
    //         let userID = localStorage.getItem('userId');
    //
    //         DB.collection("users").doc(userID as string).set(payload, { merge: true }).then(function(doc:any){
    //             console.log("RES pushed to state", payload);
    //             dispatch(actionStringUser.GET_USER);
    //             resolve(payload);
    //         }).catch((err:any)=>{
    //             console.log(err);
    //             reject(err);
    //         })
    //     })
    // },
};

export const work = {
    actions,
    mutations,
    getters,
    state
};

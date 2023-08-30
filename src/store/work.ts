import { GetterTree, MutationTree, ActionTree } from "vuex";
import { DB } from '@/main';
import {category} from "@/Types/Types";
import {actionStringCalendarEvent} from "@/store/calendarEvent";
import firebase from 'firebase/app';
import 'firebase/firestore';

export interface WorkState {
    work:IWork[] | null
}
export interface IWork{
    id?:string,
    imageUrl:string,
    title:string,
    category:Category,
    content:string;
    imageIngressUrl:string;
    markedForPreview:boolean,
    rider?:string,
    created?:Date | string,
    imageGallerySlider?: string,
}

export enum Category {
    all = "all topics",
    performances = "performances",
    projects = "projects",
    publications = "publications",
    films = "films",
    interview = "interview",
    media = "media",
    reviews = "reviews",
    blank = "",
}



export const enum mutationStringWork{
    SET_WORK = 'setWork'
}
export const enum actionStringWork{
    GET_WORK = 'getWork',
    GET_LATEST_WORK = 'getLatestWork',
    POST_WORK = 'postWork',
    UPDATE_WORK = 'updateWork',
    GET_WORK_BY_ID = 'getWorkById',
    DELETE_WORK_BY_ID = 'deleteWorkById'
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
    setWork(state, payload:IWork[]){


        //ORDER BY DATE
        payload.sort((a, b) => {
            // @ts-ignore
            const dateA = new Date(a.created).getTime();
            // @ts-ignore
            const dateB = new Date(b.created).getTime();
            return dateB - dateA; // sort by newest to oldest date
        });

        state.work = payload;
    }
};

export const actions: ActionTree<WorkState, any> = {

    getWork({commit}): Promise<IWork[]> {
        return new Promise((resolve, reject) => {

            let workList: IWork[] = [];

            DB.collection("work").get().then((doc) => {
                doc.forEach(res => {
                    let work: Partial<IWork> = res.data();

                    let newContact = {id:res.id, imageUrl: work.imageUrl, title: work.title, content:work.content, category:work.category, imageIngressUrl:work.imageIngressUrl, markedForPreview:work.markedForPreview, created:work.created};

                    workList.push(newContact as IWork);
                });

               // const test =  workList.sort((a, b) => {
               //      // @ts-ignore
               //      const dateA = new Date(b.created).getTime();
               //      // @ts-ignore
               //      const dateB = new Date(a.created).getTime();
               //      return dateB - dateA; // sort by newest to oldest date
               //  });

               // console.log("order?", test);




                commit(mutationStringWork.SET_WORK, workList);
                resolve(workList);

            }).catch((err) => {
                reject(err);
                reject("error");

            });

        });


    },

    getLatestWork({commit}): Promise<IWork[]> {
        return new Promise((resolve, reject) => {

            let workList: IWork[] = [];

            DB.collection("work").where("category", "in", ["projects", "performances", "Films", "publications"]).limit(6).get().then((doc) => {
                doc.forEach(res => {
                    let work: Partial<IWork> = res.data();

                    let newContact = {id:res.id, imageUrl: work.imageUrl, title: work.title, content:work.content, category:work.category, imageIngressUrl:work.imageIngressUrl};
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
                        id:res.id,
                        imageUrl:work.imageUrl,
                        title:work.title,
                        category:work.category,
                        content:work.content,
                        imageIngressUrl:work.imageIngressUrl,
                        markedForPreview:work.markedForPreview,
                        rider:work.rider,
                        imageGallerySlider: work.imageGallerySlider,
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
        return new Promise((resolve, reject) => {
            let currentDate = new Date();
            let currentDateString = currentDate.toISOString();

            console.log("currentDateString", currentDateString)


        DB.collection("work").doc().set({
            title: newWork.title,
            content: newWork.content,
            imageUrl: newWork.imageUrl,
            category: newWork.category,
            imageIngressUrl: newWork.imageIngressUrl,
            markedForPreview: newWork.markedForPreview,
            rider:newWork.rider,
            created:currentDateString,
            imageGallerySlider:newWork.imageGallerySlider
        }).then((res: any) => {
            resolve(res);
            dispatch(actionStringWork.GET_WORK);
        }).catch((err: any) => {
            console.log(err);
            reject(err);
        })
        })
    },
    deleteWorkById({dispatch}, workId:string):Promise<any>{
        return new Promise(async (resolve) => {
            const res = await DB.collection('work').doc(workId).delete();
            console.log("delete res", res);
            resolve(res);
            dispatch(actionStringWork.GET_WORK);
        })

    },

    updateWork({commit, state, dispatch}, payload:IWork):Promise<IWork>{
        return new Promise((resolve, reject) => {

            console.log("payload", payload)
            DB.collection("work").doc(payload.id as string).set({
                imageUrl:payload.imageUrl,
                title:payload.title,
                category:payload.category,
                content:payload.content,
                imageIngressUrl:payload.imageIngressUrl,
                markedForPreview:payload.markedForPreview,
                imageGallerySlider:payload.imageGallerySlider,
                },
                { merge: true }).then(function(doc:any){
                dispatch(actionStringWork.GET_WORK);
                resolve(payload);
            }).catch((err:any)=>{
                console.log(err);
                reject(err);
            })
        })
    },
};

export const work = {
    actions,
    mutations,
    getters,
    state
};

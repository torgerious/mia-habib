import {ActionTree, GetterTree, MutationTree} from "vuex";
import {DB} from '@/main';
import {formatDate, FormatSpaceType} from "@/Types/formatDateHelper";
import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;
import {actionStringWork, IWork} from "@/store/work";


export interface CalendarEventState {
    calendarEvents:ICalendarEvent[] | null
}
export interface ICalendarEvent{
    id?:string,
    title:string,
    text:string;
    date:string | Date;
    timestamp?:number | Timestamp | string,
}


export const enum mutationStringCalendarEvent{
    SET_CALENDAR_EVENTS = 'setCalendarEvents'
}

export const enum actionStringCalendarEvent{
    POST_CALENDAR_EVENT = 'postCalendarEvent',
    GET_CALENDAR_EVENTS = 'getCalendarEvents',
    UPDATE_CALENDAR_EVENT = 'updateCalendarEvent',
    GET_CALENDAR_EVENTS_BY_ID = 'getCalendarEventsById',
    DELETE_CALENDAR_EVENT = 'deleteCalendarEvent',
}
export const enum getterStringCalendarEvent{
    CALENDAR_EVENTS = 'calendarEvents'
}

export const state:CalendarEventState = {
    calendarEvents:[],
};

export const getters: GetterTree<CalendarEventState, any> = {
    calendarEvents: state => state.calendarEvents
};

export const mutations: MutationTree<any> = {
    setCalendarEvents(state, payload:ICalendarEvent[]){ console.log("PAYLOAD", payload), state.calendarEvents = payload;}
};

export const actions: ActionTree<CalendarEventState, any> = {

    getCalendarEvents({commit}): Promise<ICalendarEvent[]> {
        return new Promise((resolve, reject) => {

            let calendarEvents: ICalendarEvent[] = [];

            DB.collection("calendarEvent").get().then((doc) => {
                doc.forEach(res => {
                    let event: Partial<ICalendarEvent> = res.data();
                    console.log("data",event);
                    console.log("res",res.id);
                    let formattedDate = formatDate(event.date as string, FormatSpaceType.IGNORE, true);
                    let dateAsTimestamp = Date.parse(<string>event.date)
                    console.log("Date", dateAsTimestamp);
                    let newCalendarEvent = {id:res.id, text: event.text, title: event.title, date:formattedDate, timestamp:dateAsTimestamp};
                    calendarEvents.push(newCalendarEvent as unknown as ICalendarEvent);
                });

                calendarEvents.sort((a:any, b:any) => {
                  return  a.timestamp - b.timestamp
                })



                commit(mutationStringCalendarEvent.SET_CALENDAR_EVENTS, calendarEvents);
                resolve(calendarEvents);

            }).catch((err) => {
                reject(err);
                reject("error");

            });

        });


    },

     deleteCalendarEvent({dispatch}, calendarID:string):Promise<any>{
        return new Promise(async (resolve) => {
            const res = await DB.collection('calendarEvent').doc(calendarID).delete();
            console.log("delete res", res);
            resolve(res);
            dispatch(actionStringCalendarEvent.GET_CALENDAR_EVENTS);
        })

    },
    getCalendarEventsById({commit}, calendarEventId):Promise<ICalendarEvent>{
        return new Promise((resolve, reject) => {
            DB.collection("calendarEvent").doc(calendarEventId).get().then((doc: any) => {
                let data = doc.data();
                console.log(data);
                resolve(data);

            }).catch((e: Error) => {
                console.log("Error", e);
                reject(e);
            });
        });
    },

    postCalendarEvent({commit, dispatch}, newCalendarEvent:Partial<ICalendarEvent>): Promise<void> {
        console.log("running post cal", newCalendarEvent);

        return new Promise((resolve, reject) => {
            DB.collection("calendarEvent").doc().set({
                title: newCalendarEvent.title,
                text: newCalendarEvent.text,
                date: newCalendarEvent.date,
            }).then((res: any) => {
                resolve(res);
                dispatch(actionStringCalendarEvent.GET_CALENDAR_EVENTS);
            }).catch((err: any) => {
                console.log(err);
                reject(err);
            })
        })
    },

    updateCalendarEvent({commit, dispatch}, payload:Partial<ICalendarEvent>): Promise<ICalendarEvent> {

        return new Promise((resolve, reject) => {

            DB.collection("calendarEvent").doc(payload.id as string).set({
                    title:payload.title,
                    text:payload.text,
                    date:payload.date,
                },
                { merge: true }).then(function(doc:any){
                console.log("RES pushed to state", payload);
                console.log("RES pushed to state", doc);
                dispatch(actionStringCalendarEvent.GET_CALENDAR_EVENTS);
                resolve(payload as ICalendarEvent);
            }).catch((err:any)=>{
                console.log(err);
                reject(err);
            })
        })
    },

};

export const calendarEvent = {
    actions,
    mutations,
    getters,
    state
};

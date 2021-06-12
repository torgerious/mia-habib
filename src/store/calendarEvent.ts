import {ActionTree, GetterTree, MutationTree} from "vuex";
import {DB} from '@/main';
import {formatDate, FormatSpaceType} from "@/Types/formatDateHelper";
import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;


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
    GET_CALENDAR_EVENTS = 'getCalendarEvents'
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

    postCalendarEvent({commit, dispatch}, newCalendarEvent:Partial<ICalendarEvent>): Promise<void> {
        console.log("running post cal", newCalendarEvent);

        return new Promise((resolve, reject) => {
            DB.collection("calendarEvent").doc().set({
                title: newCalendarEvent.title,
                text: newCalendarEvent.text,
                date: newCalendarEvent.date,
            }).then((res: any) => {
                resolve(res);
                // dispatch(actionStringCalendarEvent.a);
            }).catch((err: any) => {
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

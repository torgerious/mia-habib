import { GetterTree, MutationTree, ActionTree } from "vuex";
import { DB } from '@/main';
import firebase from 'firebase/app';
import 'firebase/firestore';

export interface PeopleState {
    people: IPeople[]
}

export interface IPeople {
    id: string,
    name: string,
    profession?: string,
    description?: string,
	image?: string
}

export const enum IPeopleMutationString {
    SET_PEOPLE= 'setPeople'
}

export const enum actionStringPeople {
    GET_PEOPLE = 'getPeople',
    POST_PEOPLE = 'postPeople',
    DELETE_PEOPLE = 'deletePeople',
    UPDATE_PEOPLE = 'updatePeople',
}

export const enum getterStringPeople {
    PEOPLE = 'people'
}


export const state: PeopleState = {
    people: []
};

export const getters: GetterTree<PeopleState, any> = {
    people: state => state.people
};

export const mutations: MutationTree<any> = {
    setPeople(state, payload: IPeople[]) {
        state.people = payload;
    },
};


export const actions: ActionTree<PeopleState, any> = {

    getPeople({ commit }): Promise<IPeople[]> {
        return new Promise((resolve, reject) => {
            let peopleList: IPeople[] = [];

            DB.collection("people").get().then((querySnapshot) => {
                querySnapshot.forEach((people) => {
                    const peopleData = people.data() as IPeople;
                    peopleData.id = people.id
                    peopleList.push(peopleData);
                });
                commit(IPeopleMutationString.SET_PEOPLE, peopleList);
                resolve(peopleList);
            }).catch((err) => {
                console.error("Error retrieving people:", err);
                reject(err);
            });
        });
    },

    postPeople({ dispatch }, newPeople: IPeople): Promise<void> {
        return new Promise((resolve, reject) => {
            DB.collection("people").doc().set(newPeople).then(() => {
                dispatch(actionStringPeople.GET_PEOPLE);
                resolve();
            }).catch((err) => {
                console.error("Error posting people:", err);
                reject(err);
            });
        });
    },

    deletePeople({ dispatch }, peopleId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            DB.collection("people").doc(peopleId).delete()
            .then(() => {
                console.log("person deleted successfully");
                dispatch(actionStringPeople.GET_PEOPLE); // This will refresh the people list
                resolve();
            }).catch((err) => {
                console.error("Error deleting person:", err);
                reject(err);
            });
        });
    },
    

	updatePeople({ dispatch }, updatePeople: IPeople): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!updatePeople.id) {
                reject("People ID is required for updating");
                return;
            }
            DB.collection("people").doc(updatePeople.id).update(updatePeople).then(() => {
                dispatch(actionStringPeople.GET_PEOPLE);
                resolve();
            }).catch((err) => {
                console.error("Error updating people:", err);
                reject(err);
            });
        });
    }
};

export const people = {
    actions,
    mutations,
    getters,
    state
};

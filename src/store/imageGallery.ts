import {ActionTree} from "vuex";
import {DB} from "@/main";


export interface IimageGallery{
    imageGallery:Array<string>
    title:string,
    created:string | Date,
    id?:string
}
interface ImageGalleryState{
    imageGallery: IimageGallery | null
}


export const state:ImageGalleryState = {
    imageGallery: null,
};

export const enum actionStringImageGallery{
    POST_GALLERY_SLIDER = 'postGallerySlider',
    GET_GALLERY_SLIDER = 'getGallerySlider',
    GET_GALLERY_BY_ID = 'getGalleryById'
}

export const actions: ActionTree<ImageGalleryState, any> = {

    postGallerySlider({commit, dispatch}, newImageGallery: IimageGallery): Promise<void> {

        const currentDate = new Date();
        const newObj = {images: newImageGallery.imageGallery, title: newImageGallery.title, created:currentDate}

        return new Promise((resolve, reject) => {

            console.log("inside prom", newObj)


            DB.collection("imageGallery").doc().set(newObj).then((res: any) => {
                resolve(res);
                dispatch(actionStringImageGallery.GET_GALLERY_SLIDER);
            }).catch((err: any) => {
                console.log(err);
                reject(err);
            })
        })
    },
    getGallerySlider({ commit }): Promise<Partial<IimageGallery>[]> {
        return new Promise((resolve, reject) => {
            let imageGallery: Partial<IimageGallery>[] = [];

            DB.collection("imageGallery")
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        let gallery: Partial<IimageGallery> = {
                            id: doc.id, // Add the document ID to the gallery object
                            ...doc.data(),
                        };
                        imageGallery.push(gallery);
                    });

                    resolve(imageGallery);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    getGalleryById({ commit }, galleryId): Promise<Partial<IimageGallery>> {
        console.log("GL ID", galleryId)
        return new Promise((resolve, reject) => {
            DB.collection("imageGallery")
                .doc(galleryId)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        const gallery: Partial<IimageGallery> = {
                            id: doc.id,
                            ...doc.data(),
                        };
                        resolve(gallery);
                    } else {
                        reject(new Error("Gallery not found"));
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },

}

export const imageGallery = {
    actions,
    state
};

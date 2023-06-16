import {ActionTree} from "vuex";
import {DB} from "@/main";


export interface IimageGallery{
    imageGallery:Array<string>
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
}

export const actions: ActionTree<ImageGalleryState, any> = {

    postGallerySlider({commit, dispatch}, newImageGallery: IimageGallery): Promise<void> {
        const newObj = {images: newImageGallery, title: "torger - test"}

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
    getGallerySlider({commit}): Promise<IimageGallery[]> {
        return new Promise((resolve, reject) => {

            let imageGallery: IimageGallery[] = [];

            DB.collection("imageGallery").get().then((doc) => {
                doc.forEach(res => {
                    let gallery: Partial<IimageGallery> = res.data();
                    console.log("data", gallery);
                    imageGallery.push(gallery as unknown as IimageGallery);
                });



                resolve(imageGallery);

            }).catch((err) => {
                reject(err);
                reject("error");

            });

        });


    },

}

export const imageGallery = {
    actions,
    state
};

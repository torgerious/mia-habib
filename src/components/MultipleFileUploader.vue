<script lang="ts">
import {Vue, Component, Emit, Prop} from 'vue-property-decorator';
import firebase from 'firebase/app'
import 'firebase/storage'
import { firestorePlugin } from 'vuefire'
import {Action} from "vuex-class";
import {actionStringImageGallery, IimageGallery} from "@/store/imageGallery";
@Component({})
export default class MultipleFileUploader extends Vue {
    @Action(actionStringImageGallery.POST_GALLERY_SLIDER) postGallerySlider: ((imageGallery: IimageGallery) => Promise<void>) | undefined;
    @Prop() value: string | undefined;

    images:Array<any> = [];
    previewImages:Array<any> = [];
    isDragging = false;
    message:string = 'Drag and drop images here or use button to the left.';
    dropMessage:string = 'Drop images here to upload.';
    uploadedUrls:IimageGallery | any = [];
    isLoading:boolean = false;




    onFileChange (event:any) {
        // Get the files from the input element
        const files = event.target.files

        // Loop through the files and add them to the images array
        for (let i = 0; i < files.length; i++) {
            this.images.push(files[i])

            // Read the file and create a preview URL
            const reader = new FileReader()
            reader.onload = (e) => {
                this.previewImages.push(e.target?.result)
            }
            reader.readAsDataURL(files[i])
        }
    }

    onDrop (event:any) {
        // Prevent default behavior (opening the file in the browser)
        event.preventDefault()

        // Get the files from the drop event
        const files = event.dataTransfer.files

        // Loop through the files and add them to the images array
        for (let i = 0; i < files.length; i++) {
            this.images.push(files[i])

            // Read the file and create a preview URL
            const reader = new FileReader()
            reader.onload = (e) => {

                this.previewImages.push(e.target?.result)
            }
            reader.readAsDataURL(files[i])
        }

        // Set isDragging to false
        this.isDragging = false
    }


    async postSlider(){
        this.isLoading = true;

        try {

            await this.uploadImages();

            console.log("dafuq", this.uploadedUrls);

            let payload: IimageGallery = {
                imageGallery:this.uploadedUrls, title:this.value as string, created:"",
            }


            if (this.postGallerySlider)
                await this.postGallerySlider(payload);
                this.$emit('success', 'Post gallery slider successful!'); // Emit the success event with the message

                this.isLoading = false;
        }catch (e){
            this.isLoading = false;
        }
    }


    async uploadImages() {
        const storage = firebase.storage();
        const uploadPromises = [];

        for (let i = 0; i < this.images.length; i++) {
            const file = this.images[i];
            const filename = Date.now() + '_' + file.name;
            const storageRef = storage.ref('imagegallery/' + filename);

            const uploadPromise = storageRef.put(file)
                .then(() => storageRef.getDownloadURL())
                .then(url => {
                    this.uploadedUrls.push(url);
                })
                .catch(error => {
                    console.error(error);
                });

            uploadPromises.push(uploadPromise);
        }

        // Wait for all uploads to complete
        await Promise.all(uploadPromises);

        this.images = [];
        this.previewImages = [];
    }


    mounted(): void {
        // Set up drag and drop event listeners
        const dropZone = this.$refs.drop
    }

}
</script>

<template>
    <div>
        <p>test {{value}}</p>
        <div class="drop-zone" ref="dropZone" @drop="onDrop" @dragover.prevent>
            <input type="file" multiple ref="fileInput" @change="onFileChange">
            <p v-if="!isDragging">{{ message }}</p>
            <p v-else>{{ dropMessage }}</p>
        </div>
        <div v-if="previewImages.length > 0">
            <h3>Preview:</h3>
            <div v-for="(image, index) in previewImages" :key="index">
                <img :src="image" style="max-width: 200px; max-height: 200px;">
            </div>
        </div>
        <button @click="postSlider" class="submit-btn">Upload Images</button>
    </div>
</template>

<style scoped lang="scss">

.submit-btn{
    cursor: pointer;
    padding: 0 20px;
    height: 35px;
    margin: 7px 0;
    background: #cbfff2;
    color: #002b20;
    border-radius: 5px;
    border: 2px solid #87edd3;
    font-weight: bold;
}

.drop-zone {
  border: 2px dashed gray;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 70px;
}

.drop-zone p {
  text-align: center;
}

.preview-images {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

.preview-image {
  max-width: 200px;
  max-height: 200px;
  margin: 10px;
}

.preview{
  display: inline-flex;
  margin: 10px;
  img{
    width:100px;
    height: 100px;
    object-fit: cover;
  }
}

</style>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import firebase from 'firebase/app'
import 'firebase/storage'
import { firestorePlugin } from 'vuefire'
@Component({})
export default class MultipleFileUploader extends Vue {

    images:Array<any> = [];
    previewImages:Array<any> = [];
    isDragging =false;
    message:string = 'Drag and drop images here or click to select images.';
    dropMessage:string = 'Drop images here to upload.';
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

    uploadImages () {
        // Get a reference to the storage service
        const storage = firebase.storage()

        // Loop through the images array and upload each image
        for (let i = 0; i < this.images.length; i++) {
            // Get a reference to the image file
            const file = this.images[i]

            // Create a unique filename for the image
            const filename = Date.now() + '_' + file.name

            // Get a reference to the image storage location
            const storageRef = storage.ref('imagegallery/' + filename)

            // Upload the image to the storage location
            storageRef.put(file)
                .then(() => {
                    console.log('Image uploaded successfully!')
                })
                .catch(error => {
                    console.error(error)
                })
        }

        // Clear the images and previewImages arrays
        this.images = []
        this.previewImages = []
    }


    mounted(): void {
        // Set up drag and drop event listeners
        const dropZone = this.$refs.drop
    }

}
</script>

<template>
    <div>
        <div class="drop-zone" ref="dropZone" @drop="onDrop" @dragover.prevent>
            <input type="file" multiple style="display: none;" ref="fileInput" @change="onFileChange">
            <p v-if="!isDragging">{{ message }}</p>
            <p v-else>{{ dropMessage }}</p>
        </div>
        <div v-if="previewImages.length > 0">
            <h3>Preview:</h3>
            <div v-for="(image, index) in previewImages" :key="index">
                <img :src="image" style="max-width: 200px; max-height: 200px;">
            </div>
        </div>
        <button @click="uploadImages">Upload Images</button>
    </div>
</template>

<style scoped lang="scss">

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

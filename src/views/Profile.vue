<template>
    <div>
        <h1>Admin panel</h1>

        <button @click="isShowingWorkForm = true">Post ny artikkel</button>

        <div v-if="isShowingWorkForm">
            <input type="text" placeholder="title" v-model="title">
            <select v-model="selected">
                <option v-for="(cate, i) in localCategory" :key="i">{{cate}}</option>
            </select>
            <input type="file" @change="onFileSelectIngress">
            <img v-if="previewIngressImageUrl !== ''" :src="previewIngressImageUrl"  alt="random">

            <div class="editor-wrapper">
                <vue-editor v-model="content"
                            useCustomImageHandler
                            @image-added="handleImageAdded">
                </vue-editor>
            </div>
            <button @click="addWork">Post</button>


        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import firebase from 'firebase';
    import {actionStringWork, Category, IWork} from "@/store/work";
    import {category} from "@/Types/Types";
    import { VueEditor } from "vue2-editor";
    import {STORAGE} from "@/main";
    import {Action} from "vuex-class";

    @Component({
        components: {VueEditor},
    })

    export default class Profile extends Vue {
        @Action(actionStringWork.POST_WORK) postWork: ((work: IWork) => void) | undefined;

        $router: any;
        isShowingWorkForm:boolean = false;
        localCategory:Category[] = category;
        selected:Category = Category.all;
        title:string = "";
        content:any = null;
        previewImageUrl:string = "";
        workToBePosted:IWork | null = null;
        selectedIngressFile:File | null | Blob = null;
        selectedIngressFileName:string = "";

        previewIngressImageUrl:string = "";


        async onUploadIngress():Promise<any>{
            // Create a root reference
            return new Promise((resolve, reject) => {
                let storageRef = STORAGE.ref();


                let uploadTask = storageRef.child( "work/" + this.selectedIngressFileName).put(this.selectedIngressFile as any);


                uploadTask.on('state_changed', function(snapshot:any){
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                }, function(error) {
                    // Handle unsuccessful uploads
                    reject(error);
                }, () => {
                    console.log("inside snapshotref func");
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>  {
                        console.log('File available at', downloadURL);
                        this.previewIngressImageUrl = downloadURL;
                        resolve(downloadURL);
                    });
                });

            });
        }

        onFileSelectIngress(event:any):void{
            console.log(event);
            this.selectedIngressFile = event.target.files[0];
            let filename = event.target.files[0].name;
            this.selectedIngressFileName = filename;
            if(filename.lastIndexOf('.')<= 0){
                return alert("please add a valid file");
            }
            const fileReader = new FileReader();
            fileReader.addEventListener('load', () => {
                this.previewIngressImageUrl = fileReader.result as string
            });
            fileReader.readAsDataURL(event.target.files[0]);
            this.previewIngressImageUrl = event.target.files[0]
        }


        async addWork():Promise<void>{
            let downloadURL = await this.onUploadIngress();

            this.workToBePosted = {category:this.selected, title:this.title, imageUrl:this.previewImageUrl, content:this.content, imageIngressUrl:downloadURL };

            if(this.postWork) {
                this.postWork(this.workToBePosted);
            }

            console.log("work", this.content);

        }
        handleImageAdded(file:any, Editor:any, cursorLocation:any) {

            return new Promise((resolve, reject) => {
                let storageRef = STORAGE.ref();

                console.log("file", file);

                let formData = new FormData();
                formData.append('image', file);

                console.log("formdata", formData);

                let uploadTask = storageRef.child( "work/" + file.name).put(file as any);

                uploadTask.on('state_changed', function(snapshot:any){
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                }, function(error) {
                    // Handle unsuccessful uploads
                    reject(error);
                }, () => {
                    console.log("inside snapshotref func");
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>  {
                        console.log('File available at', downloadURL);
                        this.previewImageUrl = downloadURL;
                        Editor.insertEmbed(cursorLocation, 'image', downloadURL);
                        resolve(downloadURL);
                    });
                });



            });

        }




        created(): void {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    console.log("USER IS LOGGED IN");
                    let uid = user.uid;
                    // ...
                } else {
                    // User is signed out
                    console.log("USER IS NOT LOGGED IN");
                    this.$router.push("/login");

                }
            });
        }
    }

</script>

<style lang="scss" scoped>
    .editor-wrapper{
        width:80%;
        margin:20px 10%;
    }
</style>

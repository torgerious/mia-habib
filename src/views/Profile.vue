<template>
    <div>
        <h1>Admin panel</h1>

        <button @click="isShowingWorkForm = true">Post ny artikkel</button>

        <div class="add-wrapper" v-if="isShowingWorkForm">
          <div class="content">
            <h3>Opprett ny artikkel</h3>
            <span @click="isShowingWorkForm = false">Exit</span>

            <p>Tittel</p>
            <input type="text" placeholder="title" v-model="title">

            <p>Kattegori</p>
            <select v-model="selected">
                <option v-for="(cate, i) in localCategory" :key="i">{{cate}}</option>
            </select>
            <p>Velg artikkel fremside bilde</p>

            <input type="file" @change="onFileSelectIngress">
            <img class="preview-image" v-if="previewIngressImageUrl !== ''" :src="previewIngressImageUrl"  alt="random">

            <div class="editor-wrapper">
                <vue-editor v-model="content"
                            useCustomImageHandler
                            @image-added="handleImageAdded">
                </vue-editor>
            </div>
            <button v-if="!loading" @click="addWork">Post</button>
            <p v-if="loading">uploading.. </p>
          </div>
        </div>

        <br>
        <loader v-if="loading"></loader>
      <p>articles </p>
      <div class="post-wrapper">
            <article
                    class="post"
                    v-for="(item, i) in work"
                    v-if="item.category === selectedFilter || selectedFilter === ''"
                    @click="navigate(item.title)">
                <img loading=lazy :src="item.imageIngressUrl" alt="ingress">
                <h4> {{item.title.substring(0,10)+".." }}</h4>
                <p><span>{{item.category}}</span></p>
                <button @click="editArticle(item.title)">Edit</button>
            </article>
        </div>

      <div v-if="isEditingArticle" class="add-wrapper">
        <div class="content" v-if="currentEditingArticle">
          <vue-editor v-model="currentEditingArticle.content"
                      useCustomImageHandler
                      @image-added="handleImageAdded">
          </vue-editor>
          <button>Update article</button>
        </div>
      </div>



    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import firebase from 'firebase';
    import {actionStringWork, Category, getterStringWork, IWork} from "@/store/work";
    import {category} from "@/Types/Types";
    import { VueEditor } from "vue2-editor";
    import {STORAGE} from "@/main";
    import {Action, Getter} from "vuex-class";
    import Loader from "@/components/loader.vue";

    @Component({
        components: {Loader, VueEditor},
    })

    export default class Profile extends Vue {
        @Action(actionStringWork.POST_WORK) postWork: ((work: IWork) => Promise<void>) | undefined;
        @Getter(getterStringWork.WORK) work: IWork[] | undefined;
        @Action(actionStringWork.GET_WORK) getWork: (() => Promise<IWork[]>) | undefined;
        @Action(actionStringWork.GET_WORK_BY_ID) getWorkById: ((workId: string) => Promise<IWork>) | undefined;



      // work:IWork[] = [];
        loading:boolean = false;
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
        selectedCategory:Category = Category.all;
        // localCategory:Category[] = category;
        selectedCategoryFilter:Category = Category.blank;
        isEditingArticle:boolean = false;
        previewIngressImageUrl:string = "";
        currentEditingArticle:IWork | null = null;


        get selectedFilter():string{
            if(this.selectedCategory === Category.all){
                this.selectedCategoryFilter = Category.blank
            } else{
                this.selectedCategoryFilter = this.selectedCategory;
            }

            return this.selectedCategoryFilter;
        }

        async editArticle(workId:string):Promise<void>{
            this.isEditingArticle = true;

            if(this.getWorkById){
              let editingArticle = await this.getWorkById(workId);
              this.currentEditingArticle = editingArticle;
              console.log("Article to edit", editingArticle);
            }


        }

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
            let date = new Date();
            date.toDateString();
            //Adding the date to get uniq name on photos.
            this.selectedIngressFileName = filename;
            this.selectedIngressFileName = this.selectedIngressFileName + date;
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
                this.loading = true;
                let res = await this.postWork(this.workToBePosted);
                console.log("res promise", res);
                this.loading = false;
                this.isShowingWorkForm = false;
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

        navigate():void{

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


            if(this.getWork){
                this.loading = true;
                this.getWork().then(res => {
                    // this.work = res;
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                })
            }


        }
    }

</script>

<style lang="scss" scoped>

  .add-wrapper{
    width: 100%;
    height: 100vh;
    position: fixed;
    background: #37373794;
    transition: 0.3s;
    z-index: 9999;
    top: 0;
    overflow-y: auto;
    .content{
      width:80%;
      margin:50px 10%;
      background: white;
      padding:40px 0;
      span{
        float: right;
        margin-top: -79px;
        margin-right: 2%;
        padding: 4px 12px;
        border-radius: 2px;
        background:#333;
        color:white;
      }
      h3{
        text-align: left;
        margin: 0px 10% 29px 10%;
      }
      input[type=text] {
        width: 40%;
        margin: 5px 50% 0% 10%;
        height: 30px;
        border-radius: 5px;
        font-size: 15px;
        text-indent: 5px;
        color: #333;
        border: 1px solid #333;
      }
      .preview-image{
        height:100px;
        width: auto;
        display: block;
        margin-left: 10%;
      }
      input[type=file]{
        width: 40%;
        margin: 5px 50% 0% 10%;
        height: 30px;
        border-radius: 5px;
        font-size: 15px;
        margin-top: 10px;
      }
      select{
        width: 41%;
        margin: 5px 50% 0% 10%;
        height: 30px;
        border-radius: 5px;
        font-size: 15px;
        text-indent: 5px;
        color: #333;
      }
      p{
        text-align: left;
        margin-left: 10%;
        margin-top: 9px;
        margin-bottom: 0;
      }

    }

  }


    .editor-wrapper{
        width:80%;
        margin:20px 10%;
    }

    .post-wrapper{
        width:80%;
        margin:0 auto;
        .post{
            width: 100%;
            background: #f8f8f8;
            border-radius: 5px;
            height: 50px;
            display: flex;
            margin: 8px 0px;
            box-shadow: -1px 0px 3px 0px #d3d3d3;
            padding: 0 10px;
            box-sizing: border-box;
            justify-content: space-between;
            transition: 0.3s;


            p{
                width: 133px;
                text-align: left;
            }

            img{
                width: 36px;
                height: 36px;
                margin-top: 7px;
                border-radius: 2px;
            }
            h4{
                width:117px;
                text-align: left;
            }
            span{
                background: #42b99b;
                border-radius: 20px;
                color: white;
                padding: 2px 10px;
            }
            button{
                padding: 0 20px;
                height: 35px;
                margin: 7px 0;
                background: #ffffff;
                color: black;
                border-radius: 5px;
                border: 2px solid #ececec;
                font-weight: bold;
                &:hover{
                    background: #333;
                    color:white;
                    transition: 0.3s;
                    cursor: pointer;
                }
            }
        }
    }

</style>

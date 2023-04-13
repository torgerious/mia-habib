<template>
    <div>
        <h1>Admin panel</h1>

<!--      <button class="post-btn" @click="isShowingWorkForm = true">Artikkler</button>-->
<!--      <button class="post-btn" @click="isShowingWorkForm = true">Kalender</button>-->

      <button class="post-btn" :class="{activeTab: activeTab === 1}" @click="activeTab = 1"> Artikler</button>
      <button class="post-btn" :class="{activeTab: activeTab === 2}" @click="activeTab = 2"> Kalender</button>
      <button class="post-btn" :class="{activeTab: activeTab === 3}" @click="activeTab = 3"> Presenters</button>


      <div class="add-wrapper" v-if="isShowingWorkForm">
          <div class="content">
            <h3>Opprett ny artikkel</h3>

            <div class="preview-container">
              <label for="preview">Huk av for forhåndsvisning</label><br>
              <input id="preview" type="checkbox" v-model="markedForPreview">
            </div>

            <span @click="isShowingWorkForm = false">Exit</span>

            <p>Tittel</p>
            <input type="text" placeholder="title" v-model="title">

            <p>Kattegori</p>
            <select v-model="selected">
                <option v-for="(cate, i) in localCategory" :key="i" v-if="cate !== 'all topics'">{{cate}}</option>
            </select>

            <p>Last opp en fil / teknisk rider</p>
            <input type="file" @change="handleFileUpload">

            <p v-if="selected !== 'films' ">Velg artikkel fremsidebilde</p>
            <p v-else>Last opp en video</p>

            <input type="file" @change="onFileSelectIngress">
            <img class="preview-image" v-if="previewIngressImageUrl !== ''" :src="previewIngressImageUrl"  alt="random">

            <div class="editor-wrapper" v-if="selected !== 'films'">
                <vue-editor v-model="content"
                            useCustomImageHandler
                            setupQuillEditor
                            :editorOptions="editorSettings"
                            @image-added="handleImageAdded">
                </vue-editor>
            </div>
            <button class="submit-btn" v-if="!loading" @click="addWork">Post</button>
            <p v-if="loading">uploading.. </p>
          </div>
        </div>


      <div class="add-wrapper" v-if="isShowingCalendarForm">
        <div class="content">
          <h3>Opprett ny Kalender event</h3>
          <span @click="isShowingCalendarForm = false">Exit</span>

          <p>Tittel</p>
          <input type="text" placeholder="title" v-model="calendarTitle">

          <p>Dato</p>
          <input type="date" v-model="calendarDate">

          <p>Kalender event tekst</p>
          <div class="editor-wrapper">
            <vue-editor v-model="calendarText"
                        :editor-toolbar="mediaToolBar"
                        useCustomImageHandler
                        @image-added="handleImageAdded">
            </vue-editor>
          </div>
          <button class="submit-btn" v-if="!loading" @click="addCalendarEvent">Post</button>
          <p v-if="loading">uploading.. </p>
        </div>
      </div>
        <br>
        <loader v-if="loading"></loader>

      <div class="content-wrapper">

        <!-- POSTS -->
        <div class="list-header" v-if="activeTab === 1">
          <button class="add" @click="isShowingWorkForm = true">legg til ny +</button>
          <p v-if="activeTab === 1">Articles </p>
        </div>
        <!--FILTER-->
        <div class="filter-wrapper"  v-if="activeTab === 1">
          <div class="filter">
            <div :style="[i === 0 ? {marginLeft:0} : {} ]" :class="{ 'active' : selectedCategory === cate }"  @click="setCategory(cate)" class="category" v-for="(cate, i) in localCategory" :key="i">
              <div>
                {{cate}}
              </div>
            </div>
          </div>
        </div>

      <div class="post-wrapper" v-if="activeTab === 1">
            <article
                    class="post"
                    v-for="(item, i) in work"
                    v-if="item.category === selectedFilter || selectedFilter === ''"
                    @click="navigate(item.title)">
                <img v-if="item.category !== 'films'" loading=lazy :src="item.imageIngressUrl" alt="ingress">
                <img v-else loading=lazy src="video.svg" alt="video">

                <h4> {{item.title.substring(0,10)+".." }}</h4>
                <p><span :class="item.category">{{item.category}}</span></p>
                <button @click="editArticle(item.title)">Edit</button>
            </article>
        </div>


        <!-- KALENDAR EVENTS -->
        <div class="list-header" v-if="activeTab === 2">
          <button class="add" @click="isShowingCalendarForm = true">legg til ny +</button>
          <p >Calendar events </p>
        </div>
        <div class="post-wrapper" v-if="activeTab === 2">
          <article
              class="post"
              v-for="(item, i) in calendarEvents">
            <p class="calendar-date"><span>{{item.date}}</span></p>
            <p>{{item.title}}</p>
            <div v-html="item.text.substring(0,10)+'..'"></div>
            <button @click="editCalendarEvent(item.id)">Edit</button>
          </article>
        </div>


      </div>


    <!-- EDITING WORK ARTICLE -->
      <div v-if="isEditingArticle" class="add-wrapper">
        <div class="content" v-if="currentEditingArticle">
          <button class="exit" @click="isEditingArticle = false">Exit</button>

          <button class="delete" @click="deleteArticle"> Delete article</button>

          <div class="preview-container">
            <label for="preview">Huk av/på forhåndsvisning</label><br>
            <input id="preview" type="checkbox" v-model="currentEditingArticle.markedForPreview">
          </div>

          <p>Tittel</p>
          <input type="text" placeholder="title" v-model="currentEditingArticle.title">

          <p>Kattegori</p>
          <select v-model="currentEditingArticle.category">
            <option v-for="(cate, i) in localCategory" :key="i" v-if="cate !== 'all topics'">{{cate}}</option>
          </select>

          <input type="file" @change="onFileSelectIngress">
          <div v-if="currentEditingArticle.category !== 'films'">
            <img class="preview-image" v-if="previewIngressImageUrl !== ''" :src="previewIngressImageUrl"  alt="random">
            <img class="preview-image" v-else :src="currentEditingArticle.imageIngressUrl"  alt="random">
          </div>
          <div v-else>
            <video class="preview-image" v-if="previewIngressImageUrl !== ''" :src="previewIngressImageUrl"></video>
            <video class="preview-image" v-else :src="currentEditingArticle.imageIngressUrl"></video>
          </div>


          <div class="editor-wrapper" v-if="currentEditingArticle.category !== 'films'">
            <vue-editor v-model="currentEditingArticle.content"
                        useCustomImageHandler
                        @image-added="handleImageAdded">
            </vue-editor>
          </div>
          <h3 v-if="loadingProgress">Upload is {{loadingProgress}} % done</h3>
          <button class="update-btn" @click="updateArticle(currentEditingArticle)">Update article</button>
        </div>
      </div>

    <!-- EDITING CALENDAR EVENT -->
      <div v-if="isEditingEvent" class="add-wrapper">
        <div class="content" v-if="isEditingEvent">
          <button class="exit" @click="isEditingEvent = false">Exit</button>

          <button class="delete" @click="deleteEvent"><span>🗑</span>Delete event</button>

          <p>Tittel</p>
          <input type="text" placeholder="title" v-model="currentEditingCalendarEvent.title">

          <p>Kattegori</p>
          <input type="date" v-model="currentEditingCalendarEvent.date">

          <div class="editor-wrapper">
            <vue-editor v-model="currentEditingCalendarEvent.text"
                        useCustomImageHandler
                        @image-added="handleImageAdded">
            </vue-editor>
          </div>
          <button class="update-btn" @click="updateEvent(currentEditingCalendarEvent)">Update calendar event</button>
        </div>
      </div>


    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import firebase from 'firebase';
import {actionStringWork, Category, getterStringWork, IWork} from "@/store/work";
import {category, noMediaToolbar} from "@/Types/Types";
import {VueEditor } from "vue2-editor";
import {STORAGE} from "@/main";
import {Action, Getter} from "vuex-class";
import Loader from "@/components/loader.vue";
import {actionStringCalendarEvent, getterStringCalendarEvent, ICalendarEvent} from "@/store/calendarEvent";


@Component({
        components: {Loader, VueEditor},
    })

    export default class Profile extends Vue {
        @Action(actionStringWork.POST_WORK) postWork: ((work: IWork) => Promise<void>) | undefined;
        @Getter(getterStringWork.WORK) work: IWork[] | undefined;
        @Action(actionStringWork.GET_WORK) getWork: (() => Promise<IWork[]>) | undefined;
        @Action(actionStringWork.GET_WORK_BY_ID) getWorkById: ((workId: string) => Promise<IWork>) | undefined;
        @Action(actionStringWork.UPDATE_WORK) updateWork: ((work:IWork) => Promise<IWork>) | undefined;
        @Action(actionStringCalendarEvent.POST_CALENDAR_EVENT) postCalendarEvent: ((calendarEvent: ICalendarEvent) => Promise<void>) | undefined;
        @Getter(getterStringCalendarEvent.CALENDAR_EVENTS) calendarEvents: IWork[] | undefined;
        @Action(actionStringCalendarEvent.GET_CALENDAR_EVENTS) getCalendarEvents: (() => Promise<ICalendarEvent[]>) | undefined;
        @Action(actionStringCalendarEvent.UPDATE_CALENDAR_EVENT) updateCalendarEvent:((calendar:ICalendarEvent) => Promise<ICalendarEvent>) | undefined;
        @Action(actionStringCalendarEvent.GET_CALENDAR_EVENTS_BY_ID) getCalendarEventsById:((calendarId:string) => Promise<ICalendarEvent>) | undefined;
        @Action(actionStringCalendarEvent.DELETE_CALENDAR_EVENT) deleteCalendarEvent:((calendarId:string) => Promise<any>) | undefined;
      @Action(actionStringWork.DELETE_WORK_BY_ID) deleteWorkById:((workId:string) => Promise<any>) | undefined;



      // work:IWork[] = [];
        editorSettings: {
          modules: {
            imageDrop: true;
            imageResize: {};
          };
        } | undefined
        mediaToolBar:Array<any> = noMediaToolbar;

        technicalRider:any;
        loading:boolean = false;
        $router: any;
        isShowingWorkForm:boolean = false;
        localCategory:Category[] = category;
        selected:Category = Category.projects;
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
        activeTab:number | null = null;
        isShowingCalendarForm:boolean = false;
        calendarTitle:string = "";
        calendarDate:string = "";
        calendarText:any = null;
        isEditingEvent:boolean = false;
        currentEditingCalendarEvent:ICalendarEvent | null = null;
        currentEditingEventId:string = "";
        loadingProgress:number | null = null;
        markedForPreview:boolean = false;
        isEditingThumbnail:boolean = false


  setCategory(category:Category):void{
    this.selectedCategory = category;
    this.selectedCategoryFilter = category;
  }


  @Watch('currentEditingArticle.imageIngressUrl')
  runThis(oldImage: any, newImage: any){
    console.log("OLD", oldImage)
    console.log("NEW", newImage)

  }



  async updateArticle(article:IWork):Promise<void>{


        console.log("updated art", article);
        if(this.isEditingThumbnail){
          article.imageIngressUrl = await this.onUploadIngress();
        }


        if(this.updateWork){
            let updateWork = await this.updateWork(article);
            this.isEditingArticle = false;
          }
        }

      async updateEvent(event:ICalendarEvent):Promise<void>{
        console.log("EVENT", event);
        event.id = this.currentEditingEventId;
        this.loading = true;
        if(this.updateCalendarEvent){
          let updatedEvent = await this.updateCalendarEvent(event);
          this.loading = false
          this.currentEditingEventId = "";
          this.isEditingEvent = false;
        }
      }


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

        async deleteEvent():Promise<void>{

          let deleteChoice = confirm("Are you sure you want to delete this article?");
          if (deleteChoice) {
            if(this.deleteCalendarEvent){
              let res = await this.deleteCalendarEvent(this.currentEditingEventId);
              this.isEditingEvent = false;
              console.log("local res del", res);
            }
          } else {

          }


        }

      async editCalendarEvent(eventId:string):Promise<void>{
        console.log("ID", eventId);
        this.currentEditingEventId = eventId;

        if(this.getCalendarEventsById) {
          this.currentEditingCalendarEvent = await this.getCalendarEventsById(eventId);
          this.isEditingEvent = true;

        }



        // if(this.getWorkById){
        //   let editingCalendar = await this.getWorkById(eventId);
        //   this.currentEditingCalendarEvent = editingCalendar;
        //   console.log("Article to edit", editingCalendar);
        // }
      }

    handleFileUpload(event:any):void{
      this.technicalRider = event.target.files[0]
    }

    async technicalRiderDownloadURL():Promise<any>{
      let storageRef = STORAGE.ref();
      const fileRef = storageRef.child(this.technicalRider.name)
      await fileRef.put(this.technicalRider)
      return await fileRef.getDownloadURL()
    }

        async onUploadIngress():Promise<any>{
            // Create a root reference
            return new Promise((resolve, reject) => {
                let storageRef = STORAGE.ref();


                let uploadTask = storageRef.child( "work/" + this.selectedIngressFileName).put(this.selectedIngressFile as any);


                uploadTask.on('state_changed', (snapshot:any) =>{
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.loadingProgress = progress;
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
                        this.loadingProgress = null;
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
            console.log("SET PREVIEW", this.previewIngressImageUrl);

           this.isEditingThumbnail = true;

        }




        async addWork():Promise<void>{
            let downloadURL = await this.onUploadIngress();
            let technicalRiderDownloadURL = await this.technicalRiderDownloadURL();

            this.workToBePosted = {
              category:this.selected,
              title:this.title,
              imageUrl:this.previewImageUrl,
              content:this.content,
              imageIngressUrl:downloadURL,
              markedForPreview:this.markedForPreview,
              rider:technicalRiderDownloadURL,
            };

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

        async deleteArticle():Promise<void>{
          let txt;
          let deleteChoice = confirm("Are you sure you want to delete this article?");
          if (deleteChoice) {
            console.log("Pressed ok", this.currentEditingArticle?.id)
            if(this.deleteWorkById){
              let res = await this.deleteWorkById(this.currentEditingArticle?.id as string);
              this.isEditingArticle = false;

            }
          } else {
            console.log("You pressed Cancel")

          }
        }

      async addCalendarEvent():Promise<void>{
        let calendarEventToBePosted:ICalendarEvent = {title:this.calendarTitle, date:this.calendarDate, text:this.calendarText};
        if(this.postCalendarEvent){
          let res = await this.postCalendarEvent(calendarEventToBePosted);
          this.isShowingCalendarForm = false;
          console.log("the res", res);
        }

      }

        created(): void {

            this.activeTab = 1;

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

            if(this.getCalendarEvents){
              this.loading = true;
              this.getCalendarEvents().then(res => {
                this.loading = false;
              }).catch(err => {
                this.loading = false;
              })
            }


        }
    }

</script>

<style lang="scss" scoped>

.update-btn{
  background: #4de1ff30;
  padding: 10px 13px;
  border-radius: 5px;
  border: 2px solid #25c0df40;
  cursor: pointer;
}
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

.filter-wrapper{
  display: inline-flex;
  width: 80%;
  justify-content: space-between;
  overflow: auto;
  padding: 5px 0;
  .filter{
    width: auto;
    margin-bottom: 20px;
    .category{
      margin: 0 5px;
    }
  }
}

.add{
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

.list-header{
  display: inline-flex;
  width: 80%;
  justify-content: space-between;
}

.post-btn{
  margin: 0 5px;
  padding: 9px 18px;
  background: none;
  border: none;
  color: #004e2e;
  font-weight: bold;
  cursor: pointer;
}
.activeTab{
  border-bottom: 2px solid #87edd3;
}

  .delete{
    float: right;
    margin: 0 10px;
    padding: 9px 12px;
    background: #ffcac0;
    border-radius: 5px;
    color: #a24747;
    font-weight: bold;
    border: 2px solid #eeb1a6;
    cursor: pointer;
    span{
      font-weight: 24px;
    }
  }
  .exit{
    float: right;
    margin: 0 80px 0 0;
    padding: 9px 12px;
    background: #333;
    border-radius: 5px;
    font-weight: bold;
    border: 2px solid #333;
    cursor: pointer;
    color:white;
  }

  .add-wrapper{
    width: 100%;
    height: 100vh;
    position: fixed;
    background: #37373794;
    transition: 0.3s;
    z-index: 9999;
    top: 0;
    overflow-y: auto;
    .preview-container{
      display: flex;
      width: 40%;
      margin: 5px 50% 39px 10%;
      input[type=checkbox]{
        margin-left: 10px;
        height: 16px;
        width: 16px;
        cursor: pointer;
      }
    }
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
      input[type=date] {
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
        .films{
          background: #ff8a8a !important;
        }
        .publications{
          background: #8f4779 !important;
        }
        .reviews{
          background: #ff9150 !important;
        }
        .performances{
          background: #ff3150 !important;
        }
        .interview{
          background: #ff3780 !important;
        }
        .media{
          background: #ff3780 !important;
        }
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
              padding: 4px 12px;
            }
          .calendar-date{
            width:200px;
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

<template>
    <div>
        <h1>Admin panel <span class="version">version 1.0.12</span></h1>

<!--      <button class="post-btn" @click="isShowingWorkForm = true">Artikkler</button>-->
<!--      <button class="post-btn" @click="isShowingWorkForm = true">Kalender</button>-->

      <button class="post-btn" :class="{activeTab: activeTab === 1}" @click="activeTab = 1"> Artikler</button>
      <button class="post-btn" :class="{activeTab: activeTab === 2}" @click="activeTab = 2"> Kalender</button>
      <button class="post-btn" :class="{activeTab: activeTab === 3}" @click="activeTab = 3"> Presenters</button>
      <button class="post-btn" :class="{activeTab: activeTab === 4}" @click="activeTab = 4"> Galleri slider</button>
      <button class="post-btn" :class="{activeTab: activeTab === 5}" @click="activeTab = 5"> Personer</button>


      <div class="add-wrapper" v-if="isShowingWorkForm">
          <div class="content">
            <h3>Opprett ny artikkel</h3>

            <div class="preview-container">
              <label for="preview">Huk av for forhåndsvisning</label><br>
              <input id="preview" type="checkbox" v-model="markedForPreview">
            </div>

            <span @click="exitModal">Exit</span>

            <p>Tittel</p>
            <input type="text" placeholder="title" v-model="title">

            <p>Kategori</p>
            <select v-model="selected">
                <option v-for="(cate, i) in localCategory" :key="i" v-if="cate !== 'all projects'">{{cate}}</option>
            </select>


            <p>Prioriter rekkefølge (1 = øverst)</p>
            <input type="number" placeholder="Prioritet" v-model="priority">

            <p>Velg et bildegalleri</p>
            <select v-model="selectedGallery">
                <option v-for="(slider, i) in gallerySlideList" :key="i" :value="slider.id">
                    {{slider.title}}
                </option>
            </select>


              <p>Velg relaterte artikler (CTRL / CMD  + klikk) for å velge flere</p>
              <select class="related-articles" v-model="selectedRelatedArticles" multiple>
                  <option v-for="(slider, i) in work" :key="i" :value="slider.title">
                      {{ slider.title }}
                  </option>
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

        <div class="add-wrapper" v-if="isShowingGalleryForm">
            <div class="content">
                <h3>Opprett nytt bildegalleri</h3>
                <span @click="isShowingGalleryForm = false">Exit</span>

                <p>Galleri slider tittel</p>
                <input type="text" placeholder="title" v-model="gallerySliderTitle">

                <MultipleFileUploader @success="handleUploadSuccess" v-model="gallerySliderTitle" ></MultipleFileUploader>

<!--                <button class="submit-btn" v-if="!loading" @click="addGallerySlider">Post</button>-->
                <p v-if="loading">uploading.. </p>
            </div>
        </div>


        <br>
        <loader v-if="loading"></loader>

      <div class="content-wrapper">

        <!-- POSTS -->
        <div class="list-header" v-if="activeTab === 1">
          <button class="add" @click="addNew">legg til ny +</button>
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
                <img v-if="item.category !== 'films'"  :src="item.imageIngressUrl" alt="ingress">
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

            <p>Prioritet rekkefølge (1 = øverst)</p>
            <input type="number" placeholder="Prioritet" v-model="currentEditingArticle.priority">

          <p>Kategori</p>
          <select v-model="currentEditingArticle.category">
            <option v-for="(cate, i) in localCategory" :key="i" v-if="cate !== 'all topics'">{{cate}}</option>
          </select>

            <p>Bildegalleri</p>
            <select v-model="selectedGallery" @change="handleGalleryChange">
                <option v-for="(slider, i) in gallerySlideList" :key="i" :value="slider.id">
                    {{slider.title}}
                </option>
            </select>


            <p>Velg relaterte artikler (CTRL / CMD  + klikk) for å velge flere</p>
            <select class="related-articles" v-model="selectedRelatedArticles"  @change="handleRelatedArticleChange" multiple>
                <option v-for="(slider, i) in work" :key="i" :value="slider.title">
                    {{ slider.title }}
                </option>
            </select>

<!--            <button @click="postSelectedGal">test</button>-->


          <input type="file" @change="onFileSelectIngress">
          <div v-if="currentEditingArticle.category !== 'films'">
              <template v-if="previewIngressImageUrl !== ''">
                  <p>ny thumbnail</p>
                <img class="preview-image"  :src="previewIngressImageUrl"  alt="random">
              </template>
              <template v-else>
                <img class="preview-image" :src="currentEditingArticle.imageIngressUrl"  alt="random">
              </template>
              <h1>hello</h1>
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

          <p>Kategori</p>
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


    <!--  GALLERY SLIDER -->
        <div class="list-header" v-if="activeTab === 4">
            <button class="add" @click="isShowingGalleryForm = true">legg til ny +</button>
            <p >Galleri slider</p>
        </div>
        <div class="post-wrapper" v-if="activeTab === 4">
            <article
                    class="post"
                    v-for="(item, i) in this.gallerySlideList">
                <p class="calendar-date"><span>{{item.title}}</span></p>
                <div class="image-list">
                  <img  v-for="img in item.images" :src="img"  :alt="item.title"/>
                </div>
                <button @click="deleteGallerySlider(item.id)">Slett</button>
            </article>
        </div>


        <!-- PEOPLE LIST -->
        <div class="list-header" v-if="activeTab === 5">
          <button class="add" @click="isShowingNewPersonForm = true">legg til ny +</button>
          <p >Personer</p>
        </div>
        <div class="post-wrapper" v-if="activeTab === 5">
          <article
                  class="post"
                  v-for="(people, i) in this.people" :key="people.id">
              <p class="calendar-date">{{people.name}}</p>
              <p class="calendar-date prevent-break-line"><span>{{people.profession}}</span></p>
              <button @click="openEditPersonBox(people)">Edit</button>
          </article>
        </div>

      <!-- EDITING PERSON -->
      <div v-if="isEditingPerson" class="add-wrapper">
        <div class="content" v-if="isEditingPerson">
          <button class="exit" @click="isEditingPerson = false">Exit</button>

          <button class="delete" @click="deletePerson(currentEditingPerson)"><span>🗑</span>Delete person</button>

          <p>Name</p>
          <input type="text" placeholder="Name" v-model="currentEditingPerson.name">

          <p>Profession</p>
          <input type="text" placeholder="Profession" v-model="currentEditingPerson.profession">

          <p>Upload image</p>
          <input type="file" @change="onPersonImageUpload">
          <img class="preview-image" v-if="previewImageUrl" :src="previewImageUrl" alt="random" />

          <div class="editor-wrapper">
            <vue-editor v-model="currentEditingPerson.description"
                        useCustomImageHandler
                        @image-added="handleImageAdded">
            </vue-editor>
          </div>
          <button class="update-btn" @click="editPerson()">Update person</button>
        </div>
      </div>
     
      <!-- ADD NEW PERSON FORM -->
      <div class="add-wrapper" v-if="isShowingNewPersonForm">
        <div class="content">
          <h3>Opprett ny person</h3>
          <span @click="isShowingNewPersonForm = false">Exit</span>

          <p>Name</p>
          <input type="text" placeholder="Name" v-model="title">

          <p>Profession</p>
          <input type="text" placeholder="Profession" v-model="subTitle">

          <p>Upload image</p>
          <input type="file" @change="onPersonImageUpload">
          <img class="preview-image" v-if="previewImageUrl" :src="previewImageUrl" alt="random" />

          <div class="editor-wrapper">
            <vue-editor v-model="content"
                        useCustomImageHandler
                        @image-added="handleImageAdded">
            </vue-editor>
          </div>

          <button class="submit-btn" v-if="!loading" @click="addPerson()">Post</button>
          <p v-if="loading">uploading.. </p>
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
import MultipleFileUploader from "@/components/MultipleFileUploader.vue";
import {actionStringImageGallery, IimageGallery} from "@/store/imageGallery";
import { actionStringPeople, getterStringPeople, IPeople } from '@/store/people';


@Component({
        components: {MultipleFileUploader, Loader, VueEditor},
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
        @Action(actionStringWork.DELETE_GALLERY_BY_ID) deleteGalleryById:((id:string) => Promise<any>) | undefined;
        @Getter(getterStringPeople.PEOPLE) people!: IPeople[];
        @Action(actionStringPeople.GET_PEOPLE) getPeople: () => Promise<void>;
        @Action(actionStringPeople.POST_PEOPLE) postPeople: (newPeople: IPeople) => Promise<void>;
        @Action(actionStringPeople.DELETE_PEOPLE) deletePeople: (peopleId: string) => Promise<void>;
        @Action(actionStringPeople.UPDATE_PEOPLE) updatePeople: (updatedPeople: IPeople) => Promise<void>;

        @Action(actionStringImageGallery.POST_GALLERY_SLIDER) postGallerySlider: ((imageGallery: IimageGallery) => Promise<void>) | undefined;
        @Action(actionStringImageGallery.GET_GALLERY_SLIDER) getGallerySlider: (() => Promise<IimageGallery[]>) | undefined;



      // work:IWork[] = [];

        mediaToolBar:Array<any> = noMediaToolbar;
        gallerySliderTitle: string = "";
        technicalRider:any;
        loading:boolean = false;
        $router: any;
        isShowingWorkForm:boolean = false;
        localCategory:Category[] = category;
        selected:Category = Category.performances;
        selectedGallery:string = "";
        title:string = "";
        subTitle:string = "";
        content:any = null;
        previewImageUrl:string = "";
        workToBePosted:IWork | null = null;
        selectedIngressFile:File | null | Blob = null;
        selectedIngressFileName:string = "";
        selectedCategory:Category = Category.all;
        selectedCategoryFilter:Category = Category.blank;
        isEditingArticle:boolean = false;
        previewIngressImageUrl:string = "";
        currentEditingArticle:IWork | null = null;
        activeTab:number | null = null;
        isShowingCalendarForm:boolean = false;
        isShowingGalleryForm:boolean = false;
        isShowingNewPersonForm:boolean = false;
        isEditingPerson:boolean = false;
        currentEditingPerson:IPeople|null = null;
        calendarTitle:string = "";
        calendarDate:string = "";
        calendarText:any = null;
        isEditingEvent:boolean = false;
        currentEditingCalendarEvent:ICalendarEvent | null = null;
        currentEditingEventId:string = "";
        loadingProgress:number | null = null;
        markedForPreview:boolean = false;
        isEditingThumbnail:boolean = false
        gallerySlideList:IimageGallery[] = [];
        selectedRelatedArticles:any = [];
        priority:number = 0;


        addNew(){
            this.previewIngressImageUrl = "";
            this.isShowingWorkForm = true
        }

  setCategory(category:Category):void{
    this.selectedCategory = category;
    this.selectedCategoryFilter = category;
  }

    async handleUploadSuccess(success: any){
        console.log("success ??", success);
        if(success){
            this.isShowingGalleryForm = false;
            await this.fetchGallerySlider();

        }
    }

    async handleImageUrls(imageUrls:any){
            console.log("iamgeurls", imageUrls)
        if(this.postGallerySlider)
        await this.postGallerySlider(imageUrls);
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



            this.previewIngressImageUrl = "";
            this.isEditingThumbnail = false;



            // this.previewImageUrl = "";
            this.isEditingArticle = true;


            if(this.getWorkById){
              let editingArticle = await this.getWorkById(workId);
              console.log("editingArticle", editingArticle)
              this.currentEditingArticle = editingArticle;
              // this.previewIngressImageUrl = this.currentEditingArticle.imageIngressUrl;
              //   this.imageIngressUrl
              this.selectedGallery = editingArticle.imageGallerySlider as string
              if(editingArticle?.relatedArticles.length > 0){
                  this.selectedRelatedArticles = await this.fetchWorkForIds(editingArticle?.relatedArticles)
              }

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


    async onPersonImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        try {
          let storageRef = STORAGE.ref();
          let uploadTask = storageRef.child("people/" + file.name).put(file);

          uploadTask.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          }, (error) => {
            console.error("Error uploading the image:", error);
          }, async () => {
            let downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            console.log('Person image available at', downloadURL);
            this.previewImageUrl = downloadURL;
          });
        } catch (error) {
          console.error("Error uploading person image:", error);
        }
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

    exitModal():void{
            this.isShowingWorkForm = false;
            this.clearForm();
    }

    async technicalRiderDownloadURL():Promise<any>{
            console.log(this.technicalRider)
            if(this.technicalRider !== undefined){
                let storageRef = STORAGE.ref();
                const fileRef = storageRef.child(this.technicalRider.name)
                await fileRef.put(this.technicalRider)
                return await fileRef.getDownloadURL()
            } else{
                return null;
            }
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

        clearForm():void{
            this.technicalRider = null;
            this.title = "";
            this.content = null;
            this.previewImageUrl = "";
            this.workToBePosted = null;
            this.selectedIngressFile = null;
            this.selectedIngressFileName = "";
            this.markedForPreview = false;
            this.selectedRelatedArticles = [];
            this.priority = 0;
        }

    async  fetchWorkForIds(Ids:Array<string>) {
        const responseArray = [];

        for (const id of Ids) {
            console.log("IDS", id)

            try {
                if(this.getWorkById){
                    const res = await this.getWorkById(id)
                    console.log("RES", res)
                    responseArray.push(res);
                }
            } catch (error) {
                console.error(`Error fetching data for ID ${id}:`, error);
            }
        }

        return responseArray;
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
              imageGallerySlider:this.selectedGallery,
              relatedArticles: this.selectedRelatedArticles,
              priority: this.priority
            };

            if(this.postWork) {
                this.loading = true;
                let res = await this.postWork(this.workToBePosted);
                console.log("res promise", res);
                this.loading = false;
                this.isShowingWorkForm = false;
                this.previewIngressImageUrl = '';
                this.clearForm();
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


    async deleteGallerySlider(id:string):Promise<void>{
        let txt;
        let deleteChoice = confirm("Are you sure you want to delete this slider?");
        if (deleteChoice) {

            if(this.deleteGalleryById){
                let res = await this.deleteGalleryById(id);
                await this.fetchGallerySlider();
            }
        } else {
            console.log("You pressed Cancel")
        }
    }

    async deletePerson(person:IPeople):Promise<void>{
      let deletePerson = confirm("Are you sure you want to delete this person?");
      if (deletePerson) {
        await this.deletePeople(person.id);
        this.isEditingPerson = false;
        if (person.image !== ''){
          const imageRef = STORAGE.refFromURL(person.image);
          await imageRef.delete();
        }
      }
    }
   
    openEditPersonBox(people: IPeople) {
      this.currentEditingPerson = people
      this.isEditingPerson = true
    }

    async editPerson():promise <void> {
      this.currentEditingPerson.image = this.previewImageUrl

      if (this.currentEditingPerson.name === '') {
        alert('Missing name field')
      }
      else {
        await this.updatePeople(this.currentEditingPerson)
        this.isEditingPerson = false
      }
    }

    async addPerson() {
      let person = {
          name: this.title,
          profession: this.subTitle,
          description: this.content,
          image: this.previewImageUrl,
        }
        if (person.name === ''){ alert('Missing name field') }
        else {
          await this.postPeople(person)
          this.isShowingNewPersonForm = false
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

    async addGallerySlider():Promise<void>{
        // let calendarEventToBePosted:ICalendarEvent = {title:this.calendarTitle, date:this.calendarDate, text:this.calendarText};
        // if(this.postCalendarEvent){
        //     let res = await this.postCalendarEvent(calendarEventToBePosted);
        //     this.isShowingCalendarForm = false;
        //     console.log("the res", res);
        // }
    }
    handleRelatedArticleChange():void{
      console.log("Running..", this.selectedRelatedArticles)
        if(this.currentEditingArticle){
            this.currentEditingArticle.relatedArticles = this.selectedRelatedArticles;
        }

        console.log("Running..", this.currentEditingArticle)

    }

    handleGalleryChange():void{
      console.log(this.selectedGallery);

      if(this.currentEditingArticle){
        this.currentEditingArticle.imageGallerySlider = this.selectedGallery;
      }
    }

    async fetchGallerySlider():Promise<void>{
        if (this.getGallerySlider) {
            this.loading = true;
            try {
                const res = await this.getGallerySlider();
                this.loading = false;
                //
                // // Create a copy of the res array and sort the copy
                // const sorted = [...res].sort((a: any, b: any) => {
                //     const dateA: any = new Date(a.created.seconds * 1000 + a.created.nanoseconds / 1000000);
                //     const dateB: any = new Date(b.created.seconds * 1000 + b.created.nanoseconds / 1000000);
                //     return dateB - dateA;
                // });


                this.gallerySlideList = res;

                console.log("wtf", this.gallerySlideList)




            } catch (err) {
                this.loading = false;
            }
        }
    }


        async created(): Promise<void> {

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

            // FETCH PEOPLE DB
            if (this.getPeople) {
                this.loading = true;
                this.getPeople().catch(err => {
                  console.error('Error fetching people:', err);
                });
                this.loading = false;
            }

            if (this.getWork) {
                this.loading = true;
                this.getWork().then(res => {
                    // this.work = res;
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                })
            }

            if (this.getCalendarEvents) {
                this.loading = true;
                this.getCalendarEvents().then(res => {
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                })
            }

            await this.fetchGallerySlider();


        }
    }

</script>

<style lang="scss" scoped>

.related-articles{
  height: 100px !important;
}

.version{
  color:gray;
  font-size: 12px;
  display: block;
}

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
      input[type=date], input[type=number] {
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
      .image-list{
        display: flex;
        img{
          width: 30px;
          height: 30px;
          object-fit: cover;
          margin:2px;
        }
      }

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

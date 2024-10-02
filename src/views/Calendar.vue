<template>
  <div>
    <header-bar :hasBackground="true"></header-bar>
    <div class="wrapper">
      <div class="bread-crumbs">
        <router-link tag="span" to="/"> Home</router-link> /
        <router-link tag="span" to="/Calendar" class="active-link"> Calendar</router-link>
      </div>
    </div>
    <h1>Calendar</h1>
    <p>My upcoming events</p>
    <div class="calendar">

    <div v-for="(event, i) in calendarEvents" :key="i" class="timeline">
      <div class="left">
        <div v-if="oddOrEven(i +1) === 'odd'">
          <p class="date">{{event.date}}</p>
          <div class="text">
            <p class="title">{{event.title}}</p>
            <div v-html="event.text"></div>
          </div>
        </div>
      </div>

      <div class="right">

        <div v-if="oddOrEven(i +1) === 'even'">
          <p class="date">{{event.date}}</p>
          <div class="text">
            <p class="title">{{event.title}}</p>
            <div v-html="event.text"></div>
          </div>
        </div>
      </div>


    </div>
  </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Action} from "vuex-class";
import {actionStringWork, IWork} from "@/store/work";
import HeaderBar from "@/components/HeaderBar.vue";
import Loader from "@/components/loader.vue";
import {actionStringCalendarEvent, ICalendarEvent} from "@/store/calendarEvent";
import {formatDate} from "@/Types/formatDateHelper";

@Component({
  components: {Loader, HeaderBar},
})

export default class Article extends Vue {
  @Action(actionStringCalendarEvent.GET_CALENDAR_EVENTS) getCalendarEvents: (() => Promise<ICalendarEvent[]>) | undefined;

  calendarEvents:ICalendarEvent[] | null = null;

  oddOrEven(num:number):string{
    return num & 1 ? "odd" : "even"
  }

  async created(): Promise<void> {
    if(this.getCalendarEvents) {
      const tempCalendar = await this.getCalendarEvents();
        this.calendarEvents = tempCalendar.reverse();
    }

  }
}

</script>
<style lang="scss" scoped>

.wrapper{
  max-width: 1100px;
  @media only screen and (max-width: 1100px) {
    width:95% !important;
    margin:0 2.5%;
  }
}

.bread-crumbs{
  left: 0;
  width: 109px;
  display: flex;
  margin: 20px 0px;
  justify-content: space-between;
  span{
    cursor: pointer;
    font-weight: bold;

    &:hover{
      text-decoration: underline;
    }
  }
}

.calendar{
  margin:100px 0;
}
h1{
  margin-top: 50px;
}

.timeline{
  min-height: 230px;
  width: 60%;
  margin: 0 auto;
  display: flex;
  @media only screen and (max-width: 1000px) {
    width:95%;
  }

  .left{
    width: 50%;
    min-height: 200px;
    border-right: 2px solid black;
    .date{
      text-decoration: underline;
      text-decoration-color: #87edd3;
      font-weight: bold;
      font-size: 20px;
      background: #87edd3;
      //margin-right: -124px;
      float:right;
      display: inline-grid;
      width: max-content;
      padding: 4px 15px;
      margin-right: -2px;
      border-bottom-left-radius: 21px;
      border-top-left-radius: 21px;
      border-right: 2px solid;
      @media only screen and (max-width: 1100px) {
        font-size: 17px;
      }
    }
    .title{
      font-weight: bold;
      font-size: 18px;
    }
    .text{
      text-align: left;
      margin-left: 20px;
      padding-right: 5px;
      display: inline-block;
      width:90%;
      @media only screen and (max-width: 1100px) {
        margin-left: 13px;
      }
    }
  }


  .right{
    width:50%;
    min-height: 200px;
    .date{
      text-decoration: underline;
      text-decoration-color: #87edd3;
      font-weight: bold;
      font-size: 20px;
      left: -20px;
      background: #87edd3;
      width: max-content;
      margin-left: -2px;
      padding: 4px 15px;
      margin-bottom: 1px;
      border-bottom-right-radius: 21px;
      border-top-right-radius: 21px;
      border-left: 2px solid;
      @media only screen and (max-width: 1100px) {
        font-size: 17px;
      }
    }
    .title{
      font-weight: bold;
      font-size: 18px;
    }
    .text{
      text-align: left;
      margin-left: 20px;
    }
  }
}

</style>

"use strict";
/**
 * @param someDate | string | Date
 * @param formatSpaceType | FormatSpaceType | undefined
 **/

export enum FormatSpaceType {
    DOT = 'dot',
    LINE = 'line',
    SLASH = 'slash',
    IGNORE = 'ingore'
}

export function formatDate(someDate:string | Date, formatSpaceType?:FormatSpaceType, textMonth?:boolean):string{
    let formattedDateAsString:string = '';
    let parsedDate:string = someDate.toString();
    let date:number = new Date(parsedDate).getDate();
    let month:number = new Date(parsedDate).getMonth() +1;
    let monthAsString = castMonthFromNumberToStringName(month);
    let year:number = new Date(parsedDate).getFullYear();
    let addedZeroToDate = date < 10 ?  "0" :  "";
    let addedZeroToMonth = month < 10 ?  "0" :  "";


    if(typeof(formatSpaceType) === "undefined") {
        formatSpaceType = FormatSpaceType.DOT;
        formattedDateAsString = addedZeroToDate + date  + "." + addedZeroToMonth + month + "." + year;
    }

    if(textMonth){
        formattedDateAsString = addedZeroToDate + date + " " + monthAsString + " " + year
    }

    if(formatSpaceType === FormatSpaceType.DOT){
        formattedDateAsString = addedZeroToDate + date  + "." + addedZeroToMonth + month + "." + year;
    }

    if(formatSpaceType === FormatSpaceType.LINE){
        formattedDateAsString = addedZeroToDate + date  + "-" + addedZeroToMonth + month + "-" + year;
    }

    if(formatSpaceType === FormatSpaceType.SLASH){
        formattedDateAsString =  addedZeroToDate + date  + "/" + addedZeroToMonth + month + "/" + year;
    }

    return formattedDateAsString;
}

export function formatTime(hour:string | number, minute:string | number):string{
    let formattedTimeAsString:string = '';
    let localHour:number;
    let localMinute:number;

    //cast to number
    localHour = hour as number;
    localMinute = minute as number;

    //Add zero logic
    let addedZeroToHour = localHour < 10 ?  "0" :  "";
    let addedZeroToMinute = localMinute < 10 ?  "0" :  "";

    formattedTimeAsString =  addedZeroToHour + localHour  + ":" + addedZeroToMinute + localMinute;

    return formattedTimeAsString;
}


export function castMonthFromNumberToStringName(dateNumber:number):string{

    let monthAsString:string  = "";

    if(dateNumber ===   1 ) monthAsString = 'Januar';
    if(dateNumber ===  2 ) monthAsString = 'Februar';
    if(dateNumber ===  3 ) monthAsString = 'Mars';
    if(dateNumber ===  4 ) monthAsString = 'April';
    if(dateNumber ===  5 ) monthAsString = 'Mai';
    if(dateNumber ===  6 ) monthAsString = 'Juni';
    if(dateNumber ===  7 ) monthAsString = 'Juli';
    if(dateNumber ===  8 ) monthAsString = 'August';
    if(dateNumber ===  9 ) monthAsString = 'September';
    if(dateNumber === 10 ) monthAsString = 'Oktober';
    if(dateNumber === 11 ) monthAsString = 'November';
    if(dateNumber === 12 ) monthAsString = 'Desember';

    return monthAsString;
}

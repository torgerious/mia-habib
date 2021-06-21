"use strict";


import {Category} from "@/store/work";

export const category:Category[] = [Category.all, Category.projects, Category.performances, Category.films, Category.publications, Category.interview, Category.media, Category.reviews];
export const workCategory:Category[] = [Category.all, Category.projects, Category.performances, Category.films, Category.publications];
export const pressCategory:Category[] = [ Category.media, Category.interview, Category.reviews];
export const noMediaToolbar = [
    [{ header: [false, 1, 2, 3, 4, 5, 6] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" }
    ],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    ["link"],
    ["clean"] // remove formatting button
];


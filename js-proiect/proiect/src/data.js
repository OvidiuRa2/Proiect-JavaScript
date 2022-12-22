"use strict";
let data = [];

if (JSON.parse(localStorage.getItem("tasks"))) {
    data = JSON.parse(localStorage.getItem("tasks"));
}
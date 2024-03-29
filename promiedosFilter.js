// ==UserScript==
// @name         Filtro Promiedos
// @namespace    http://tampermonkey.net/
// @version      2024-03-23
// @description  try to take over the world!
// @author       Laureano Kronemberger
// @match        https://www.promiedos.com.ar/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const hideMenues = [
        {
            menu: "Ligas",
            hide: ["Chile", "Liga MX", "Leagues", "Paraguay", "Uruguay", "Colombia", "Eredivisie"]
        },
        {
            menu: "Argentina",
            hide: ["B Metro", "Primera C", "Prom. Amateur"]
        },
        {
            menu: "Copas Int.",
            hide: ["Conference", "Copas AFC", "Copas CAF", "Copas OFC"]
        }
    ]
    const leaguesToHide = [
        {name: "PRIMERA NACIONAL"},
        {name: "B METRO"},
        {name: "PRIMERA C"},
        {name: "PROM. AMATEUR"},
        {name: "LIGA URUGUAY"},
        {name: "LIGA COLOMBIA"},
        {name: "LIGA CHILE"},
        {name: "LIGA MEXICO"},
        {name: "LIGA PARAGUAY"},
        {name: "EREDIVISIE"},
        {name: "MLS", show: ["Inter Miami"]},
        {name: "LIGA FRANCIA", show: ["PSG", "Marsella", "Lens"]},
        {name: "FEDERAL A", show: ["Olimpo", "Villa Mitre", "Sansinena (GC)"], hideGoals: true},
        {name: "RESERVA", show: ["Boca Juniors", "River Plate", "Racing Club", "San Lorenzo", "Independiente"], hideGoals: true},
        {name: "FEMENINO", show: ["Boca Juniors", "River Plate", "Racing Club", "San Lorenzo", "Independiente"], hideGoals: true},
        {name: "BUNDESLIGA", show: ["B. Leverkusen","Bayern Munich","Stuttgart","B. Dortmund"]}];

    let goalsToHide = [] //La página va recargando los goles, entonces reaparecen los de las ligas parcialmente ocultas.
    let goalsToShow = []

    Array.from(document.querySelectorAll("[name='novi'], [name='vi']"))
    .forEach(table => {
        leaguesToHide.forEach(league => {
            let titulo = table.querySelector(".tituloin")
            if(titulo && titulo.innerHTML.includes(league.name)){
                if(!league.show){
                    table.style.display = "none"
                } else {
                    let someMatchToShow = false
                    let matches = table.querySelectorAll("[name='nvp'], [name='vp']")
                    Array.from(matches).forEach(match => {
                        let teams = Array.from(match.querySelectorAll(".game-t1"))
                        let showMatch = teams.some(team => league.show.some(teamToShow => team.innerHTML.includes(teamToShow)))
                        let goals = document.getElementById("gole_" + match.id)
                        if(!showMatch) {
                            if(goals) {
                                goalsToHide.push(goals)
                            }
                            match.style.display = "none"
                        } else {
                            if(goals && !league.hideGoals) {
                                goalsToShow.push(goals)
                            }
                            someMatchToShow = true
                        }
                    })
                    if(!someMatchToShow) table.style.display = "none"
                }
            }
        })
    })

    goalsToShow.forEach(goal => {
        goal.style.display = "revert"
    })

    setInterval(()=> {
        goalsToHide.forEach(goal => {
            goal.style.display = "none"
        })
    }, 3000)

    let uls = document.querySelectorAll(".items-menu")

    for(let menu of hideMenues){
        var ul = Array.from(uls).find(ul => {
           if(ul.previousElementSibling){
               if(ul.previousElementSibling.innerHTML.includes(menu.menu)){
                   return ul;
               }
           }
       })
       Array.from(ul.children).filter(li => menu.hide.some(hm => li.innerHTML.includes(hm))).forEach(li => {li.style.display = "none"})
    }
})();

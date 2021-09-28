
//Build Tabulator
var table = new Tabulator("#table-bordered", {
    ajaxURL:"https://n6dfpq.apps.connect.claris.com/api/webhook/v1/dublist/catch",
    ajaxConfig : {
        mode:"cors", //set request mode to cors
        credentials: "same-origin", //send cookies with the request from the matching origin
        headers: {
            "Accept": "application/json", //tell the server we need JSON back
            "X-Requested-With": "XMLHttpRequest", //fix to help some frameworks respond correctly to request
            "Content-type": 'application/json; charset=utf-8', //set the character encoding of the request

        }},
    layout: "fitColumns",
    columnHeaderSortMulti: true,
    headerSortTristate: true, //enable tristate header sort for all columns
    autoColumns: false,
    movableColumns: true, //allow column order to be changed
    
    //SOME DISABLED OPTIONS HERE//
    //resizableRows: true,
    //height:800, // set height of table to enable virtual DOM
    //maxHeight:"100%",
    //clipboard:true,   

    placeholder: "Awaiting Data, Please Load File",

    initialSort: [{
            column: "fieldData.series_name",
            dir: "asc"
        }
    ],

    // APPLY CUSTOM FORMATTING PER EACH SERIES IN THE ROW
    rowFormatter: function (row) {
        if (row.getData().fieldData.series_name == "RAW") {
            row.getElement().classList.add("raw"); //mark rows with age greater than or equal to 18 as successful;
        } else if (row.getData().fieldData.series_name == "SMACKDOWN") {
            row.getElement().classList.add("sd"); //mark rows with age greater than or equal to 18 as successful;
        } else if (row.getData().fieldData.series_name == "NXT") {
            row.getElement().classList.add("nxt"); //mark rows with age greater than or equal to 18 as successful;
        }

    },

    //GROUP BY OPTIONS AND START OPEN OPTIONS
    groupBy:["fieldData.series_name","fieldData.version_name"],
    groupStartOpen:[false,true],
    /*
     groupStartOpen:[false, true, true,true], //start with gender groups open and color sub groups closed
    groupHeader:[
    function(value, count, data){ //generate header contents for gender groups
        return "Series : " + value + "<span style='color:#d00; margin-left:10px;'>(" + count + " items)</span>";
    },
    function(value, count, data){ //generate header contents for gender groups
        return "Day : " + value + "<span style='color:#d00; margin-left:10px;'>(" + count + " items)</span>";
    },
    function(value, count, data){ //generate header contents for gender groups
        return "Version : " + value + "<span style='color:#d00; margin-left:10px;'>(" + count + " items)</span>";
    },
    function(value, count, data){ //generate header contents for gender groups
        return "Deliver Via : " + value + "<span style='color:#d00; margin-left:10px;'>(" + count + " items)</span>";
    },
],*/


    columns: [ //Define Table Columns
        {
            title: "Date",
            field: "fieldData.send_on_date",
            sorter: "date",
            headerFilter: true,
            hozAlign: "left",
            headerSort: true,
            sorterParams:{
                format:"YYYY-MM-DD",
                alignEmptyValues:"top",
            }
            
        },
        {
            title: "Day",
            field: "fieldData.send_on_day",
            sorter: "string",
            headerFilter: true,
            hozAlign: "left",
            headerSort: false
        },
        {
            title: "Partner",
            field: "fieldData.endpoint_name",
            sorter: "string",
            hozAlign: "left",
            headerFilter: true
        },
        {
            title: "Series",
            field: "fieldData.series_name",
            sorter: "string",
            headerFilter: true
        },
        {
            title: "Version",
            field: "fieldData.version_name",
            sorter: "string",
            hozAlign: "left",
            widthGrow: 2,
            headerFilter: true
        },
        {
            title: "Episode",
            field: "fieldData.episode_number",
            sorter: "string",
            hozAlign: "left",
            headerFilter: true
        },
        {
            title: "Time",
            field: "fieldData.send_at_time",
            sorter: "string",
            hozAlign: "left",
            headerFilter: true,
            formatter: function (cell, formatterParams, onRendered) {
                const timeString = cell.getValue();
                const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
                    .toLocaleTimeString({}, {
                        timeZone: 'UTC',
                        hour12: true,
                        hour: 'numeric',
                        minute: 'numeric'
                    });
                //cell - the cell component
                //formatterParams - parameters set for the column
                //onRendered - function to call when the formatter has been rendered

                return timeString12hr; //return the contents of the cell;
            }
        },
        {
            title: "Note",
            field: "fieldData.customization_note",
            sorter: "string",
            hozAlign: "left",
            headerFilter: true,
            headerSort: false
        },
        {
            title: "Send Via",
            field: "fieldData.send_via",
            sorter: "string",
            hozAlign: "left",
            headerFilter: true
        }

    ]

});

//trigger AJAX load on "Load Data via AJAX" button click
document.getElementById("file-load-trigger").addEventListener("click", function(){
    table.setDataFromLocalFile();
});

//trigger download of data.csv file
document.getElementById("download-csv").addEventListener("click", function(){
    table.download("csv", "data.csv");
});

//trigger download of data.json file
document.getElementById("download-json").addEventListener("click", function(){
    table.download("json", "data.json");
});

//trigger download of data.xlsx file
document.getElementById("download-xlsx").addEventListener("click", function(){
    table.download("xlsx", "data.xlsx", {sheetName:"My Data"});
});

//trigger download of data.pdf file
document.getElementById("download-pdf").addEventListener("click", function(){
    table.download("pdf", "data.pdf", {
        orientation:"portrait", //set page orientation to portrait
        title:"Example Report", //add title to report
    });
    
});
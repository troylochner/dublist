ajaxURL:"https://n6dfpq.apps.connect.claris.com/api/webhook/v1/dublist/catch",
    ajaxConfig:{
        mode:"cors",  
        credentials: "same-origin", //send cookies with the request from the matching origin     
        method:"GET", //set request type to Position
        headers: {
            "Accept": "application/json", //tell the server we need JSON back
        "X-Requested-With": "XMLHttpRequest", //fix to help some frameworks respond correctly to request
        "Content-type": 'application/json; charset=utf-8', //set the character encoding of the request
        "Access-Control-Allow-Origin": "http://yout-site.com", //the URL origin of the site making the request
                /*
                "Accept": "application/json", //tell the server we need JSON back
                "X-Requested-With": "XMLHttpRequest", //fix to help some frameworks respond correctly to request
                "Content-type": 'application/json; charset=utf-8', //set specific content type
                //"Access-Control-Allow-Origin": "https://n6dfpq.apps.connect.claris.com/"//the URL origin of the site making the request
                //"Access-Control-Allow-Origin": "https://troylochner.github.io", //the URL origin of the site making the request,
                //"Access-Control-Allow-Origin": "null", //the URL origin of the site making the request,
                //"Access-Control-Allow-Headers": ""*/
        }},
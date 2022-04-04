addEventListener('load', ()=>{
    let myInterval = null;
    let myNews=[];
    const getHour = () => (new Date()).toTimeString().split(" ")[0];

    function updateButtons(index){
        document.getElementById('seguent').disabled=(index===(myNews.length-1));
        document.getElementById('anterior').disabled=(index===0);
    }
    function showNews(index, doFlaix=false){
        let div = document.getElementById('ticker');
        div.innerText=myNews[index];
        if(doFlaix){
            div.classList.add('brighten');
            setTimeout(function(){
                div.classList.remove('brighten');
            }, 2000);
        }
        updateButtons(index);
    }
    const doRequest = () => {
        let http_request=null;
        if(window.XMLHttpRequest){
            http_request=new window.XMLHttpRequest();
        }else if(window.ActiveXObject){
            http_request=new window.ActiveXObject('Microsoft.XMLHTTP');
        }

        http_request.onreadystatechange=function(){
            if(http_request.readyState===4){
                if(http_request.status===200){
                    let newLength=myNews.push(getHour() + " - " +
                        http_request.responseText);
                    showNews(newLength-1,true);
                }
            }
        }
        http_request.open('GET','../servidor/generarContinguts.php',true);
        http_request.send(null);

    };

    const beginRequests = () => {
        myInterval=setInterval(doRequest, 10000);
        document.getElementById('aturar').value='Aturar';
    };

    const stopRequests = () => {
        clearInterval(myInterval);
        myInterval=null;
        document.getElementById('aturar').value='Iniciar';
    };

    function navigateNews(forwards){
        stopRequests();
        let index =  myNews.indexOf(document.getElementById('ticker').innerText);
        if(forwards) {
            showNews(index + 1);
        }else{
            showNews(index - 1);
        }
    }

    doRequest();

    beginRequests();

    document.getElementById('seguent').
    addEventListener('click',()=>{
        navigateNews(true);

    });

    document.getElementById('anterior').
    addEventListener('click',()=>{
        navigateNews(false);

    });

    document.getElementById('aturar').
    addEventListener('click',()=>{
        if(myInterval){
            stopRequests();
        }else{
            beginRequests();
        }

    });

})
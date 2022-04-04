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

        }
    }
})
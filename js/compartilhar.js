function share(){
	if (navigator.share !== undefined) {
		navigator.share({
			title: encodeURI(document.title),
			url: window.location.href,
		})
		.then(() => console.log('Successful share'))
		.catch((error) => console.log('Error sharing', error));
	}
}

//Constrói a URL depois que o DOM estiver pronto
document.addEventListener("DOMContentLoaded", function() {
    var url = window.location.href; //url
    var title = encodeURIComponent(document.title); //título
    var mailToLink = "mailto:?subject="+title;
     
    //tenta obter o conteúdo da meta tag description
    var desc = document.querySelector("meta[name='description']");            
    desc = (!!desc)? desc.getAttribute("content") : null;
     
    //se a meta tag description estiver ausente...
    if(!desc){
        //...tenta obter o conteúdo da meta tag og:description
        desc = document.querySelector("meta[property='og:description']");
        desc = (!!desc)? desc.getAttribute("content") : null;
    }
    //Se houver descrição, combina a descrição com a url
    //senão o corpo da mensagem terá apenas a url
    var body = (!!desc)? desc + " " + url : url;
    //altera o link do botão
    mailToLink = mailToLink + "&body=" + encodeURIComponent(body);
    document.getElementById("mail-share-btt").href = mailToLink;
}, false);
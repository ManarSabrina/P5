// OBTENTION DE L'ID PAR L'URL
function optentionIdUrl () 
{
    let pointInterogationId = window.location.search;

    let urlSearchParams = new URLSearchParams(pointInterogationId);

    let id = urlSearchParams.get("id");

    return id;
}

function integartionDeLIdDsLeMessage () {
    const containerMessage = document.querySelector("#orderId");

    containerMessage.innerHTML = 

    optentionIdUrl ()
}

integartionDeLIdDsLeMessage ();

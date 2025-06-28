function paiementMethode(montant) {
    openKkiapayWidget({amount:montant,position:"center",callback:"",
    data:"",
    theme:"green",
    sandbox:"true",
    key:"98e54ee0ca6011eebcb247471d5c9d70"});
    
    addSuccessListener(response => {
        console.log(response);
    });
    addFailedListener(error => {
        console.log(error);
    });
}

 
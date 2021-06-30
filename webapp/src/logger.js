module.exports = class Logger{ 
    
    constructor(){}

    Log(message){
        const date = new Date();
        console.log(date.toISOString() + ": " + message);
    };
}

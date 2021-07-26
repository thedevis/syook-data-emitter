
const { Message } = require('./../interface/IMessage');
class MessageFactory{
    constructor({source:source}){
        if(source === undefined) throw new Error("MESSAGE_SOURCE_MISSING")
        this.source=source;
    }
    get _message() {
        let _nameList = Array.from(this.source.names);
        let _cityList = Array.from(this.source.cities);
        let _randomName = _nameList[Math.floor(Math.random()*_nameList.length)];
        let _originRandomCityIndex  = Math.floor(Math.random()*_cityList.length);
        let _randomOrigin = _cityList[_originRandomCityIndex];
        _cityList.splice(_originRandomCityIndex,1);
        let _randomDestination = _cityList[Math.floor(Math.random()*_cityList.length)];
        let message = new Message({name:_randomName,origin:_randomOrigin,destination:_randomDestination});
        return message;
    }
}

module.exports= {
    MessageFactory
}












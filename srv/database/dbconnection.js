import config from '../config.js';
import {db as firebase, getData, setData, getDatabyid, getDatabycondition} from './firebase.js';

var database = {};

switch ( config.database.type) 
{
    case 'firebase':
        database = firebase;    
    
        break;
    default:
        break;
}

database.get = (collection) => {
    var data = getData(collection);
    //console.log(data)
    return data;
} 

database.set = (collection, data) => {
    var result = setData(collection, data);
    //console.log (result)
    return result;
}

database.getbyid = (collection, id) => {
    var data = getDatabyid(collection, id);
    //console.log(data)
    return data;
}

database.getbycondition = (collection, conditions) => {
    var data = getDatabycondition(collection, conditions);
    //console.log(data)
    return data;
}

export default database;
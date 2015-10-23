
import ko = require("knockout");
import isArray = require("utils/isArray");

function makeObservable<T>(obj:
    T | Array<T> | KnockoutObservableArray<T> | KnockoutObservable<T>) :
    KnockoutObservableArray<T> | KnockoutObservable<T>
{
    if (ko.isObservable<T>(obj)) {          //type guard : obj =KnockoutObservable<T>|KnockoutObservableArray<T>;
        return obj; 
    } else {                                //type guard: obj = T | T[];     
        if (isArray(obj)) {                 // obj = T[];
            return ko.observableArray(obj);
        } else {                            // obj = T;
            return ko.observable(obj);
        }
    }
}

export = makeObservable;
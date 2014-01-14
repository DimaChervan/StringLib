var St = {};
St.func = (function () {
    var alphabet = {
        vowel : {"а" : " ", "е" : " ", "ё" : " ", "и" : " ", "о" : " ", "у" : " ", "ы" : " ", "э" : " ", "ю" : " ", "я" : " "},
        consonant : {"б" : " ", "в" : " ", "г" : " ", "д" : " ", "ж" : " ", "з" : " ", "й" : " ", "к" : " ", "л" : " ", "м" : " ", "н" : " ", "п" : " ", "р" : " ", "с" : " ", "т" : " ", "ф" : " ", "х" : " ", "ц" : " ", "ч" : " ", "ш" : " ", "щ" : " "},
        prefix: ["в","во","взо","вы","до","за","из","изо","к","на","над","не","недо","о","об","обо","от","ото","па","пере","по","под","подо","пра","пред","предо","про","разо","с","со","су","у","без","бес","вз","вс","воз","вос","из","ис","низ","нис","раз","рас","роз","рос","через","черес","пре","при","а","ана","гипер","гипо","квази","мета","орто","пара","прото","нео","суб","экс","ин","супер","транс","пост"]
    };


    //выделить гласные или согласные

    function getChars (string, ABC){
        var i = 0,
            length = string.length,
            arr = [];
        for (i; i < length; i++) {
            if (alphabet[ABC][string[i].toLowerCase()]) {
                arr.push(i);
            }
        }
        return arr;
    }

    //определение количества слов

     function countWord (string) {
         var count = 0,
         arr = [],
         i = 0,
         length;
         arr = string.split(" ");
         length = arr.length;
         for (i; i < length; i ++) {
             if (arr[i][0] != undefined) {
                count = count + 1;
             }
         }
         return count;
     }

    //поиск слогов

    function getSyllable (string) {
        var arr = [],
            i = 0,
            j,
            length,
            newStr = "",
            result = "",
            index = undefined;
        arr = string.split(" ");
        length = arr.length;
        for (i; i < length; i++) {
            if (arr[i] !== undefined) {
                for (j = 0; j < arr[i].length; j ++) {
                    if (alphabet.vowel[arr[i][j].toLowerCase()]) {
                        if (index == undefined) {
                            newStr += arr[i].slice(0, j + 1) + "-";
                            index = j + 1;
                        }
                        else {
                            newStr += arr[i].slice(index, j + 1) + "-";
                            index = j + 1;
                        }
                    }
                    else if (!alphabet.vowel[arr[i][j].toLowerCase()] && j == arr[i].length - 1) {
                        newStr = newStr.slice(0, newStr.length - 1) + arr[i].slice(index, j + 1) + "-";
                    }
                }
                newStr = newStr.slice(0, newStr.length - 1);
                result += newStr + " ";
                newStr = "";
                index = undefined;
            }
        }
        result = result.slice(0, result.length - 1);
        return result;
    }

    //поиск приставок

    function getPrefix (string) {
        var arr = [],
            i = 0,
            j,
            index,
            length,
            prefixLength = alphabet.prefix.length,
            newStr = "";
        arr = string.split(" ");
        length = arr.length;
        for (i; i < length; i++) {
            if (arr[i] == undefined || arr[i].length < 4)
                newStr += arr[i] + " ";
            else {
                for (j = 0; j < prefixLength; j++) {
                    index = arr[i].toLowerCase().indexOf(alphabet.prefix[j]);
                    if (index == 0 && arr[i].toLowerCase() != alphabet.prefix[j] && alphabet.prefix[j].length + 3 <= arr[i].length) {
                        newStr += arr[i].slice(0, alphabet.prefix[j].length) + "-" + arr[i].slice(alphabet.prefix[j].length, arr[i].length) + " ";
                        break;
                    }
                }
            }
        }
        newStr = newStr.slice(0, newStr.length - 1);
        return newStr;
    }

    return {
        getChars : getChars,
        countWord : countWord,
        getSyllable : getSyllable,
        getPrefix : getPrefix
    }


}());
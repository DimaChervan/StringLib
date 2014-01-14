$(document).ready(function(){
    var vowel = $(".vowel"),
        consonant = $(".consonant"),
        syllable = $(".syllable"),
        word = $(".word"),
        prefix = $(".prefix"),
        textarea = $("textarea"),
        res = $(".result"),
        result;


    vowel.click(function () {
            getResult(textarea, res, St.func.getChars, "vowel", true);
        }
    );

    consonant.click(function () {
            getResult(textarea, res, St.func.getChars, "consonant", true);
        }
    );

    syllable.click(function () {
            getResult(textarea, res, St.func.getSyllable);
        }
    );
    word.click(function () {
            getResult(textarea, res, St.func.countWord);
        }
    );
    prefix.click(function () {
            getResult(textarea, res, St.func.getPrefix);
        }
    );
});

//обернуть гласную или согласную в <span>

function remakeString (arr, text) {
    var str = "",
        i,
        j,
        flag;
    for (i = 0; i < text.length; i++) {
        flag = false;
        for (j = 0 ; j < arr.length;j++) {
            if (i == arr[j]) {
                str += "<span>" + text[i] + "</span>";
                flag = true;
            }
        }
        if (flag == false)
            str += text[i];
    }
    return str;
}
//показать результат
function getResult(textarea,res,f,ABC,alpha) {
    var text,result;
    text = textarea.val();
    if (text.length != 0){
        res.stop();
        res.css({opacity:0});
        result = f(text,ABC);
        if (result.length != 0) {
        if (alpha == true) {
            result = remakeString(result,text);
        }

            res.html(result);

        }
        else {
            res.html("Измените текст");
        }
        res.animate({opacity:1},1000);
    }
}
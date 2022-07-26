import * as Hangul from 'hangul-js';

// Hangul.assemble
// Hangul.disassemble
// String.fromCharCode(0x3131) 'ㄱ'
// A.charCodeAt(0).toString(16) string의 method

export function getConstantVowel(kor:string) {

    let f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
               'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
               'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

    let s = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
               'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
               'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ']

    let t = [ '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
               'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
               'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
               'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

    let uni = kor.charCodeAt(0) - 44032

    let fn = Math.floor(uni / 588);
    let sn = Math.floor((uni - (fn * 588)) / 28);

    let tn = uni % 28;
    if (tn === 0) {
        return[f[fn], s[sn]]
    } else {
        return [f[fn], s[sn], t[tn]]
    }
    
    
}

export function newDisassemble(word:string) {
    let a : Array<string> = [];
        for ( let i =0 ; i < word.length ; i++  ){
            if ( chrTonum(word[i]) >= chrTonum('가') && chrTonum(word[i]) <= chrTonum('힣')) 
            {a = a.concat(getConstantVowel(word[i]))
                
        }   
        }
    return a


}

export function chrTonum(verb:string){
    return verb.charCodeAt(0)
}

export  function get_stem(verb:string){

    return newDisassemble(verb).slice(0,-2);
}

export function is_vow(char:string){
    return ((chrTonum(char) >= chrTonum('ㅏ')) && (chrTonum(char) <= chrTonum('ㅣ')))? true  : false

}


export function A_EO(verb1:string, type:string) : string {
    let a:Array<string> = []
    let verb:string = ''

//불규칙 변형
switch (type){
    case "ㅂ불규칙":
        verb = Hangul.assemble(get_stem(verb1).slice(0,-1).concat(Hangul.disassemble('우다')))
        break;
    case "ㅅ불규칙":
        verb = Hangul.assemble(get_stem(verb1).slice(0,-1).concat(Hangul.disassemble('으다')))
        break;
    case "ㄷ불규칙":
        verb = Hangul.assemble(get_stem(verb1).slice(0,-1).concat(Hangul.disassemble('ㄹ다')))
        break;
    case "르불규칙":
        verb = Hangul.assemble(get_stem(verb1).slice(0,-2).concat(Hangul.disassemble('ㄹ르다')))
        break;
    case "우불규칙":
        verb = Hangul.assemble(get_stem(verb1).slice(0,-1).concat(Hangul.disassemble('ㅡ다')))
        break;
    case "러불규칙":
        verb = Hangul.assemble(get_stem(verb1).slice(0,-1).concat(Hangul.disassemble('ㅡ르다')))
        break;
    case "ㅎ불규칙":
        verb = Hangul.assemble(get_stem(verb1).slice(0,-2).concat(Hangul.disassemble('ㅐ다')))
        break;
    
    default :
        verb = verb1

}
//이다,아니다 는 구별 불가
//하다
    if (JSON.stringify(get_stem(verb).slice(-2,-1)) === JSON.stringify(["ㅎ"]) 
        && JSON.stringify(get_stem(verb).slice(-1)) === JSON.stringify( ["ㅏ"])){
        a = get_stem(verb).slice(0,-1).concat(Hangul.disassemble('ㅐ'))
// 어간이 모음으로 끝나면?
        } else if (is_vow(get_stem(verb).slice(-1)[0])){ 
            
            if(JSON.stringify(get_stem(verb).slice(-1)) === JSON.stringify( ["ㅏ"])){
                a = get_stem(verb).concat(Hangul.disassemble(''))        
                    }
            else if(JSON.stringify(get_stem(verb).slice(-1)) === JSON.stringify( ["ㅗ"])){
            a = get_stem(verb).slice(0,-1).concat(Hangul.disassemble('ㅘ'))        
                }
            else if(JSON.stringify(get_stem(verb).slice(-1)) === JSON.stringify( ["ㅜ"])){
                if(JSON.stringify(get_stem(verb).slice(-3,-2)) === JSON.stringify( ["ㅗ"]))
                {
                
                if(JSON.stringify(get_stem(verb).slice(-4,-3)) === JSON.stringify( ["ㄹ"])){
                    a = get_stem(verb).slice(0,-1).concat(Hangul.disassemble('ㅝ'))
                    } else {
                    a = get_stem(verb).slice(0,-1).concat(Hangul.disassemble('ㅘ'))        
                    }
                } else if(JSON.stringify(get_stem(verb).slice(-3,-2)) === JSON.stringify( ["ㅜ"])){
                    a = get_stem(verb).slice(0,-1).concat(Hangul.disassemble('ㅝ'))        
                } else {
                    a = get_stem(verb).slice(0,-1).concat(Hangul.disassemble('ㅝ'))        
                }
            }
            else if(JSON.stringify(get_stem(verb).slice(-1)) === JSON.stringify( ["ㅡ"])){
                    if(JSON.stringify(get_stem(verb).slice(-3,-2)) === JSON.stringify( ["ㅏ"])
                    || JSON.stringify(get_stem(verb).slice(-3,-2)) === JSON.stringify( ["ㅗ"])
                    || JSON.stringify(get_stem(verb).slice(-4,-3)) === JSON.stringify( ["ㅏ"])
                    || JSON.stringify(get_stem(verb).slice(-4,-3)) === JSON.stringify( ["ㅗ"])
                    ){
                         a = get_stem(verb).slice(0,-1).concat(Hangul.disassemble('ㅏ')) 
                    } else {
                    a = get_stem(verb).slice(0,-1).concat(Hangul.disassemble('ㅓ'))        }
                    }
            else if(JSON.stringify(get_stem(verb).slice(-1)) === JSON.stringify( ["ㅣ"])){
                a = get_stem(verb).slice(0,-1).concat(Hangul.disassemble('ㅕ'))   }     
            else if(JSON.stringify(get_stem(verb).slice(-1)) === JSON.stringify( ["ㅟ"])
            || JSON.stringify(get_stem(verb).slice(-1)) === JSON.stringify( ["ㅢ"])){
                    a = get_stem(verb).concat(Hangul.disassemble('어'))
                } else if(JSON.stringify(get_stem(verb).slice(-1)) === JSON.stringify( ["ㅔ"])){
                    a = get_stem(verb)
                } else if(JSON.stringify(get_stem(verb).slice(-1)) === JSON.stringify( ["ㅚ"])){
                    a = get_stem(verb).slice(0,-1).concat(Hangul.disassemble('ㅙ'))
                }
                 else
                {
                    a = get_stem(verb)        
                }

        } else {
// 어간이 자음으로 끝나면
            if (JSON.stringify(get_stem(verb).slice(-2,-1)) === JSON.stringify( ["ㅏ"]) 
             || JSON.stringify(get_stem(verb).slice(-2,-1)) === JSON.stringify( ["ㅗ"])
             || JSON.stringify(get_stem(verb).slice(-2,-1)) === JSON.stringify( ["ㅑ"])) {
            a = get_stem(verb).concat(Hangul.disassemble('아'))        
            } else {
            a = get_stem(verb).concat(Hangul.disassemble('어'))        
            }
        }

    return Hangul.assemble(a)
    

}

export function ATT_EOTT(verb1:string, type:string) : string {
    let a:Array<string> = []
    a = Hangul.disassemble(A_EO(verb1, type) +'ㅆ어') 
    return Hangul.assemble(a)

}

export function L_LEUL(verb1:string, type:string){
    let a:Array<string> = []
    let verb:string = ''

//불규칙 검사기
    switch (type){
        case "ㅂ불규칙":
            verb = Hangul.assemble(get_stem(verb1).slice(0,-1).concat(Hangul.disassemble('우다')))
            break;
        case "ㅅ불규칙":
            verb = Hangul.assemble(get_stem(verb1).slice(0,-1).concat(Hangul.disassemble('으다')))
            break;
        case "ㄷ불규칙":
            verb = Hangul.assemble(get_stem(verb1).slice(0,-1).concat(Hangul.disassemble('ㄹ다')))
            break;
        case "르불규칙":
            verb = Hangul.assemble(get_stem(verb1).slice(0,-2).concat(Hangul.disassemble('르다')))
            break;
        case "우불규칙":
            verb = Hangul.assemble(get_stem(verb1).slice(0,-1).concat(Hangul.disassemble('ㅡ다')))
            break;
        case "러불규칙":
            verb = Hangul.assemble(get_stem(verb1).slice(0,-1).concat(Hangul.disassemble('ㅡ르다')))
            break;
        case "ㅎ불규칙":
            verb = Hangul.assemble(get_stem(verb1).slice(0,-2).concat(Hangul.disassemble('ㅏ다')))
            break;
        
        default :
            verb = verb1

    }
    
    if ((is_vow(get_stem(verb).slice(-1)[0]))){
// 어간이 모음으로 끝나면?
        a = get_stem(verb).concat(Hangul.disassemble('ㄹ'))        
    } else {
// 어간이 자음으로 끝나면   
        if(JSON.stringify(get_stem(verb).slice(-1)) === JSON.stringify( ["ㄹ"])){
            a = get_stem(verb).slice(0,-1).concat(Hangul.disassemble('ㄹ'))            
        }
        else {a = get_stem(verb).concat(Hangul.disassemble('을'))        } 
    }
    return Hangul.assemble(a)
}

export function N_EUN(verb1:string, type:string){
    let a:Array<string> = []
    let verb:string = ''
    switch (type){
        case "ㅂ불규칙":
            verb = Hangul.assemble(get_stem(verb1).slice(0,-1).concat(Hangul.disassemble('우다')))
            break;
        case "ㅅ불규칙":
            verb = Hangul.assemble(get_stem(verb1).slice(0,-1).concat(Hangul.disassemble('으다')))
            break;
        case "ㄷ불규칙":
            verb = Hangul.assemble(get_stem(verb1).slice(0,-1).concat(Hangul.disassemble('ㄹ을다')))
            break;
        case "르불규칙":
            verb = Hangul.assemble(get_stem(verb1).slice(0,-2).concat(Hangul.disassemble('르다')))
            break;
        case "우불규칙":
            verb = Hangul.assemble(get_stem(verb1).slice(0,-1).concat(Hangul.disassemble('ㅜ다')))
            break;
        case "러불규칙":
            verb = Hangul.assemble(get_stem(verb1).slice(0,-1).concat(Hangul.disassemble('ㅡ르다')))
            break;
        case "ㅎ불규칙":
            verb = Hangul.assemble(get_stem(verb1).slice(0,-1).concat(Hangul.disassemble('다')))
            break;
        
        default :
        verb = verb1

    }
    

    if ((is_vow(get_stem(verb).slice(-1)[0]))){
    // 어간이 모음으로 끝나면?
        a = get_stem(verb).concat(Hangul.disassemble('ㄴ'))
        }        
        else {
    // 어간이 자음으로 끝나면   
        if(JSON.stringify(get_stem(verb).slice(-1)) === JSON.stringify( ["ㄹ"])){
                a = get_stem(verb).slice(0,-1).concat(Hangul.disassemble('ㄴ'))
        } else {
                a = get_stem(verb).concat(Hangul.disassemble('은'))
        }
            
        }

    return Hangul.assemble(a)

}

export function NEUN(verb:string, type:string) : string{
    let a:Array<string> = []
    if ((is_vow(get_stem(verb).slice(-1)[0]))){
        // 어간이 모음으로 끝나면?
                if( type === 'AV'){
                    a = get_stem(verb).concat(Hangul.disassemble('는'))
                }else { 
                    a = a.concat('X')}        
        
            } else {
        // 어간이 자음으로 끝나면   
                if(JSON.stringify(get_stem(verb).slice(-1)) === JSON.stringify( ["ㄹ"])){
                    if( type === 'AV'){
                        a = get_stem(verb).slice(0,-1).concat(Hangul.disassemble('는'))
                    }else { 
                        a = a.concat('X')}            
                }
                else {
                    if( type === 'AV'){
                        a = get_stem(verb).concat(Hangul.disassemble('는'))
                    }else { 
                        a = a.concat('X')}
                }
                    
            }

    return Hangul.assemble(a)

}

export function GO(verb:string) : string {
    let a:Array<string> = []

    a = get_stem(verb).concat(Hangul.disassemble('고'))    

    return Hangul.assemble(a)

}

export function JI(verb:string) : string {
    let a:Array<string> = []

    a = get_stem(verb).concat(Hangul.disassemble('지'))    

    return Hangul.assemble(a)

}
//_todo_: next api를 백엔드로 사용하기. 
// 1. logger
// 2. fetching
// 

import * as Hangul from 'hangul-js';

// Hangul.assemble
// Hangul.disassemble
// String.fromCharCode(0x3131) 'ㄱ'
// A.charCodeAt(0).toString(16) string의 method

function getConstantVowel(kor:string) {

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
    if (tn === 0) {return[f[fn], s[sn]] }
    return [f[fn], s[sn], t[tn]]
}

function newDisassemble(word:string) {
    let a : Array<string> = [];
        for ( let i =0 ; i < word.length ; i++  ){
            if ( chrTonum(word[i]) >= chrTonum('가') && chrTonum(word[i]) <= chrTonum('힣')) {
                a = a.concat(getConstantVowel(word[i]))
            }   
        }
    return a
}

function chrTonum(verb:string){
    return verb.charCodeAt(0)
}

function get_stem(verb:string){
    return newDisassemble(verb).slice(0,-2);
}

function is_vow(char:string){
    return ((chrTonum(char) >= chrTonum('ㅏ')) && (chrTonum(char) <= chrTonum('ㅣ'))) ? true : false
}

function verb_assembler(ending:string, verb1:string, slice?:[number,number], ) : string{
    
    if (slice == null) return Hangul.assemble(get_stem(verb1).concat(Hangul.disassemble(ending)))
    return Hangul.assemble(get_stem(verb1).slice(...slice).concat(Hangul.disassemble(ending)))
}

function irregular_transform(verb1:string, type:string, ending:string[]){
    switch (type){
        case "ㅂ불규칙": return verb_assembler(ending[0], verb1,[0,-1], )
        case "ㅅ불규칙": return verb_assembler(ending[1], verb1,[0,-1], )
        case "ㄷ불규칙": return verb_assembler(ending[2], verb1,[0,-1], )
        case "르불규칙": return verb_assembler(ending[3], verb1,[0,-2], )
        case "우불규칙": return verb_assembler(ending[4], verb1,[0,-1], )
        case "러불규칙": return verb_assembler(ending[5], verb1,[0,-1], )
        case "ㅎ불규칙": return verb_assembler(ending[6], verb1,[0,-2],)
        default : return verb1
    }
}

export function A_EO(verb1:string, type:string) : string {
    const irreg_endings = ['우다','으다','ㄹ다','ㄹ르다','ㅡ다','ㅡ르다','ㅐ다']
    let a:Array<string> = []
    let verb:string = irregular_transform(verb1, type, irreg_endings)
    //이다,아니다 는 구별 불가
    //하다
    if (get_stem(verb).slice(-2).toString() === "ㅎ,ㅏ"){ return verb_assembler('ㅐ', verb, [0,-1]) }
    
    // 어간이 모음으로 끝나면?
    if (is_vow(get_stem(verb).slice(-1).toString())){ 
        if (get_stem(verb).slice(-1).toString() === "ㅏ"){ return verb_assembler('',verb) }
        if (get_stem(verb).slice(-1).toString() === "ㅗ"){ return verb_assembler('ㅘ',verb,[0,-1]) }
        if (get_stem(verb).slice(-1).toString() === "ㅚ"){ return verb_assembler('ㅙ', verb,[0,-1]) }
        if (get_stem(verb).slice(-1).toString() === "ㅣ"){ return verb_assembler('ㅕ', verb, [0,-1]) }
        if ("ㅟ,ㅢ".includes(get_stem(verb).slice(-1).toString())){ return verb_assembler('어', verb) }
        
        if (get_stem(verb).slice(-1).toString() === "ㅜ"){
            if (get_stem(verb).slice(-3,-2).toString() !== "ㅗ"){ return verb_assembler('ㅝ', verb,[0,-1]) }
            if (get_stem(verb).slice(-4,-3).toString() === "ㄹ"){ return verb_assembler('ㅝ', verb,[0,-1]) }
            return verb_assembler('ㅘ', verb, [0,-1]) 
        }
        
        if(get_stem(verb).slice(-1).toString() === "ㅡ"){
            for ( const c of get_stem(verb).slice(-4,-2) ){ 
                if (c!==''&&"ㅏ,ㅗ".includes(c) ) return verb_assembler('ㅏ', verb, [0,-1])
            }
        return verb_assembler('ㅓ', verb, [0,-1] )
        }
        return verb_assembler('', verb)
    }
    // 어간이 자음으로 끝나면
    if (!is_vow(get_stem(verb).slice(-1).toString())){
        if ("ㅏ,ㅗ,ㅑ".includes(get_stem(verb).slice(-2,-1).toString())){ 
            return verb_assembler('아', verb)} 
        return verb_assembler('어', verb)}
    return verb_assembler('', verb)
}

export function ATT_EOTT(verb1:string, type:string) : string {
    return Hangul.assemble(Hangul.disassemble(A_EO(verb1, type)+'ㅆ어') )

}

export function L_LEUL(verb1:string, type:string){
    const irreg_endings = ['우다','으다','ㄹ다','르다','ㅡ다','ㅡ르다','k다']
    let verb:string =irregular_transform(verb1, type, irreg_endings)
    // 어간이 모음으로 끝나면?
    if ((is_vow(get_stem(verb).slice(-1)[0]))){return verb_assembler('ㄹ',verb)} 
    // 어간이 자음으로 끝나면   
    if(get_stem(verb).slice(-1).toString() === "ㄹ"){ return verb_assembler('ㄹ',verb,[0,-1])}                  
    return verb_assembler('을',verb)
}


export function N_EUN(verb1:string, type:string){
    const irreg_endings = ['우다','으다','ㄹ을다','르다','ㅜ다','ㅡ르다','다']
    let verb:string =irregular_transform(verb1, type, irreg_endings)
    // 어간이 모음으로 끝나면?
    if ((is_vow(get_stem(verb).slice(-1).toString()))){return verb_assembler('ㄴ',verb)} 
    // 어간이 자음으로 끝나면   
    if(get_stem(verb).slice(-1).toString() === "ㄹ"){ return verb_assembler('ㄴ',verb,[0,-1])}                  
    return verb_assembler('은',verb)
}

export function NEUN(verb:string, type:string) : string{
    // 어간이 모음으로 끝나면?
    if (is_vow(get_stem(verb).slice(-1).toString())){
        if(type === 'AV'){return verb_assembler('는',verb)}
        return verb_assembler('X',verb)
    }  
    // 어간이 자음으로 끝나면   
    if(get_stem(verb).slice(-1).toString() === "ㄹ"){
        if(type === 'AV'){return verb_assembler('는',verb,[0,-1])}
        return verb_assembler('X',verb)
    }
    if(type === 'AV'){return verb_assembler('는',verb)}
    return verb_assembler('X',verb)
}

export function GO(verb:string) : string {
return verb_assembler('고',verb)
}

export function JI(verb:string) : string {
    return verb_assembler('지',verb)
}
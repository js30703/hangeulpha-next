import * as jamo from "_jamo";   // refactoring
// import * as jamo from "_jamo_re"; // legacy

export function conjuDisplay(N: number) {
    switch (N) {
    case 0:
        return "Present : 아/어요";
    case 1:
        return "Past : 았/었어요";
    case 2:
        return "Future : ㄹ/을 거예요";
    case 3:
        return "Want to : 고 싶어요";
    case 4:
        return "Have to : 아/어야 해요";
    case 5:
        return "To Noun : ㄴ/은 것";
    case 6:
        return "Negative Long : 지 않아요";
    }
}

export function conjuFuntion(N: number, verb: string, regularType: string) {
switch (N) {
    case 0:
    return jamo.A_EO(verb, regularType) + "요";
    case 1:
    return jamo.ATT_EOTT(verb, regularType) + "요";
    case 2:
    return jamo.L_LEUL(verb, regularType) + " 거예요";
    case 3:
    return jamo.GO(verb) + " 싶어요";
    case 4:
    return jamo.A_EO(verb, regularType) + "야 해요";
    case 5:
    return jamo.N_EUN(verb, regularType) + " 것";
    case 6:
    return jamo.JI(verb) + " 않아요";
}
}
export function GetShortName(text:string,length:number):string {
    if ( text === undefined||text===null ) return''; 
    let addText = '...';
    var textArr=text.split('');
    var count = 0;
    var str='';
    for (let i=0;i<textArr.length;i++){
        var n =escape(textArr[i]);
        if(n.length<4) count++;
        else count+=2;
        if (count>length) {
            return str+addText;
        }
        str+= text.charAt(i);
    }
    return text;
}
//hhmmss-->hh:mm:ss
export function EditTime(str:string):string {
    return str.replace(/^(\d{2})(\d{2})(\d{2})$/,'$1:$2:$3')
}
// YYYYMMDD ->YYYY/MM/DD
export function EditDate(str:string):string {
    return str.replace(/^(\d{4})(\d{2})(\d{2}$)/,'$1:$2:$3')
}
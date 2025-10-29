class Substrings{
    InsertSubstring(str = '', pos, substring) {
        if (pos < 0) {                                           //1
            return ''                                            //2
        }

        if (pos > str.length) {                                  //3
            return ''                                            //4
        }

        let result = '';                                          //5
        for (let i = 0;                                           //6
            i < str.length;                                       //7
            i++)                                                  //8
            {   
                if (i === pos) {                                  //9
                    result+=substring;                            //10
                }
                result+= str[i];                                  // 11
                
            } 
        return result;                                            //12
    }  
} 
module.exports = Substrings;
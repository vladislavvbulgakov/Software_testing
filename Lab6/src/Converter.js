class BaseConverter {
    from12To16(input) {
        if (typeof input !== 'string' || !input) {                                                  //1
            throw new Error('Input должен быть не пустой строкой');                                 //2
        }

        input = input.toUpperCase();                                                                //3

        const validChars = /^[0-9A-B]+$/;                                                           //4
        if (!validChars.test(input)) {                                                              //5
            throw new Error('Некорректные входные данные');                                         //6
        }

        let decimal = 0;                                                                            //7    
        const base12 = 12;                                                                          //8

        for (let i = input.length - 1;                                                              //9
            i >= 0;                                                                                 //10
            i--) {                                                                                  //11
            const charCode = input.charCodeAt(i);                                                   //12
            const digit = (charCode <= 57)                                                  //13
                ? charCode - 48                                                                     //14
                : charCode - 55;                                                                    //15
                
            const term = digit * Math.pow(base12, input.length - 1 - i);                            //16

            if (decimal + term > Number.MAX_SAFE_INTEGER) {                                         //17
                throw new Error('Превышение Number.MAX_SAFE_INTEGER');                              //18
            }

            decimal += term;                                                                        //19
        }

        if (decimal === 0) return '0';                                                              //20

        let result = '';                                                                            //21
        const hexChars = '0123456789ABCDEF';                                                        //22

        while (decimal > 0) {                                                                       //23
            result = hexChars[decimal % 16] + result;                                               //24
            decimal = Math.floor(decimal / 16);                                                     //25
        }

        return result;                                                                              //26
    }
}

module.exports = BaseConverter;
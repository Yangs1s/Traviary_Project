import React, { useState } from 'react';



const useInput = (initailValue:string,validator?:(value:string) => boolean) => {
    const [value,setValue] = useState(initailValue)
    
    const onChange = (event:any) => {
        const {
            target:{ value }
        } = event;
        console.log(value)
        let willUpdate = true;

        if(typeof validator === "function"){
            willUpdate = validator(value);
        }

        if(willUpdate){
            setValue(value)
        }
  };
    return { value , onChange};
};

export default useInput;
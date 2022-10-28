import React from 'react';
import styled from 'styled-components';
import {ImStarFull} from 'react-icons/im';

type lengthProp= {
    ratingLength:number;
}



const RatingStar = styled(ImStarFull)`
    color:#ffe91e;
`

const ReadStar = ({ratingLength}:lengthProp ) => {
    return (
        <>
           {
            [...Array(ratingLength)].map((star) =>(
                <>
                    <RatingStar/>
                </>
            ))
           } 
        </>
    );
};

export default ReadStar;
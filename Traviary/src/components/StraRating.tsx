import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import {ImStarFull} from 'react-icons/im';


const RatingContainer = styled.div`
    display:flex;
    text-align:center;
    margin:15px 0px;

    .inactive{
        color:rgba(0,0,0,0.6);
    }
    .active{
        color:#ffe91e;
    }
`

const RatingStar = styled(ImStarFull)`
    cursor:pointer;
`
interface RatingSectionProps{
    ratingIndex:number;
    setRatingIndex:Dispatch<SetStateAction<number>>
}

const StraRating = ({ratingIndex,setRatingIndex}:RatingSectionProps) => {
    const ArrayIndex=[1,2,3,4,5]
    return (
        <RatingContainer>
            {ArrayIndex.map((star,index) =>(
                <RatingStar
                size={25}
                key={`rating_${index}`}
                className={star<= ratingIndex ? 'active':'inactive'}
                onClick={()=> setRatingIndex(star)}
                />))}
        </RatingContainer>
                
    )
};

export default StraRating;
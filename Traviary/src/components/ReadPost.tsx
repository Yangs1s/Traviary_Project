import React, { useEffect, useState, ImgHTMLAttributes } from "react"
import styled from "styled-components"


const ReadPost = ({traviObj,isPostOpen}:{isPostOpen:boolean,traviObj:any}) => {
    // console.log(traviObj.id)
    const handleClose = () =>{
       
    }

    return (
        <>
        {isPostOpen ?
            <PostContainer>
                <Wrapper>
                    <PostHeader>
                        <div>
                        <CloseBtn type="button" onClick={handleClose}>
                            <span>🆇</span>    
                        </CloseBtn>
                        </div>
                    </PostHeader>
                    <ImageContainer>
                        <Image src={traviObj.fileAttachURL}  id={traviObj.id}/> 
                    </ImageContainer>
                    <ContentContainer>
                        <MapContainer>
                        </MapContainer>

                        <TextContainer>
                            <span>{traviObj.text}</span>
                        </TextContainer>
                    </ContentContainer>
                </Wrapper>
            </PostContainer>
            :null
        }
        </> 
    );
}

export default ReadPost

const PostContainer = styled.div`
	flex-direction: row;

    border-top-left-radius:10px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
    width:60em;
    height:80em;
    background:#fff;
    border:2px solid #000;
    position:absolute;
    top:100px;
    
    bottom:0;
    right:0;
`

const PostHeader = styled.header`
    width:100%;
    height:5%;
    border-bottom:2px solid #000;
`

const Wrapper = styled.div`
    width:100%;
    height:100%;
`


const ImageContainer = styled.div`
    width:100%;
    height:40%;
`
const Image = styled.img`
    width:100%;
    height:100%;
    padding:1em;
    border-bottom:2px solid #000;
    `

const CloseBtn = styled.button`
    width:10%;
    height:20%;
    outline:none;
    border:none;
    
    background:transparent;
    span{
        font-size:2em;
    }
    
    `

const ContentContainer = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:row;
`

const MapContainer = styled.div`
    width:50%;
    height:55%;
    border-right:2px solid #000;
`
const TextContainer = styled.div`
    width:50%;
    height:55%;
`

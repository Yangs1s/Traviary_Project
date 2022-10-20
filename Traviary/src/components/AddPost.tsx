/** @format */

import React, {
  useState,
  useRef,
  ImgHTMLAttributes,
  useEffect,
  FormEvent,
  ChangeEvent,
} from "react";
import { useSpring, animated } from "react-spring";
import useInput  from '../hooks/useInput'
import styled from "styled-components";
import {
	addDoc,
	collection,
	onSnapshot,
	orderBy,
	query,
	Timestamp,
} from "firebase/firestore"
import { dbService } from "../fbase"
import { AiOutlineFileAdd } from "react-icons/ai"

type PostType = {
  isModalOpen: boolean;
  setIsModalOpen: any;
};

interface TraviType {
  id?: string;
  text?: string;
  creatAt?: Timestamp;
  createdId?: string;
  image?: ImgHTMLAttributes<HTMLImageElement>;
}
interface RefObject<T>{
	current:T;
}

const AddPost = ({ isModalOpen, setIsModalOpen }: PostType) => {
	const [textarea, setTextarea] = useState("")
	const [infoTravi, setInfoTravi] = useState<TraviType[]>([])

	useEffect(() => {
		const queries = query(
			collection(dbService, "TraviDB"),
			orderBy("createdAt", "desc")
		)
		onSnapshot(queries, (snapshot) => {
			const traviArr = snapshot.docs.map((dosc) => ({
				id: dosc.id,
				...dosc.data(),
			}))
			setInfoTravi(traviArr)
		})
	}, [])

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault()
		await addDoc(collection(dbService, "TraviDB"), {
			text: textarea,
			createAt: Date.now(),
			// createdId: userObj.uid,
		})
		setTextarea("")
	}

	const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const {
			target: { value },
		} = event
		setTextarea(value)
	}

	const modalRef: any = useRef()
	const animation: any = useSpring({
		config: {
			duration: 250,
		},
		transform: isModalOpen ? `translateX(233%)` : `translateX(400%)`,
		position: "absolute",
		top: 0,
		width: "30vw",
		height: "100%",
	})

	const onClose = (e: any) => {
		if (modalRef.current === e.target) {
			setIsModalOpen((prev: any) => !prev)
		}
	}
	const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.currentTarget.value)
	}

	return (
		<>
			{isModalOpen ? (
				<Background ref={modalRef} onClick={onClose}>
					<animated.div style={animation}>
						<Container onSubmit={onSubmit}>
							<Wrapper>
								<PhotoContainer>
									<ImageInput
										type="file"
										accept="image/*"
										onChange={onFileChange}
									/>

									<PhotoList>
										<li>photo</li>
										<li>photo2</li>
										<li>photo3</li>
									</PhotoList>
								</PhotoContainer>
								<MapContainer>여기다 이미지가 나오게끔??</MapContainer>
								<TextContainer>
									<TextArea
										value={textarea}
										onChange={onChange}
										name="text"
									></TextArea>
									<Button type="submit" value="확인!!" />
								</TextContainer>
							</Wrapper>
						</Container>
					</animated.div>
				</Background>
			) : null}
		</>
	)
}

export default AddPost

const Background = styled.div`
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.8);
	position: fixed;
	display: flex;
`
const Container = styled.form`
  background: #fff;
  display: flex;
  position: absolute;
  right: 0;
  width: 40vw;
  height: 92%;
  border: 2px solid #000;
  margin-left: auto;
  border-radius: 20px;
  z-index: 9999;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  margin: 10px 30px;
  border-radius: 20px;
  @media screen and (max-width: 900px) {
    width: 100%;
    height: 80%;
    margin: 0;
  }
  @media screen and (max-width: 530px) {
    width: 100%;
    height: 70%;
    margin: 0;
  }
  @media screen and (max-width: 400px) {
    width: 100%;
    height: 100%;
    margin: 0;
  }
`;
const PhotoContainer = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  @media screen and (max-width: 900px) {
    width: 100%;
    height: 40%;
    display: block;
  }
  @media screen and (max-width: 530px) {
    width: 100%;
    height: 40%;
    display: block;
  }
  @media screen and (max-width: 400px) {
    width: 100%;
    height: 40%;
    display: block;
  }
`;

const ImageInput = styled.input`
    width:79%;
    height:100%
    font-size: 50px;
    text-align:center;
    border: 2px solid #000;
    border-radius:20px;
    @media screen and (max-width: 900px) {
        width:100%;
        height:70%;
      }
    @media screen and (max-width: 530px) {
        width:100%;
        height:70%;
      }
    @media screen and (max-width: 400px) {
        width:100%;
        height:70%;
      }

`;
const PhotoList = styled.ul`
  width: 20%;
  margin-left: 1em;
  border: 2px solid #000;
  border-radius: 20px;
  padding: 1em;
  margin: 0 auto;
  @media screen and (max-width: 900px) {
    width: 100%;
    height: 20%;
    text-align: center;
    display: flex;
  }
  @media screen and (max-width: 530px) {
    width: 100%;
    height: 30%;
    text-align: center;
    display: flex;
  }
  @media screen and (max-width: 400px) {
    width: 100%;
    height: 20%;
    text-align: center;
    display: flex;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 30%;
  border: 2px solid #000;
  border-radius: 20px;
  padding: 1em;
  @media screen and (max-width: 400px) {
    width: 100%;
    text-align: center;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  height: 30%;
  margin-top: 20px;
  text-align: center;
  @media screen and (max-width: 900px) {
    width: 100%;
    height: 40%;
  }
  @media screen and (max-width: 530px) {
    width: 100%;
    height: 40%;
  }
  @media screen and (max-width: 400px) {
    width: 100%;
    height: 20%;
  }
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 90%;
  resize: none;
  padding: 10px;
  border: 2px solid #000;
  border-radius: 20px;
`;

const Button = styled.button`
  width: 30%;
  height: 10%;
  @media screen and (max-width: 400px) {
    width: 50%;
    height: 20%;
  }
`;

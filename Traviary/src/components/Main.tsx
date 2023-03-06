/** @format */

import React, { useState, useEffect, useCallback } from "react"
import styled from "styled-components"
import Card from "@components/Cards/Card"
import { dbService, authService } from "@/fbase"
import {
	collection,
	query,
	onSnapshot,
	Timestamp,
	orderBy,
	limit,
	getDocs,
	startAfter,
} from "firebase/firestore"
import { CardTraviObjType } from "@/types/TraviType"
import { useInView } from "react-intersection-observer"

const Main = () => {
	const [isOpenPost, setIsOpenPost] = useState<boolean>(false)
	const [travis, setTravis] = useState<CardTraviObjType[]>([])
	const [postId, setPostId] = useState<string>("")
	const [userId, setUserId] = useState<string>("")
  const [isLoading, setIsLoding] = useState<boolean>(true);
	const authId = authService.currentUser?.uid as string

	const [key, setKey] = useState<any>(null)
	const [more, setMore] = useState(false)
	const [loading, setLoading] = useState(false)

	const { ref, entry, inView } = useInView({ threshold: 0.8 })

	const storeColName = "TraviDB" as string
	const limitCount = 10 as number

	const getDbData = useCallback(async () => {
		const queryRef = query(
			collection(dbService, storeColName),
			orderBy("createAt", "desc"),
			limit(limitCount)
		)
		try {
			setLoading(true)
			onSnapshot(queryRef, async (querySnapshot) => {
				const Travi: any = querySnapshot.docs.map((docs) => ({
					id: docs.id,
					...docs.data(),
				}))
				setTravis(Travi)
				const snap = await getDocs(queryRef)
				setKey(snap.docs[snap.docs.length - 1])
			})
		} catch (err) {
			console.error(err)
		}
	}, [])

	const onNextData = useCallback(async () => {
		const queryRef = query(
			collection(dbService, storeColName),
			orderBy("createAt", "desc"),
			startAfter(key),
			limit(limitCount)
		)
		try {
			const snap = await getDocs(queryRef)
			snap.empty ? setMore(true) : setKey(snap.docs[snap.docs.length - 1])

			const docsArr: any = snap.docs.map((docs) => ({
				id: docs.id,
				...docs.data(),
			}))
			setTravis([...travis, ...docsArr])
		} catch (err) {
			console.error(err)
		}
	}, [])

  useEffect(() => {
    setIsLoding(true);
    getDbData();
    setTimeout(() => {
      setIsLoding(false);
    }, 1600);
  }, []);


	useEffect(() => {
		getDbData()
		setLoading(false)
	}, [])

	useEffect(() => {
		if (inView) {
			onNextData()
		}
	}, [inView])

	const handleOpenPost = (event: React.MouseEvent<HTMLImageElement>) => {
		event.preventDefault()
		setIsOpenPost((prev) => !prev)
		setPostId(event.currentTarget.id)
	}


  const handleOpenPost = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    setIsOpenPost(prev => !prev);
    setPostId(event.currentTarget.id);
  };


	return (
		<Container className="main_container">
			{!isLoading ? (
        <GridContainer className="grid">
          {travis.map((travi: CardTraviObjType) =>
            authId === travi.createdId ? (
              <ImgItem key={`${travi.id}${travi.creatAt}`} className="Item">
                <img
                  id={travi.id}
                  src={travi.fileAttachURL}
                  alt="게시글이미지"
                  onClick={handleOpenPost}
                  className="image"
                />
              </ImgItem>
            ) : null
          )}
        </GridContainer>
      ) : (
        <Skeleton className="skeleton">
          <div className="wrapper">
            <Spinner />
            <span>Loading...</span>
          </div>
        </Skeleton>
      )}
			<div ref={ref} />
			{travis.length > 0 ? (
				<>
					{loading ? (
						<div>
							<h1>Loading...</h1>
						</div>
					) : (
						<div>{!more ? <DivMore>안녕하세요</DivMore> : ""}</div>
					)}
				</>
			) : (
				""
			)}

			{travis.map((travi) => {
				return (
					<div key={`${travi.createdId} ${travi.id}`}>
						{postId === travi.id ? (
							<Card
								isPostOpen={!isOpenPost}
								traviObj={travi}
								userObj={userId}
								onClose={handlePostClose}
							/>
						) : null}
					</div>
				)
			})}
		</Container>
	)
}
export default Main

const DivMore = styled.div`
	display: flex;
	justify-content: center;
	font-size: 20px;
	font-weight: bold;
	padding: 10px 0;
	background-color: #525252;
`

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  @media screen and (max-width: 900px) {
    width: 100%;
    height: 100%;
    margin: 0;
  }
  @media screen and (max-width: 400px) {
    width: 100%;
    height: 100%;
    margin: 0;
  }
`;

const GridContainer = styled.div`
  gap: 10px;
  height: auto;
  background: #fff;
  border: 2px solid #c71967;
  column-count: 4;
  column-width: 25%;
  padding: 20px 20px;
  margin: 130px 30px;
  border-radius: 15px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 901px) {
    -webkit-column-count: 3;
    column-count: 3;
    column-width: 25%;
  }
  @media screen and (max-width: 530px) {
    -webkit-column-count: 3;
    column-count: 3;
    -webkit-column-width: 33%;
    column-width: 33%;
  }
`;

const Skeleton = styled.div`
  height: 75%;
  width: 95%;
  display: flex;
  flex-direction: column;
  margin: 10% auto;
  border: 2px solid #c71967;
  border-radius: 15px;
  align-items: center;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  .wrapper {
    margin: auto;
    span {
      font-size: 3em;
      font-weight: bolder;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const ImgItem = styled.div`
  -webkit-transition: all 350ms ease;
  transition: all 350ms ease;
  cursor: pointer;
  margin-bottom: 12px;
  border-radius: 10px;
  min-height: auto;
  box-shadow: 1px 2px 5px 2px rgba(0, 0, 0, 0.2);
  :hover {
    -webkit-filter: brightness(0.5);
    filter: brightness(0.5);
  }
  .image {
    width: 100%;
    min-height: max-content;
    border-radius: 10px;
  }
`;

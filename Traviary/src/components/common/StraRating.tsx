import { Dispatch, SetStateAction } from "react"
import styled from "styled-components"
import { ImStarFull } from "react-icons/im"

interface RatingSectionProps {
	starSize: number
	ratingIndex: number
	setRatingIndex: Dispatch<SetStateAction<number>>
}

const StraRating = ({
	ratingIndex,
	setRatingIndex,
	starSize,
}: RatingSectionProps) => {
	const ArrayIndex = [1, 2, 3, 4, 5]
	return (
		<RatingContainer>
			{ArrayIndex.map((star, index) => (
				<RatingStar
					size={starSize}
					key={`rating_${index}`}
					className={star <= ratingIndex ? "active" : "inactive"}
					onClick={() => setRatingIndex(star)}
				/>
			))}
			<Grade>
				{ratingIndex === 5
					? "5"
					: ratingIndex === 4
					? "4"
					: ratingIndex === 3
					? "3"
					: ratingIndex === 2
					? "2"
					: ratingIndex === 1
					? "1"
					: "0"}
			</Grade>
		</RatingContainer>
	)
}

export default StraRating

const RatingContainer = styled.div`
	display: flex;
	text-align: center;

	.inactive {
		color: rgba(0, 0, 0, 0.6);
	}
	.active {
		color: #ffe91e;
	}
`

const RatingStar = styled(ImStarFull)`
	cursor: pointer;
`

const Grade = styled.p`
	margin: 0 5px;
	font-size: 15px;
`

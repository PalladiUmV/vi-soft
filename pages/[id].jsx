import s from '../styles/card.module.scss'

export default function Card({ card }) {
    card = { ...card[0] }
    const { name, image_url, tagline, description, abv, food_pairing } = card;
    return (
        <div className={s.card}>
            <h1>Карточка пива - {name}</h1>
            <img src={image_url} alt="beer" width={50} height={200} />
            <span className={s.tagline}>{tagline}</span>
            <span className={s.description}>{description}</span>
            <span className={s.abv}>abv: {abv}</span>
            <div className={s.food_pairing}>
                <ul>
                    {food_pairing?.map((item, index) => <li key={index}>{item}</li>)}
                </ul>

            </div>
        </div>
    )
};

export async function getServerSideProps({ params }) {
    const response = await fetch(`https://api.punkapi.com/v2/beers/${params.id}`)
    const card = await response.json()
    return {
        props: { card },
    }
}



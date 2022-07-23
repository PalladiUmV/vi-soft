import Head from "next/head";
import Link from "next/link";
import Pagination from "../components/Pagination";
import s from '../styles/main.module.scss'
import { useState } from "react";

const Index = ({ cards }) => {
    const [inputValue, setInputValue] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [dataPerPage] = useState(10)

    const lastIndex = currentPage * dataPerPage
    const firstIndex = lastIndex - dataPerPage
    const currentData = cards?.slice(firstIndex, lastIndex)
    const paginate = pageNumber => setCurrentPage(pageNumber)
    const nextPage = () => setCurrentPage(prev => prev + 1)
    const prevPage = () => setCurrentPage(prev => prev - 1)
    return (
        <>
            <Head>
                <title>Beer</title>
            </Head>
            <div className={s.input}>
                <input
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder='Найти пиво...'
                />
            </div>
            <div className={s.cards}>
                {currentData?.filter(({ name }) => name.toLowerCase().includes(inputValue.toLowerCase()))
                    .map(card => {
                        const { id, name, image_url, description } = card;
                        return <Link href={`/${id}`} key={id}>
                            <div className={s.card}>
                                <img src={image_url} width={50} height={150} />
                                <span>{description.slice(0, 100)}...</span>

                                <a className={s.cardName}>{name}</a>
                            </div>
                        </Link>

                    }
                    )}
            </div>
            <div className={s.wrapper}>
                <button onClick={prevPage} disabled={currentPage === 1}>Назад</button>
                <Pagination
                    dataPerPage={dataPerPage}
                    totalData={cards.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
                <button onClick={nextPage} disabled={currentPage === 8}>Далее</button>
            </div>

        </>
    );
};

export default Index;

export async function getStaticProps(context) {
    const response = await fetch(`https://api.punkapi.com/v2/beers?page=1&per_page=80`)
    const cards = await response.json()

    return {
        props: { cards },
    }
}

import s from '../styles/pagination.module.scss'

const Pagination = ({ dataPerPage, totalData, paginate, currentPage }) => {
	const pageNumbers = []
	for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
		pageNumbers.push(i)
	}

	return (
		<div className={s.pagination}>
			<ul className={s.pagination__list}>
				{
					pageNumbers.map((number, index) => {
						return <li key={index}>
							<a className={currentPage === number ? s.selectedPage : ''}
								onClick={() => paginate(number)}>
								{number}
							</a>
						</li>
					})
				}
			</ul>
		</div >
	)
}

export default Pagination
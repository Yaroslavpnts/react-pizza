import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number
  onChangePage: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({ onChangePage, currentPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      onPageChange={event => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3} //захардкодено из-за ограничений mock api, там нельзя настроить чтобы сервер возвращал общее кол-во
      // forcePage={currentPage - 1}  // нахрена
      // renderOnZeroPageCount={null}
    />
  );
};

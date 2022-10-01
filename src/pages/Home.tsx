import React, { useCallback, useContext, useEffect, useState } from 'react';
import { /*useDispatch*/ useDispatch, useSelector } from 'react-redux';
// import { SearchContext } from '../App';
import { Categories } from '../components/Categories';
import { Pagination } from '../components/Pagination/Pagination';
import { PizzaBlock } from '../components/Pizzablock';
import PizzaSkeleton from '../components/Pizzablock/Skeleton';
import { Sort, sortList } from '../components/Sort';
import {
  FilterSliceState,
  selectFilters,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useRef } from 'react';
import { fetchPizzas, SearchPizzaParams, selectPizzas } from '../redux/slices/pizzasSlice';
import { useAppDispatch } from '../redux/store';


export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const isSearch = useRef(false);
  const isMounted = useRef(false);

  import("../utils/math").then(math => {
  console.log(math.add(16, 26));
});

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilters);
  // const { searchValue } = useContext(SearchContext);

  const { items: pizzas, status } = useSelector(selectPizzas);

  const sortType = sort.sortProperty;

  const onChangeCategory = useCallback((i: number) => {
    dispatch(setCategoryId(i));
  }, []);

  // const onChangeCategory = (i: number) => {
  //   dispatch(setCategoryId(i));
  // };

  // const [isLoading, setIsLoading] = useState(false);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // const [searchParams, setSearchParams] = useSearchParams();

  // если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  // если был первый рендер, то проверяем URL параметры и сохраняем в redux
  useEffect(() => {
    // debugger;
    if (window.location.search) {
      const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams

      const sort = sortList.find(obj => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        })
      );

      // isSearch.current = true;
    }
  }, []);

  const getPizzas = () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      // @ts-ignore
      fetchPizzas({
        category,
        sortBy,
        order,
        search,
        currentPage: String(currentPage)
      })
    );
  };

  // если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    // if (!isSearch.current) {
    getPizzas();
    // }

    // isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const allPizzas = pizzas
    // .filter(pizza => {
    //   return pizza.title.toLowerCase().includes(searchValue.toLowerCase());
    // })
    .map((pizza: any) => (    
        <PizzaBlock key={pizza.id} {...pizza} />
    ));

  const skeletons = [...new Array(10)].map((_, index) => <PizzaSkeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Список пицц пуст</h2>
          <p>Вероятнее всего произошла какая-то ошибка получения данных</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : allPizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

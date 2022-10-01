import './scss/app.scss';
import { Home } from './pages/Home';
// import { Cart } from './pages/Cart';
// import { FullPizza } from './pages/FullPizza';
// import { NotFoundBlock } from './components/NotFoundBlock';

import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import React, {Suspense} from 'react';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));

// если экспорт не по default, то через React.lazy нужно импортировать таким образом
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza').then(module => ({
  default: module.FullPizza,
}))); 
const NotFoundBlock = React.lazy(() => import(/* webpackChunkName: "NotFoundBlock" */ './pages/NotFound'));

// export const SearchContext = createContext();

function App() {
  // const [searchValue, setSearchValue] = useState('');

  return (
    // <div className="wrapper">
    // {/* <SearchContext.Provider value={{ searchValue, setSearchValue }}> */}
    // {/* <Header /> */}
    // <div className="content">
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Suspense fallback={<div>Идет загрузка корзины...</div>}>
          <Cart />
        </Suspense>} />
        <Route path="pizza/:id" element={<Suspense fallback={<div>Идет загрузка пиццы...</div>}>
          <FullPizza />
        </Suspense>} />
        <Route path="*" element={<NotFoundBlock />} />
      </Route>
    </Routes>
    // {/* </div> */}
    // {/* </SearchContext.Provider> */}
    // </div>
  );
}

export default App;

import { Outlet, Link } from "react-router"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">法式手工甜點</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mx-3">
              <Link className="nav-link" to="">首頁</Link>
              <Link className="nav-link" to="about">關於</Link>
              <Link className="nav-link" to="products">產品列表</Link>
              <Link className="nav-link" to="cart">購物車</Link>
              <Link className="nav-link" to="login">登入</Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="container p-3">
        <Outlet />
      </div>
      <footer className="text-center">法式手工甜點 @ 版權所有</footer>
    </>
  )
}

export default App

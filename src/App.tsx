import { Layout, Typography } from "antd";
import { Content, } from "antd/es/layout/layout";
import { Header } from './components/Header'
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import { useAppSelector } from "./hooks/useAppSelector";
import { useAuth } from "./hooks/useAuth";

const App: React.FC = () => {

  const {  isAuth } = useAuth();
  const error = useAppSelector(state => state.search.error);

  if (!isAuth) {
    return <Navigate to="login" replace={true} />
  }

  return (
    <Layout className="layout">
      <Header />
      <Typography.Text style={{ color: 'red' }}>{error}</Typography.Text>
      <Content className="container">
        <Outlet />
      </Content>
    </Layout >
  )
}

export default App

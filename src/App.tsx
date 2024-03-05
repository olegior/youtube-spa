import { Layout, Modal, Typography } from "antd";
import { Content, } from "antd/es/layout/layout";
import { Header } from './components/Header'
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import { useAppSelector } from "./hooks/useAppSelector";
import { useAuth } from "./hooks/useAuth";
import { ModalHandler } from "./types";

const App: React.FC = () => {

  const { isAuth } = useAuth();
  const error = useAppSelector(state => state.search.error);
  const [modal, modalContextHolder] = Modal.useModal();

  const modalHandler: ModalHandler = (content, onOk) => {
    modal.confirm({
      cancelText: 'Отмена',
      okText: 'Сохранить',
      closable: true,
      content,
      onOk,
    })
  }

  if (!isAuth) {
    return <Navigate to="login" replace={true} />
  }

  return (
    <Layout className="layout">
      <Header />
      <Typography.Text style={{ color: 'red' }}>{error}</Typography.Text>
      <Content className="container">
        <Outlet context={modalHandler} />
      </Content>
      {modalContextHolder}
    </Layout >
  )
}

export default App

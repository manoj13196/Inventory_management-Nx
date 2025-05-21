import { Refine } from "@refinedev/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { dataProvider } from "../Dataprovider/data_provider";
import Sidebar from "../components/Sidebar";
import ItemsPage from "../items/Items";  // Adjust path if needed
import { Layout, Row, Col } from "antd";

const App = () => {
  return (
    <BrowserRouter>
      <Refine dataProvider={dataProvider}>
        <Layout>
          <Row>
            <Col span={6}>
              <Sidebar />
            </Col>
            <Col span={18}>
              <Routes>
                <Route path="/" element={<ItemsPage />} />
                <Route path="/categories/:id" element={<ItemsPage />} />
                <Route path="/categories/all" element={<Navigate to="/" replace />} />
              </Routes>
            </Col>
          </Row>
        </Layout>
      </Refine>
    </BrowserRouter>
  );
};

export default App;

import { useList } from "@refinedev/core";
import { Menu, Spin } from "antd";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { data, isLoading } = useList({ resource: "categories" });
  const location = useLocation();

  // Parse category ID from current URL
  const pathParts = location.pathname.split("/");
  const selectedKey = pathParts[1] === "categories" && pathParts[2] ? pathParts[2] : "all";

  if (isLoading) return <Spin />;

  const menuItems = [
    {
      key: "all",
      label: <Link to="/">All Items</Link>,
    },
    ...(data?.data.map((category: any) => ({
      key: category.id.toString(),
      label: <Link to={`/categories/${category.id}`}>{category.name}</Link>,
    })) || []),
  ];

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      style={{ height: "100vh" }}
      items={menuItems}
    />
  );
};

export default Sidebar;

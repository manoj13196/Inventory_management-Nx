import { useList } from "@refinedev/core";
import { List, Card, Spin } from "antd";
import { useLocation } from "react-router";

export const ItemList = () => {
    const location = useLocation();

    const currentParams = new URLSearchParams(location.search);
    const categoryId = currentParams.get("category");

    const { data, isLoading } = useList({
        resource: "items",
        filters: categoryId
            ? [{ field: "category.id", operator: "eq", value: categoryId }]
            : [],
    });

    const items = data?.data ?? [];
    console.log(items)

    if (isLoading) {
        return <Spin />;
    }

    return (
        <div>
            <div>
                cate
            </div>
              <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={items}
            renderItem={(item: any) => (
                <List.Item>
                    <Card title={item.name}>
                        <p>Price: ${item.price}</p>
                        <p>Category: {item.category?.name}</p>
                    </Card>
                </List.Item>
            )}
        />
        </div>
      
    );
};

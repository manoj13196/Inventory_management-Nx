import { useState, useEffect } from "react";
import {
  useList,
  useCreate,
  useUpdate,
  useDelete,
} from "@refinedev/core";
import {
  Card,
  Col,
  Row,
  Spin,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Space,
  message,
  Tooltip,
} from "antd";
import { useParams } from "react-router-dom";

const { Title, Paragraph } = Typography;

const ItemsPage = () => {
  const { id } = useParams<{ id?: string }>();
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();  
  const categoryId = id && id !== "all" ? parseInt(id) : null;
  const { data, isLoading, refetch } = useList({
    resource: "items",
    filters: categoryId
      ? [
          {
            field: "categoryId",
            operator: "eq",
            value: categoryId,
          },
        ]
      : undefined,
  });

  const { mutate: createItem } = useCreate();
  const { mutate: updateItem } = useUpdate();
  const { mutate: deleteItem } = useDelete();

  useEffect(() => {
    if (isModalVisible) {
      if (selectedItem) {
        form.setFieldsValue(selectedItem);
      } else {
        form.resetFields();
      }
    }
  }, [selectedItem, isModalVisible, form]);

  const handleCreate = () => {
    setSelectedItem(null);
    setIsModalVisible(true);
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    deleteItem(
      {
        resource: "items",
        id,
      },
      {
        onSuccess: () => {
          message.success("Item deleted");
          refetch();
        },
      }
    );
  };

  const handleSubmit = (values: any) => {
    // Use categoryId from URL if exists; fallback to selected item's categoryId
    const fixedCategoryId = categoryId ?? selectedItem?.categoryId;

    const valuesWithCategory = {
      ...values,
      categoryId: fixedCategoryId,
    };

    if (selectedItem) {
      updateItem(
        {
          resource: "items",
          id: selectedItem.id,
          values: valuesWithCategory, // <-- Correct key here
        },
        {
          onSuccess: () => {
            message.success("Item updated");
            refetch();
            setIsModalVisible(false);
          },
        }
      );
    } else {
      createItem(
        {
          resource: "items",
          values: valuesWithCategory,
        },
        {
          onSuccess: () => {
            message.success("Item created");
            refetch();
            setIsModalVisible(false);
          },
        }
      );
    }
  };

  if (isLoading) return <Spin />;

  const items = data?.data || [];

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3}>
        {id === "all" || !id ? "All Items" : `Items in Category ${id}`}
      </Title>

      <Tooltip title={!categoryId ? "Select a category to add items" : ""}>
        <Button
          type="primary"
          onClick={handleCreate}
          disabled={!categoryId}
          style={{ marginBottom: 16 }}
        >
          Add New Item
        </Button>
      </Tooltip>

      <Row gutter={[16, 16]}>
        {items.map((item: any) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
            <Card title={item.name}>
              <Paragraph>
                <strong>Quantity:</strong> {item.quantity}
                <br />
                <strong>Price:</strong> ${item.price}
                <br />
                <strong>Category ID:</strong> {item.categoryId}
              </Paragraph>

              <Space>
                <Button onClick={() => handleEdit(item)}>Edit</Button>
                <Button danger onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        title={selectedItem ? "Edit Item" : "Create Item"}
        destroyOnHidden
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          {/* Show locked category as disabled input */}
          <Form.Item label="Category">
            <Input value={categoryId ?? selectedItem?.categoryId} disabled />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ItemsPage;

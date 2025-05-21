import { DataProvider } from "@refinedev/core";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const dataProvider: DataProvider = {
  getList: async ({ resource, filters, pagination, sort }) => {
    
    const params: Record<string, any> = {};

  
    if (filters && filters.length > 0) {
      filters.forEach(({ field, operator, value }) => {
       
        if (operator === "eq") {
          params[field] = value;
        }
       
      });
    }

    // Pagination example
    if (pagination) {
      params["_page"] = pagination.current;
      params["_limit"] = pagination.pageSize;
    }

    // Sorting example
    if (sort && sort.length > 0) {
      params["_sort"] = sort[0].field;
      params["_order"] = sort[0].order === "asc" ? "asc" : "desc";
    }

    const response = await axios.get(`${API_URL}/${resource}`, { params });

    // Assuming your backend returns total count in headers (common in REST APIs)
    const total = parseInt(response.headers["x-total-count"]) || response.data.length;

    return {
      data: response.data,
      total,
    };
  },

  create: async ({ resource, variables }) => {
    const response = await axios.post(`${API_URL}/${resource}`, variables);
    return {
      data: response.data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const response = await axios.put(`${API_URL}/${resource}/${id}`, variables);
    return {
      data: response.data,
    };
  },

  deleteOne: async ({ resource, id }) => {
    await axios.delete(`${API_URL}/${resource}/${id}`);
    return {
      data: { id },
    };
  },
};

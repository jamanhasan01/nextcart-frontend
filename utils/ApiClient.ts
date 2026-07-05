/* ===============================
   api-client.ts
================================ */

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get(endpoint: string, params?: Record<string, any>) {
    const query = new URLSearchParams(
      params as Record<string, string>,
    ).toString();

    const res = await fetch(
      `${this.baseUrl}${endpoint}${query ? `?${query}` : ""}`,
      {
        credentials: "include",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

  async post(endpoint: string, body: unknown) {
    const isFormData = body instanceof FormData;

    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      credentials: "include",
      headers: isFormData
        ? undefined
        : {
            "Content-Type": "application/json",
          },

      body: isFormData ? body : JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create data");
    }

    return data;
  }

  async patch(endpoint: string, body: unknown) {
    const isFormData = body instanceof FormData;

    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PATCH",

      headers: isFormData
        ? undefined
        : {
            "Content-Type": "application/json",
          },

      body: isFormData ? body : JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update data");
    }

    return data;
  }

  async delete(endpoint: string) {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to delete data");
    }

    return res.json();
  }
}

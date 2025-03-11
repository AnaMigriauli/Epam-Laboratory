import { test, expect } from "@playwright/test";
import axios from "axios";

const token = "pk_176557576_SW0VKDVZBGZI1P3W2DPBNRIZ6DYVCI5Y";
const listID = 901806268739;
const apiUrl = `https://api.clickup.com/api/v2/list/${listID}/task`;
const apiURL2 = `https://api.clickup.com/api/v2/task/${listID}`;
let createdTaskId;

test.describe.serial("ClickUp API Tests", () => {
  test("Create a Task", async () => {
    try {
      const taskData = {
        name: "test1",
        description: "test1 Task",
        status: "to do",
      };

      const response = await axios.post(apiUrl, taskData, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("id");

      createdTaskId = response.data.id;
    } catch (error) {
      console.error(
        "Error during the Task creation",
        error.response?.data || error.message
      );
    }
  });

  test("Get Task data", async () => {
    try {
      const response = await axios.get(`${apiURL2}/${createdTaskId}`, {
        headers: { Authorization: token },
      });

      console.log(response.data);
      expect(response.status).toBe(200);
      expect(response.data.name).toBe("test1");
      expect(response.data.description).toBe("test1 Task");
    } catch (error) {
      console.error(
        "Error during the Task data retriev",
        error.response?.data || error.message
      );
    }
  });

  test("Update task", async () => {
    try {
      const UpdateTaskData = {
        name: "test2",
        description: "test2 Task",
        status: "In progress",
      };

      const response = await axios.put(
        `${apiURL2}/${createdTaskId}`,
        UpdateTaskData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      expect(response.status).toBe(200);
      expect(response.data.name).toBe("test2");
      expect(response.data.description).toBe("test2 Task");
    } catch (error) {
      console.error(
        "Error during the Task update",
        error.response?.data || error.message
      );
    }
  });

  test("Delete task", async () => {
    try {
      const response = await axios.delete(`${apiURL2}/${createdTaskId}`, {
        headers: { Authorization: token },
      });
      expect(response.status).toBe(204);
    } catch (error) {
      console.error(
        "Error during the Task deletion",
        error.response?.data || error.message
      );
    }
  });
});

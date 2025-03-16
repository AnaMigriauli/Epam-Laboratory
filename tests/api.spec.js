import { test, expect } from "@playwright/test";
import axios from "axios";

const token = "pk_176557576_SW0VKDVZBGZI1P3W2DPBNRIZ6DYVCI5Y";
const listID = 901806268739;
const apiUrl = `https://api.clickup.com/api/v2/list/${listID}/task`;
const apiURL2 = `https://api.clickup.com/api/v2/task/${listID}`;
let createdTaskId;

test.describe.serial("ClickUp API Tests", () => {
  test("If user creates a task, it should be created successfully", async () => {
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
  });

  test("If user retrieves task data, it should return correct details", async () => {
    const response = await axios.get(`${apiURL2}/${createdTaskId}`, {
      headers: { Authorization: token },
    });

    expect(response.status).toBe(200);
    expect(response.data.name).toBe("test1");
    expect(response.data.description).toBe("test1 Task");
  });

  test("If user updates a task, it should update correctly", async () => {
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
  });

  test("If user deletes a task, it should be removed successfully", async () => {
    const response = await axios.delete(`${apiURL2}/${createdTaskId}`, {
      headers: { Authorization: token },
    });
    expect(response.status).toBe(204);
  });
});

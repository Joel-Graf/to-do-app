import axios, { AxiosInstance } from "axios";
import { TaskDTO } from "../constants/types";

/**
 * Enum defining content types for API requests.
 */
export enum ContentType {
  Json = "application/json",
}

/**
 * Api class to handle all API interactions.
 */
class Api {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "https://to-do-app-production-7d56.up.railway.app/api",
      headers: {
        "Content-Type": ContentType.Json,
      },
    });

    // Request interceptor for CORS configurations
    this.instance.interceptors.request.use((config) => {
      config.headers["Access-Control-Allow-Origin"] = "*";
      config.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE";
      config.headers["Access-Control-Allow-Headers"] =
        "Content-Type, Authorization";
      return config;
    });

    // Response interceptor for error handling
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          return Promise.reject(error.response);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Fetches all tasks.
   * @returns A promise resolving to an array of TaskDTO.
   */
  async getAllTasks(): Promise<TaskDTO[]> {
    const response = await this.instance.get<TaskDTO[]>("/task");
    return response.data; // No date conversion needed
  }

  /**
   * Fetches a single task by its ID.
   * @param id - The ID of the task.
   * @returns A promise resolving to a TaskDTO.
   */
  async getTaskById(id: number): Promise<TaskDTO> {
    const response = await this.instance.get<TaskDTO>(`/task/${id}`);
    return response.data; // No date conversion needed
  }

  /**
   * Creates a new task.
   * @param data - The task data.
   * @returns A promise resolving to the created TaskDTO.
   */
  async createTask(data: TaskDTO): Promise<TaskDTO> {
    const response = await this.instance.post<TaskDTO>("/task", data);
    return response.data;
  }

  /**
   * Updates an existing task.
   * @param id - The ID of the task.
   * @param data - The updated task data.
   * @returns A promise that resolves when the update is complete.
   */
  async updateTask(id: number, data: TaskDTO): Promise<void> {
    await this.instance.put(`/task/${id}`, data);
  }

  /**
   * Deletes a task by its ID.
   * @param id - The ID of the task.
   * @returns A promise that resolves when the deletion is complete.
   */
  async deleteTask(id: number): Promise<void> {
    await this.instance.delete(`/task/${id}`);
  }
}

// Exporting an instance of the API class
const api = new Api();
export default api;

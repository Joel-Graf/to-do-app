import axios, { AxiosInstance } from "axios";
import { TaskDTO } from "../constants/types";

export enum ContentType {
  Json = "application/json",
}

class Api {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:8080/api",
      headers: {
        "Content-Type": ContentType.Json,
      },
    });

    this.instance.interceptors.request.use((config) => {
      config.headers["Access-Control-Allow-Origin"] = "*";
      config.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE";
      config.headers["Access-Control-Allow-Headers"] =
        "Content-Type, Authorization";
      return config;
    });

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
   * Recupera todas as tasks
   */
  async getAllTasks(): Promise<TaskDTO[]> {
    const response = await this.instance.get<TaskDTO[]>("/task");
    return response.data; // Não há mais conversão de datas
  }

  /**
   * Recupera uma task pelo ID
   * @param id ID da task
   */
  async getTaskById(id: number): Promise<TaskDTO> {
    const response = await this.instance.get<TaskDTO>(`/task/${id}`);
    return response.data; // Não há mais conversão de datas
  }

  /**
   * Cria uma nova task.
   * @param data Dados da task
   */
  async createTask(data: TaskDTO): Promise<TaskDTO> {
    const response = await this.instance.post<TaskDTO>("/task", data);
    return response.data;
  }

  /**
   * Atualiza uma task existente.
   * @param id ID da task
   * @param data Dados atualizados
   */
  async updateTask(id: number, data: TaskDTO): Promise<void> {
    await this.instance.put(`/task/${id}`, data);
  }

  /**
   * Deleta uma task pelo ID.
   * @param id ID da task
   */
  async deleteTask(id: number): Promise<void> {
    await this.instance.delete(`/task/${id}`);
  }
}

const api = new Api();
export default api;

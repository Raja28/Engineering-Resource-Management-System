import { type StateCreator } from 'zustand';
import axios from "axios";
import { ADD_PROJECT_API, DELETE_PROJECT_API, UPDATE_PROJECT_API, USER_LOGIN_API, USER_SIGNUP_API } from '../utils/apis';
import type { FormData, LoginData } from '../types/form';
import type { ProjectForm } from '../types/project';

export interface User {
  name: string;
  email: string
  department: string;
  maxCapacity?: string;
  profileImage: string;
  role: string;
  seniority?: string;
  skills?: string[];
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  projects?: any[]
  assignments?: any[]
}

export interface UserSlice {
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
  userSignup: (data: FormData) => Promise<void>;
  userLogin: (data: LoginData) => Promise<void>;
  clearUser: () => void;
  addProject: (projectData: ProjectForm) => Promise<void>;
  deleteProject: (projectData: string) => Promise<void>;
  updateProject: (projectData: ProjectForm) => Promise<void>;
}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (set, get) => ({
  user: getStoredUser(),
  token: getStoredToken(),
  status: "idle",
  error: null,

  clearUser: () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    set({ user: null, token: null, status: "idle", error: null });
  },

  userSignup: async (data: FormData) => {
    set({ status: "loading", error: null });
    try {
      const res = await axios.post(USER_SIGNUP_API, data);
      const user = res.data.user;
      const token = res.data.token;

      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("token", token);

      set({ user, token, status: "success" });
      return user;
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Signup failed",
        status: "error",
      });
      return Promise.reject(err?.response?.data);
    }
  },

  userLogin: async (data: LoginData) => {
    set({ status: "loading", error: null });
    try {
      const res = await axios.post(USER_LOGIN_API, data);
      const user = res.data.user;
      const token = res.data.token;

      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("token", token);

      set({ user, token, status: "success" });
      return user;
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Login failed",
        status: "error",
      });
      return Promise.reject(err?.response?.data);
    }
  },

  addProject: async (projectData: ProjectForm) => {
    set({ status: "loading", error: null });
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axios.post(ADD_PROJECT_API, projectData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {

        const newProject = res.data.project;
        const currentUser = get().user;

        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            projects: [newProject, ...(currentUser.projects || [])],
          };

          set({ user: updatedUser, status: "success" });
          sessionStorage.setItem("user", JSON.stringify(updatedUser));
        } else {
          throw new Error(res.data.message || "Failed to add project");
        }
      }
      return res.data.project;

    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to add project",
        status: "error",
      });
      return Promise.reject(err?.response?.data);
    }
  },

  updateProject: async (projectData: ProjectForm) => {
    set({ status: "loading", error: null });
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axios.post(UPDATE_PROJECT_API, projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {

        const updatedProject = res.data.project;
        const currentUser = get().user;

        if (currentUser) {
          const updatedProjects = currentUser.projects?.map((project) =>
            project._id === updatedProject._id ? updatedProject : project
          );

          const updatedUser = { ...currentUser, projects: updatedProjects };

          set({ user: updatedUser, status: "success" });
          sessionStorage.setItem("user", JSON.stringify(updatedUser));
        } else {
          throw new Error(res.data.message || "Failed to update project");
        }
      }
      return res.data.project;

    } catch (err: any) {
      console.log("Error updating project:", err);

      set({
        error: err?.response?.data?.message || "Failed to update project",
        status: "error",
      });
      return Promise.reject(err?.response?.data);
    }
  },

  deleteProject: async (projectId: string) => {
    set({ status: "loading", error: null });
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axios.delete(`${DELETE_PROJECT_API}/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        const currentUser = get().user;

        if (currentUser) {
          const updatedProjects = currentUser.projects?.filter(
            (project) => project._id !== projectId
          );

          const updatedUser = { ...currentUser, projects: updatedProjects };

          set({ user: updatedUser, status: "success" });
          sessionStorage.setItem("user", JSON.stringify(updatedUser));
        } else {
          throw new Error(res.data.message || "Failed to delete project");
        }
      }
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to delete project",
        status: "error",
      });
      return Promise.reject(err?.response?.data);
    }
  }

});

// Utility functions for safely reading from sessionStorage
function getStoredUser(): User | null {
  try {
    const data = sessionStorage.getItem("user");
    return data && data !== "undefined" ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function getStoredToken(): string | null {
  const token = sessionStorage.getItem("token");
  return token && token !== "undefined" ? token : null;
}

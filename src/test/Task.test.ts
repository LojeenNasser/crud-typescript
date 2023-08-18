import { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import TaskModel from "../models/Task";
import { TaskDocument } from "../models/Task";
import { Document } from "mongoose";

chai.should();
chai.use(chaiHttp);

describe("Tasks API", () => {
  before(async () => {
    await TaskModel.deleteMany({});
  });

  describe("GET /api/tasks", () => {
    it("should get all tasks", async () => {
      const response = await chai.request(app).get("/api/tasks");
      response.should.have.status(200);
      response.body.data.should.be.an("array");
      response.body.data.length.should.be.eql(0);
    });
  });

  describe("POST /api/tasks", () => {
    it("should create a new task", async () => {
      const newTask = {
        taskTitle: "This is the first task",
        taskName: "Task Name",
        taskStartDate: "2023-08-08T00:00:00Z",
        taskEndDate: "2023-08-15T00:00:00Z",
        taskBody: "This is a task post",
        taskImage: "https://images.unsplash.com/...",
      };

      const response = await chai.request(app).post("/api/tasks").send(newTask);
      response.should.have.status(200);
      response.body.should.be.an("object");
      response.body.status.should.be.eql("success");
    });
  });

  describe("GET /api/tasks/:id", () => {
    it("should get a task by ID", async () => {
      const sampleTask = new TaskModel({
        taskTitle: "This is the first task",
        taskName: "Task Name",
        taskStartDate: "2023-08-08T00:00:00Z",
        taskEndDate: "2023-08-15T00:00:00Z",
        taskBody: "This is a task post",
        taskImage: "https://images.unsplash.com/...",
      });

      await sampleTask.save();

      const response = await chai.request(app).get(`/api/tasks/${sampleTask._id}`);
      response.should.have.status(200);
      response.body.should.be.an("object");
      response.body.status.should.be.eql("success");
    });
  });

  describe("PUT /api/tasks/:id", () => {
    it("should update a task by ID", async () => {
      const sampleTask = new TaskModel({
        taskTitle: "This is the first task",
        taskName: "Task Name",
        taskStartDate: "2023-08-08T00:00:00Z",
        taskEndDate: "2023-08-15T00:00:00Z",
        taskBody: "This is a task post",
        taskImage: "https://images.unsplash.com/...",
      });

      await sampleTask.save();

      const updatedTask = {
        taskTitle: "The first task was updated",
        taskName: "Updated Task Name",
        taskStartDate: "2023-08-08T00:00:00Z",
        taskEndDate: "2023-08-15T00:00:00Z",
        taskBody: "This is a task post",
        taskImage: "https://images.unsplash.com/...",
      };

      const response = await chai.request(app).put(`/api/tasks/${sampleTask._id}`).send(updatedTask);
      response.should.have.status(200);
      response.body.should.be.an("object");
      response.body.status.should.be.eql("success");
    });
  });

  describe("DELETE /api/tasks/:id", () => {
    it("should delete a task by ID", async () => {
      const sampleTask = new TaskModel({
        taskTitle: "This is the first task",
        taskName: "Task Name",
        taskStartDate: "2023-08-08T00:00:00Z",
        taskEndDate: "2023-08-15T00:00:00Z",
        taskBody: "This is a task post",
        taskImage: "https://images.unsplash.com/...",
      });

      await sampleTask.save();

      const response = await chai.request(app).delete(`/api/tasks/${sampleTask._id}`);
      response.should.have.status(200);
      response.body.should.be.an("object");
      response.body.status.should.be.eql("success");
    });
  });
});

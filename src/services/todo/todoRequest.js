import axiosInstance from "src/api/axiosInstance";
import { RequestStatus } from "src/constant";
import { settingSliceActions } from "src/services/setting/settingSlice";
import { todoSliceActions } from "src/services/todo/todoSlice";
import { convertTodoListChild } from "src/utils/helper";

export const todoRequest = {
  getAllGroups: async function (dispatch) {
    try {
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.PENDING,
        })
      );
      const url = "/todo/groups";
      const res = await axiosInstance.get(url);
      dispatch(todoSliceActions.getAllGroups(res.data.groups));
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.SUCCESS,
        })
      );
    } catch (err) {
      console.log("err: ", err);

      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.ERROR,
        })
      );
    }
  },

  getAllTodos: async function (dispatch, groupId) {
    try {
      const url = `/todo/todolist?groupId=${groupId}`;
      const res = await axiosInstance.get(url);

      return convertTodoListChild(res.data.todolist);
    } catch (err) {
      console.log("err: ", err);
    }
  },

  getAllTodos: async function (dispatch, groupId, todoId) {
    try {
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.PENDING,
        })
      );
      const url = `/todo/todolist?groupId=${groupId}&todoId=${todoId}`;
      const res = await axiosInstance.get(url);
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.SUCCESS,
        })
      );
      return res.data;
    } catch (err) {
      console.log("err: ", err);
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.ERROR,
        })
      );
    }
  },
};

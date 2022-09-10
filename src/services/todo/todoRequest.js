import axiosInstance from "src/api/axiosInstance";
import { RequestStatus } from "src/constant";
import { settingSliceActions } from "src/services/setting/settingSlice";
import { todoSliceActions } from "src/services/todo/todoSlice";

export const todoRequest = {
  getAllGroup: async function (dispatch) {
    try {
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.PENDING,
        })
      );
      const url = "/todo/groups";
      const res = await axiosInstance.get(url);
      dispatch(todoSliceActions.getAllGroup(res.data.groups));
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
};

import { apiSlice } from "../../../redux/apiSlice";

export const attendanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // 1. Get Attendance by Date
    getAttendanceByDate: builder.query({
      query: (date) => `/v1/attendance/all?date=${date}`,
      providesTags: ["Attendance"],
    }),

    // 2. Bulk Update Attendance
    bulkUpdateAttendance: builder.mutation({
      query: (body) => ({
        url: "/v1/attendance/bulk-update",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Attendance"],
    }),

    // 3. Monthly Attendance
    getMonthlyAttendance: builder.query({
      query: ({ month, year }) =>
        `/v1/attendance/monthly/${month}/${year}`,
      providesTags: ["Attendance"],
    }),

  }),
});

export const {
  useGetAttendanceByDateQuery,
  useBulkUpdateAttendanceMutation,
  useGetMonthlyAttendanceQuery,
} = attendanceApi;
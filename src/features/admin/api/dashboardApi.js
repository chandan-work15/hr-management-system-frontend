import { apiSlice } from "../../../redux/apiSlice";

export const adminDashboardApi = apiSlice.injectEndpoints ({
  endpoints: (builder) => ({
    getAdminStats: builder.query({
      query: () => "/dashboard/dashboard-detail",
      providesTags:["Dashboard"]
    }),

    getTodayLeaveRequests: builder.query({
      query: () => "/applications",
      providesTags:["Dashboard"]
    }),
  }),
});

export const { useGetAdminStatsQuery, useGetTodayLeaveRequestsQuery } =
  adminDashboardApi;

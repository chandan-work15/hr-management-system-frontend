import { apiSlice } from "../../../redux/apiSlice";

export const adminDashboardApi = apiSlice.injectEndpoints ({
  endpoints: (builder) => ({
    getAdminStats: builder.query({
      query: () => "/v1/dashboard/admin",
      providesTags:["Dashboard"]
    }),
 
    getTodayLeaveRequests: builder.query({
      query: () => "/v1/applications",
      providesTags:["Dashboard"]
    }),
  }),
});

export const { useGetAdminStatsQuery, useGetTodayLeaveRequestsQuery } =
  adminDashboardApi;

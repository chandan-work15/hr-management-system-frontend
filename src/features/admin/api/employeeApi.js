import { apiSlice } from "../../../redux/apiSlice";

export const employeeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: ({
        page = 1,
        limit = 5,
        search = "",
        sortField = "",
        sortOrder = "asc",
        role = "",
      }) =>
        `/v1/users?page=${page}&limit=${limit}&search=${search}&sortField=${sortField}&sortOrder=${sortOrder}&role=${role}`,
      providesTags: ["Employees"],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/v1/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employees"],
    }),
    updateEmployee: builder.mutation({
      query: ({ id, body }) => ({
        url: `/v1/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Employees"],
    }),
    addEmployee: builder.mutation({
      query: (employeeData) => ({
        url: "/v1/users",
        method: "POST",
        body: employeeData,
      }),
      providesTags: ["Employees"],
      invalidatesTags: ["Employees"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
  useAddEmployeeMutation,
} = employeeApi;

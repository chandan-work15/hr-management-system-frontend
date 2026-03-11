import { apiSlice } from "../../../redux/apiSlice";

export const employeeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => "/users",
      providesTags: ["Employees"],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employees"],
    }),
    updateEmployee: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Employees"],
    }),
    addEmployee: builder.mutation({
      query: (employeeData) => ({
        url: "/users",
        method:"POST",
        body: employeeData,
      }),
      invalidatesTags:["Employees"]
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
  useAddEmployeeMutation
} = employeeApi;

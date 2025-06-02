import AddEmployee from "@/app/(dashboardLayout)/Components/Pages/Admin/AddEmployee/AddEmployee";

const AddEmployeePage = () => {
  return (
    <div className="mt-5">
      <h2 className="text-3xl text-center font-medium mb-10">
        Please fill all the information and submit the form
      </h2>
      <AddEmployee />
    </div>
  );
};

export default AddEmployeePage;

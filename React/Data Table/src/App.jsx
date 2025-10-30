import DataTable from "./DataTable/DataTable";
import users from "./data/users";
import "./App.css";
function App() {
  return (
    <div>
      <DataTable data={users} pageSizes={[5, 10, 20]} />
    </div>
  );
}

export default App;

import ContractsList from "../Components/ContractsList";

const ApprovePage = (props) => {
  return (
    <div className="approvePage">
      <ContractsList filter="pendingApproval" page="approve" />
    </div>
  );
};

export default ApprovePage;

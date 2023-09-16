import ContractsList from "../Components/ContractsList";

const ApprovePage = () => {
  return (
    <div>
      <ContractsList filter="pendingApproval" />
    </div>
  );
};

export default ApprovePage;

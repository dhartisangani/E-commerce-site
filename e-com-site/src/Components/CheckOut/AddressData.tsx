import { useEffect, useState } from "react";
import AddressList from "./AddressList";
import { BillingDetail, PageEnum } from "../../type";
import AddAddress from "./AddAddress";
import EditAddress from "./EditAddress";
import { Card, Grid } from "@material-ui/core";
import OrderDetail from "./OrderDetail";
interface OnNextHandleProps {
  onNext: () => void;
}
const AddressData = (props: OnNextHandleProps) => {
  const [addressList, setAddressList] = useState([] as BillingDetail[]);
  const [shownPage, setShownPage] = useState(PageEnum.list);
  const [dataToEdit, setDataToEdit] = useState({} as BillingDetail);

  useEffect(() => {
    const listInString = window.localStorage.getItem("AddressList");
    if (listInString) {
      _setAddressList(JSON.parse(listInString));
    }
  }, []);

  const onAddAddressClickHnd = () => {
    setShownPage(PageEnum.add);
  };

  const showListPage = () => {
    setShownPage(PageEnum.list);
  };

  const _setAddressList = (list: BillingDetail[]) => {
    setAddressList(list);
    window.localStorage.setItem("AddressList", JSON.stringify(list));
  };

  const addAddress = (data: BillingDetail) => {
    _setAddressList([...addressList, data]);
  };

  const deleteAddress = (data: BillingDetail) => {

    const indexToDelete = addressList.indexOf(data);
    const tempList = [...addressList];

    tempList.splice(indexToDelete, 1);
    _setAddressList(tempList);
  };

  const editAddressData = (data: BillingDetail) => {
    setShownPage(PageEnum.edit);
    setDataToEdit(data);
  };

  const updateData = (data: BillingDetail) => {
    const filteredData = addressList.filter((x) => x.id === data.id)[0];
    const indexOfRecord = addressList.indexOf(filteredData);
    const tempData = [...addressList];
    tempData[indexOfRecord] = data;
    _setAddressList(tempData);
  };
  const HandleNext = () => {
    props.onNext();
  };

  return (
    <Grid>

      <Grid
        container
        spacing={2}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Grid item xs={12} md={7} sm={12}>
          {shownPage === PageEnum.list && (
            <Card>
              <AddressList
                list={addressList}
                onDeleteClickHnd={deleteAddress}
                onEdit={editAddressData}
                onNext={HandleNext}
                onAddAddress={onAddAddressClickHnd}
              />
            </Card>
          )}
          {shownPage === PageEnum.add && (
            <AddAddress
              onBackBtnClickHnd={showListPage}
              onSubmitClickHnd={addAddress}
            />
          )}

          {shownPage === PageEnum.edit && (
            <EditAddress
              data={dataToEdit}
              onBackBtnClickHnd={showListPage}
              onUpdateClickHnd={updateData}
            />
          )}
        </Grid>
        <Grid item xs={12} md={3} sm={12}>
          <OrderDetail />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddressData;
import React from "react";
import { BillingDetail } from "../../type";
import {
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Radio,
  Typography,
} from "@material-ui/core";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  address: BillingDetail;
  onDeleteClickHnd: (data: BillingDetail) => void;
  onEdit: (data: BillingDetail) => void;
};

const AddressCard = (props: Props) => {
  const { address, onDeleteClickHnd, onEdit } = props;
  // const addressData: BillingDetail = JSON.parse(
  //   localStorage.getItem("Address") as string
  // );

  // const handleUpdate = () => {
  //   props.UpdateHandler();
  // };
  // const deleteAddress = () => {
  //   localStorage.removeItem("Address");
  // };

  return (
    <Card style={{ width: "100%" }}>
      <CardContent>
        <FormControlLabel
          value="Address"
          control={<Radio />}
          label="My Address"
        />
        <Typography variant="body1" gutterBottom style={{ fontSize: "13px" }}>
          Name:- {address.firstName} {address.lastName}
        </Typography>
        <Typography variant="body1" gutterBottom style={{ fontSize: "13px" }}>
          Email:-{address.email}
        </Typography>
        <Typography variant="body1" gutterBottom style={{ fontSize: "13px" }}>
          Address:- {address.address1} {address.address2}
        </Typography>

        <Typography variant="body1" gutterBottom style={{ fontSize: "13px" }}>
          City:-{address.city}
        </Typography>
        <Typography variant="body1" gutterBottom style={{ fontSize: "13px" }}>
          State:-{address.state}
        </Typography>
        <Typography variant="body1" gutterBottom style={{ fontSize: "13px" }}>
          Pincode:-
          {address.pincode}
        </Typography>

        <Typography component="div">
          <span onClick={() => onEdit(address)}>
            <BorderColorIcon /> Edit
          </span>
          <span onClick={() => onDeleteClickHnd(address)}>
            <DeleteIcon /> Delete
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AddressCard;

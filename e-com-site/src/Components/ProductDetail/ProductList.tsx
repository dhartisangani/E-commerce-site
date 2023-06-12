import ProductCard from "../../UI/ProductCard";
import { Grid, Box } from "@mui/material";
import { Product } from "../../type";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
interface Props {
  data: Product[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
    },
  })
);
export {};

const ProductList = ({ data }: Props) => {
  const classes = useStyles();
  return (
    <Box py={6}>
      <Grid
        container
        spacing={12}
        justifyContent="center"
        className={classes.root}
      >
        {data?.map((item: Product, index) => (
          <Grid
            item
            xs={8}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            key={index}
            justifyContent="center"
            alignItems="center"
          >
            <ProductCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;

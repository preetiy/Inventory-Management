import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { deepPurple, grey } from '@mui/material/colors';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: deepPurple,
    background: {
      default: grey[900],
      paper: grey[800],
    },
    text: {
      primary: '#ffffff',
      secondary: grey[500],
    },
  },
});

const EditPopUp = ({ open, setOpen, selectedProduct, handleSave }) => {
  const [product, setProduct] = useState({
    quantity: selectedProduct.quantity,
    value: parseInt(selectedProduct.value.substring(1)),
    price: parseInt(selectedProduct.price.substring(1)),
    category: selectedProduct.category,
  });

  useEffect(() => {
    setProduct({
      quantity: selectedProduct.quantity,
      value: parseInt(selectedProduct.value.substring(1)),
      price: parseInt(selectedProduct.price.substring(1)),
      category: selectedProduct.category,
    });
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'category' ? value : parseInt(value),
    }));
  };

  const handleSubmit = () => {
    const updatedProduct = {
      ...product,
      name: selectedProduct.name,
      price: `$${product.price || 0}`,
      value: `$${product.value || 0}`,
    };
    handleSave(updatedProduct);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Dialog open={open}>
        <DialogTitle>
          <div>Edit Product</div>
          <div>{selectedProduct.name}</div>
        </DialogTitle>

        <DialogContent>
          <div className="col-1">
            <TextField
              sx={{ margin: '1rem' }}
              className="mx-1"
              name="category"
              label="Category"
              type="text"
              value={product.category}
              onChange={handleChange}
            />
            <TextField
              sx={{ margin: '1rem' }}
              name="price"
              label="Price"
              type="number"
              value={product.price}
              onChange={handleChange}
            />
          </div>

          <div className="col-1">
            <TextField
              sx={{ margin: '1rem' }}
              name="quantity"
              label="Quantity"
              type="number"
              value={product.quantity}
              onChange={handleChange}
            />
            <TextField
              sx={{ margin: '1rem' }}
              name="value"
              label="Value"
              type="number"
              value={product.value}
              onChange={handleChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} style={{color: 'greenyellow'}}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default EditPopUp;

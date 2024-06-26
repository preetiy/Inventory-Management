import React, { useState, useMemo, useCallback } from 'react';
import EditPopUp from '../EditPopUp/EditPopUp';
import {
    TableBody, TableCell, TableContainer, TableHead, TableRow, Table, IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './ItemList.css';

function ItemList({ products, setProducts, isUser, showProducts, setShowProducts }) {
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [disableRows, setDisableRows] = useState([]);

    const handleDelete = useCallback((name) => {
        const updatedProducts = products.filter(product => product.name !== name);
        setProducts(updatedProducts);
        setShowProducts(updatedProducts);
    }, [products, setProducts, setShowProducts]);

    const handleEdit = useCallback((product) => {
        setSelectedProduct(product);
        setOpenEdit(true);
    }, []);

    const handleSave = useCallback((updatedProduct) => {
        const updatedProducts = products.map(product =>
            product.name === updatedProduct.name ? { ...product, ...updatedProduct } : product
        );
        setProducts(updatedProducts);
        setShowProducts(updatedProducts);
        setOpenEdit(false);
    }, [products, setProducts, setShowProducts]);

    const handleDisable = useCallback((productName) => {
        const isDisabled = disableRows.includes(productName);
        if (isDisabled) {
            setDisableRows(disableRows.filter(name => name !== productName));
            const reEnabledProduct = showProducts.find(product => product.name === productName);
            setProducts(prevProducts => [...prevProducts, reEnabledProduct]);
        } else {
            setDisableRows([...disableRows, productName]);
            setProducts(products.filter(product => product.name !== productName));
        }
    }, [disableRows, products, setProducts, showProducts]);

    const actionTabs = useMemo(() => Object.keys(showProducts[0] || {}), [showProducts]);

    return (
        <div>
            <TableContainer>
                <Table sx={{ width: '94%', margin: '1rem' }}>
                    <TableHead>
                        <TableRow>
                            {actionTabs.map((actionTab, index) => (
                                <TableCell className='active-cell' key={index}>
                                    <span className='active-cell-item  head-row'>{actionTab.toUpperCase()}</span>
                                </TableCell>
                            ))}
                            <TableCell className='active-cell'>
                                <span className='active-cell-item  head-row'>ACTION</span>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {showProducts.map(product => (
                            <TableRow key={product.name}>
                                {Object.values(product).map((value, index) => (
                                    <TableCell
                                        key={index}
                                        className={disableRows.includes(product.name) ? 'disable-cell' : 'active-cell'}
                                    >
                                        {value}
                                    </TableCell>
                                ))}
                                <TableCell className={disableRows.includes(product.name) ? 'disable-cell' : 'active-cell'}>
                                    <IconButton disabled={isUser || disableRows.includes(product.name)} onClick={() => handleEdit(product)}>
                                        <EditIcon color={isUser || disableRows.includes(product.name) ? 'disabled' : 'success'} />
                                    </IconButton>
                                    <IconButton disabled={isUser} onClick={() => handleDisable(product.name)}>
                                        {disableRows.includes(product.name) ? (
                                            <VisibilityOffIcon color='secondary' />
                                        ) : (
                                            <VisibilityIcon color={isUser ? 'disabled' : 'primary'} />
                                        )}
                                    </IconButton>
                                    <IconButton disabled={isUser} onClick={() => handleDelete(product.name)}>
                                        <DeleteIcon color={isUser ? 'disabled' : 'warning'} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openEdit && (
                <EditPopUp
                    showPopUp={openEdit}
                    setShowPopUp={setOpenEdit}
                    selectedProduct={selectedProduct}
                    handleSave={handleSave}
                />
            )}
        </div>
    );
}

export default ItemList;

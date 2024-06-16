import React from 'react';
import { Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';

import './StatsTab.css';

const statItems = [
  { icon: <ShoppingCartIcon />, label: "Total Product", valueKey: "totalProducts" },
  { icon: <MonetizationOnIcon />, label: "Total Store Value", valueKey: "totalValue" },
  { icon: <RemoveShoppingCartIcon />, label: "Out of Stock", valueKey: "outOfStock" },
  { icon: <CategoryIcon />, label: "No of Category", valueKey: "totalCategory" },
];

function StatsTab({ totalProducts, totalValue, outOfStock, totalCategory }) {
  const stats = { totalProducts, totalValue, outOfStock, totalCategory };

  return (
    <div>
      <div className='mx-1'>
        <h1 className='stats-heading'>Inventory Stats</h1>
      </div>
      <div className='tab-container'>
        {statItems.map(({ icon, label, valueKey }) => (
          <div className='tab-box' key={label}>
            <div className='heading'>
              {icon}
              <Typography>{label}</Typography>
            </div>
            <div className='t-text'>
              <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
                {stats[valueKey]}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsTab;

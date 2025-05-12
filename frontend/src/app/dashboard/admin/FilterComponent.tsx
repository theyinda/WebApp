"use client";

import React from "react";
import { MenuItem, FormControl, Select } from "@mui/material";

const FilterDropdown = ({ filter, setFilter }) => {
    return (
        <FormControl size="small" variant="outlined"
            sx={{
                minWidth: 150,
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#E2E8F0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#E2E8F0',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#E2E8F0',
                },
            }}>
            {/* <InputLabel id="date-range-label">Filter By</InputLabel> */}
            <Select
                labelId="date-range-label"
                value={filter}
                label=""
                onChange={(e) => setFilter(e.target.value)}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            border: '1px solid #475569', borderRadius: '12px',
                        },
                    },
                }}
            >
                <MenuItem value="this_month">This Month</MenuItem>
                <MenuItem value="last_month">Last Month</MenuItem>
                <MenuItem value="this_year">This Year</MenuItem>
                <MenuItem value="last_year">Last Year</MenuItem>
            </Select>
        </FormControl>
    );
};

export default FilterDropdown;
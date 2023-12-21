import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getNewsCategory } from "../API";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

function getStyles(category, filterCategory, theme) {
  return {
    fontWeight:
      filterCategory.indexOf(category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function FilterCategories({ setUpdatedNews }) {
  const theme = useTheme();
  const [filtercategory, setFilterCategory] = React.useState([]);

  const handleChange = async (event) => {
    const {
      target: { value },
    } = event;
    setFilterCategory(value);
    const searchedNews = await getNewsCategory(value);
    setUpdatedNews(searchedNews);
  };

  return (
    <div>
      <FormControl sx={{ display: 'flex', m: 1, width: 300 }}>
        <InputLabel id="multiple-category-label">Categoría</InputLabel>
        <Select
          labelId="multiple-category-label"
          id="multiple-category"
          value={filtercategory}
          onChange={handleChange}
          input={<OutlinedInput label="category" />}
          MenuProps={MenuProps}
        >
          {categories.map((category) => (
            <MenuItem
              key={category}
              value={category}
              style={getStyles(category, filtercategory, theme)}
            >
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

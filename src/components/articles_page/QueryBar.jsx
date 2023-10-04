import { toTitle } from "../../utilities"
import { FormControl, Select, MenuItem } from "@mui/material"

const selectStyle = {
    color: "white",
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: '#e4dbe940',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e4dbe940',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e4dbe940',
    },
    '.MuiSvgIcon-root ': {
      fill: "white !important",
    }
  }

export default function QueryBar({handleChange, topics, topic, sort_by, order}) {
    return (
        <div className="queryBar">
            <FormControl size="small">
                <Select name="topic" onChange={handleChange} value={topic} sx={selectStyle}>
                    {topics.map(topic => <MenuItem key={topic} value={topic}>{toTitle(topic)}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl size="small">
                <Select name="sort_by" onChange={handleChange} value={sort_by} sx={selectStyle}>
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="comment_count">Comments</MenuItem>
                    <MenuItem value="votes">Votes</MenuItem>
                </Select>
            </FormControl>
            <FormControl size="small">
                <Select name="order" onChange={handleChange} value={order} sx={selectStyle}>
                    <MenuItem value="desc">Desc</MenuItem>
                    <MenuItem value="asc">Asc</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
} 
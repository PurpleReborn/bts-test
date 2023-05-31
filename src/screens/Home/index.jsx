import React, { useEffect, useState } from 'react'
import { isTokenExpired } from '../../utils/handleToken';
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState()
  const [load, setLoad] = useState(false);

  const getData = () => {
    const token = localStorage.getItem("token");

    fetch("http://94.74.86.174:8080/api/checklist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data.data))
      .catch((error) => console.error("Error:", error));
  }

  useEffect(() => {
    getData();
  }, [load])

  const createItem = () => {
    const token = localStorage.getItem("token");

    fetch("http://94.74.86.174:8080/api/checklist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: newData,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoad(!load)
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleCheck = (id) => {
    const token = localStorage.getItem("token");
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checklistCompletionStatus: !item.checklistCompletionStatus,
        };
      }
      return item;
    });

    setData(updatedData);
  }

  if (data?.length < 1) {
    return (
      <Box
        flex={1}
        display={"flex"}
        justifyContent={'center'}
        alignItems={"center"}
        width={"100%"}
        height={'100vh'}
      >
        data kosong
      </Box>
    );
  }

  return (
    <Box p={"40px"}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <TextField
          margin="normal"
          required
          autoFocus
          value={newData}
          onChange={(e) => setNewData(e.target.value)}
        />
        <Box
          onClick={createItem}
          sx={{
            px: "10px",
            border: 1,
            borderColor: "blue",
            py: "15px",
            ml: "20px",
          }}
        >
          Tambah Data
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {data?.map((item) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={item?.checklistCompletionStatus}
                onChange={() => handleCheck(item?.id)}
                name="checked"
                color="primary"
              />
            }
            label={item?.name}
          />
          // <Accordion>
          //   <AccordionSummary
          //     expandIcon={<ExpandMoreIcon />}
          //     aria-controls="panel1a-content"
          //     id="panel1a-header"
          //   >
          //     <Typography>{item?.name}</Typography>
          //   </AccordionSummary>
          // </Accordion>
        ))}
      </Box>
    </Box>
  );
}

export default Home
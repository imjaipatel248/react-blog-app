import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import moment from "moment";
import { Link } from 'react-router-dom';

function BasicChips({ tags }) {
  const tageArray = tags.split(",");
  console.log(tageArray);
  return (
    <Stack direction="row" spacing={1}>
      {tageArray.map((name) => (
        <div>
          {name && (
            <Chip component={Link} to={`/home/${name}`} key={name} label={name} />
          )}
        </div>
      ))}
    </Stack>
  );
}

export default function CardComponent({ blogDetail }) {
  return (
    <Card sx={{ mt: 3 }} variant="outlined">
      <React.Fragment>
        <CardContent>
          <Typography variant="h5" component="div">
            {blogDetail.title}
          </Typography>
          <Typography variant="body2">{blogDetail.body}</Typography>
        </CardContent>
        <CardActions>{<BasicChips tags={blogDetail.tags} />} </CardActions>
        <Typography
          align="right"
          sx={{ fontSize: 14, p: 1 }}
          color="text.secondary"
          gutterBottom
        >
          {blogDetail.author_name}
          <br />
          {moment(blogDetail.date).format("MM/DD/YYYY HH:MM:SS")}
        </Typography>
      </React.Fragment>
    </Card>
  );
}

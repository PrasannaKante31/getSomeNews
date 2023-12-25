import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function NewsBox({ news }) {
  //news refer to one of the element of articles
  const img = news.urlToImage;
  const url = news.url;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt="green iguana" height="140" image={img} />
      <CardContent>
        {/* <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography> */}
        <Typography variant="body2" color="text.secondary">
          {news.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <a href={url}>Read more!</a>
        </Button>
      </CardActions>
    </Card>
  );
}

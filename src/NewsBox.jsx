import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./NewsBox.css";
import MoreInfo from "./MoreInfo";

export default function NewsBox({ news }) {
  const img = news.urlToImage;
  const url = news.url;

  return (
    <>
      <Card
        className="Card"
        elevation={3}
        style={{
          width: 368,
          margin: 10,
          height: 500,
          display: "inline-flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: 1 }}>
          <CardMedia
            component="img"
            image={img}
            style={{ height: "300px", objectFit: "cover" }}
          />
        </div>

        <CardContent
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1" align="center">
            <b>{news.title}</b>
          </Typography>
        </CardContent>

        <CardActions style={{ alignSelf: "flex-end" }}>
          <MoreInfo news={news} />
        </CardActions>
      </Card>
    </>
  );
}

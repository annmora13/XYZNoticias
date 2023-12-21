import * as React from "react";
import { useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { pink, grey, purple } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import header from "./img/header.png";

function Header() {
  const imageProps = {
    src: header,
    alt: "Encabezado",
    className: "header-image",
    display: "flex",
    alignitems: "center",
    justifyContent: "center",
    margin: "0",
    width: "100%",
    height: "auto",
    maxWidth: "100%",
  };

  return (
    <div className="header">
      <img {...imageProps} />
    </div>
  );
}

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const NotiCard = ({ title, description, urlToImage, content, url }) => {
  const [expanded, setExpanded] = React.useState(false);

  const saveNews = (newNews) => {
    try {
      const existingNewsJSON = localStorage.getItem("newsData");
      let existingNews = [];

      if (existingNewsJSON) {
        existingNews = JSON.parse(existingNewsJSON);
        const isTitleDuplicate = existingNews.some(
          (news) => news.title === newNews.title
        );

        if (isTitleDuplicate) {
          console.log("La noticia con este título ya existe. No se guardará.");
          return;
        }
      }

      existingNews.push(newNews);
      localStorage.setItem("newsData", JSON.stringify(existingNews));
      console.log("Noticia guardada con éxito", newNews);
    } catch (error) {
      console.error("Error al guardar la noticia:", error);
    }
  };

  const shareOnWhatsApp = (title, description, url) => {
    try {
      const textToShare = `${title}\n${description}\n${url}`;
      const encodedText = encodeURIComponent(textToShare);
      const whatsappURI = `whatsapp://send?text=${encodedText}`;
      window.location.href = whatsappURI;
      console.log("Compartiendo noticia por WhatsApp:", textToShare);
    } catch (error) {
      console.error("Error al compartir la noticia por WhatsApp:", error);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Box>
        <Card
          className="cartas"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "15px",
            maxWidth: "500px",
            bgcolor: grey[900],
            color: "white",
            flexWrap: "wrap",
          }}
        >
          <CardHeader
            sx={{
              maxWidth: "500px",
              fontWeight: "bold",
              color: "white",
            }}
            avatar={
              <Avatar sx={{ bgcolor: purple[900] }} aria-label="recipe">
                N
              </Avatar>
            }
            action={
              <IconButton aria-label="settings" sx={{ color: "white" }}>
                <MoreVertIcon />
              </IconButton>
            }
            title={title}
          />

          <CardMedia
            component="img"
            height="194"
            image={urlToImage}
            alt="News Picture"
          />

          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: "italic", color: "white" }}
            >
              {description}
            </Typography>
          </CardContent>

          <CardActions disableSpacing>
            <IconButton
              aria-label="add to favorites"
              onClick={() => {
                saveNews({ title, description, urlToImage, content, url });
              }}
              sx={{ fontWeight: 700, borderColor: pink[500], color: pink[500] }}
              variant="outlined"
            >
              <FavoriteIcon />
            </IconButton>

            <IconButton
              aria-label="share"
              onMouseOver={() => {
                alert("¡Comparte con tus amigos! Si clickeas aquí te va a redirigir a whatsapp");
              }}
              onClick={() => {
                shareOnWhatsApp(title, description, url);
              }}
            >
              <ShareIcon />
            </IconButton>

            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              sx={{
                color: "white",
              }}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                {content},{url}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Box>
    </div>
  );
};

export const News = ({ updatedNews, setUpdatedNews }) => {
  //obtiene la noticia
  //const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=2eb80da01b6f4cd8bfd0bfb79190431e"
      );
      if (response.ok) {
        const data = await response.json();
        setUpdatedNews(data.articles || []);
      } else {
        const errorMessage = await response.text();
        throw new Error(
          `Error en la solicitud: ${response.status} - ${errorMessage}`
        );
      }
    } catch (error) {
      console.error(error);
      setUpdatedNews([]);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems="center"
      >
        <Header image={header} />
        {updatedNews.map((newsItem) => (
          <NotiCard
            key={newsItem.description}
            title={newsItem.title}
            description={newsItem.description}
            urlToImage={newsItem.urlToImage}
            content={newsItem.content}
            url={newsItem.url}
          />
        ))}
      </Box>
    </>
  );
};

export default News;

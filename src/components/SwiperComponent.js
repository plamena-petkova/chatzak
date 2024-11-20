import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import { Grid } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CardComponentHome from "./CardComponentHome";
import { useMediaQuery } from "@mui/material";

function SwiperComponent() {
  const isSmallScreen = useMediaQuery("(max-width:899px)");
  return (
    <Grid
    container
    justifyContent="center"
    alignItems="center"
    sx={{
    display:'flex',
    justifyContent:'center',
      width: "97vw", // Optional, to make it fill the viewport
      pl: '5rem',
      pb:'2rem'// Padding around the Swiper
    }}
  >
      <Swiper
        spaceBetween={80}
        slidesPerView={isSmallScreen ? 1 : 3}
        autoplay={{delay:3000}}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        modules={[Autoplay, Pagination, Navigation]}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <CardComponentHome
            cardText={
              "Want to make corrections? Yoou can edit you message with ChatZak!"
            }
            cardHeading={"Message Edit"}
            cardIcon={<EditIcon fontSize="large" />}
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <CardComponentHome
            cardText={
              "If you need to delete the message, do it now with ChatZak!"
            }
            cardHeading={"Message Delete"}
            cardIcon={<DeleteIcon fontSize="large" />}
          />{" "}
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <CardComponentHome
            cardText={
              "If you want to block a user, you can do it now with ChatZak!"
            }
            cardHeading={"Block User"}
            cardIcon={<BlockIcon fontSize="large" />}
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <CardComponentHome
            cardText={
              "Invite your family, friends and colleagues to chat with you in ChatZak!"
            }
            cardHeading={"Invite User"}
            cardIcon={<PersonAddIcon fontSize="large" />}
          />
        </SwiperSlide>
      </Swiper>
    </Grid>
  );
}

export default SwiperComponent;

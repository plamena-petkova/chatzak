import { Card, CardCover, Sheet } from "@mui/joy";
import logo from '../assets/chatzakLogo.png'


function Header () {


return (
    <Sheet
    variant="outlined"
    sx={{
      width: 270,
      overflow: 'auto',
      borderRadius: 'sm',
      mt:2,
      mb:2
    }}
  >
  <Card sx={{
            maxWidth: 250,
            minHeight: 80,
            borderRadius: 'sm',
          }}>

      <CardCover>
      <img
          src={logo}
          alt=""
        />
      </CardCover>
      </Card>
  </Sheet>
)

}

export default Header;